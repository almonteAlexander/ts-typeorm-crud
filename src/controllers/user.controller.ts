import { Request, Response } from "express";
import { DeleteResult } from "typeorm";
import User from "../entity/user.entity";
import BCRYPT from "../utils/bcrypt.utils";
import JWT from "../utils/jwt.utils";

class UserController {
    /**
     * 
     * @param   {Request}   req An object with the request info.
     * @param   {Response}  res An object with the response functions. 
     * @returns {Response}  A response with the users list.
    */
    static async getUsers(req: Request, res: Response): Promise<Response<JSON>> {
        const users: User[] = await User.find();
        return res.json(users);
    }

    /**
     * 
     * @param   {Request}   req An object with the request info.
     * @param   {Response}  res An object with the response functions. 
     * @returns {Response}  A response with the user object.
     */
    static async getUser(req: Request, res: Response): Promise<Response<JSON>> {
        const userId: number = parseInt(req.params.id);
        const user: User | undefined = await User.findOne(userId);
        return res.json(user ? user : {message: `User of id ${userId} doesn't exist!`});
    }

    /**
     * 
     * @param   {Request}   req An object with the request info.
     * @param   {Response}  res An object with the response functions. 
     * @returns {Response}  A response with the created user object.
     */
    static async createUser(req: Request, res: Response): Promise<Response<JSON>> {
        let { email, password }: User = req.body;
        password = await BCRYPT.encryptPassword(password);
        if(password){
            const newUser: User | any = await User.create({ email, password }).save();
            if(newUser){
                const token = await JWT.sign(newUser.id);
                return res.json({ auth: true, token, newUser });
            }
            return res.json({ auth: false, token: null, message: 'Register Failed!' });
        }
        return res.json({ auth: false, token: null, message: 'A valid password must be provided!'});
    }

    /**
     * 
     * @param   {Request}   req An object with the request info.
     * @param   {Response}  res An object with the response functions. 
     * @returns {Response}  A response with the updated user object.
     */
    static async updateUser(req: Request, res: Response): Promise<Response<JSON>> {
        const userId: number = parseInt(req.params.id);
        const updateInfo: User = req.body;
        const user: User | undefined = await User.findOne(userId);
        if (user) {
            const updatedUser: User = await User.merge(user, updateInfo);
            updatedUser.save();
            return res.json(updatedUser);
        }
        return res.json({ message: "That user doesn't exist!" });
    }

    /**
     * 
     * @param   {Request}   req An object with the request info.
     * @param   {Response}  res An object with the response functions. 
     * @returns {Response}  A response with the delete result.
     */
     static async deleteUser(req: Request, res: Response): Promise<Response<JSON>> {
        const userId: number = parseInt(req.params.id);
        const deleteResult: DeleteResult | undefined = await User.delete(userId);
        return res.json(deleteResult);
    }
}

export default UserController;