import { Request, Response } from "express";
import { DeleteResult, getRepository } from "typeorm";
import User from "../entity/User.entity";

class UserController {
    /**
     * 
     * @param   {Request}   req An object with the request info.
     * @param   {Response}  res An object with the response functions. 
     * @returns {Response}  A response with the users list.
    */
    static async getUsers(req: Request, res: Response): Promise<Response<JSON>> {
        const users: User[] = await getRepository(User).find();
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
        const user: User | undefined = await getRepository(User).findOne(userId);
        return res.json(user);
    }

    /**
     * 
     * @param   {Request}   req An object with the request info.
     * @param   {Response}  res An object with the response functions. 
     * @returns {Response}  A response with the created user object.
     */
    static async createUser(req: Request, res: Response): Promise<Response<JSON>> {
        const newUserInfo: User = req.body;
        const newUser: User = await getRepository(User).create(newUserInfo);
        const saveResult: User = await UserController.saveUser(newUser);
        return res.json(saveResult);
    }

    /**
     * 
     * @param   {User}      newUser An object with the new user info.
     * @returns {User}      The saved user object.
     */
    static async saveUser(newUser: User): Promise<User> {
        const saveResult: User = await getRepository(User).save(newUser);
        return saveResult;
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
        const user: User | undefined = await getRepository(User).findOne(userId);
        if (user) {
            const updatedUser: User = await getRepository(User).merge(user, updateInfo);
            const savedUser: User = await UserController.saveUser(updatedUser);
            return res.json(savedUser);
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
        const deleteResult: DeleteResult | undefined = await getRepository(User).delete(userId);
        return res.json(deleteResult);
    }
}

export default UserController;