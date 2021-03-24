import { NextFunction, Request, Response } from "express";
import { getConnection } from "typeorm";
import User from "../entity/user.entity";
import BCRYPT from "../utils/bcrypt.utils";
import JWT from "../utils/jwt.utils";

class AuthController{
    /**
     *
     *
     * @static
     * @param   {Request}   req An object with the request info.
     * @param   {Response}  res An object with the response functions.
     * @return {*}  {Promise<Response<JSON>>} A json response.
     * @memberof AuthController
     */
    static async signIn(req: Request | any, res: Response): Promise<Response<JSON>>{
        const { email, password }: User = req.body;
        const [ user ] = await getConnection()
        .createQueryBuilder()
        .select()
        .from(User, 'users')
        .where('email = :email', { email })
        .execute();
        if(user){
            const token = await JWT.sign(user.id);
            if(await BCRYPT.isValidPassword(password as any, user.password)){
                return res.json({ auth: true, token, message: `Welcome '${email}' !` });
            }
            return res.json({ auth: false, token: null, message: 'Invalid password!'});
        }
        return res.json({ auth: false, token: null, message: `User '${email}' doesn't exist!` });
    }

    /**
     *
     *
     * @static
     * @param   {Request}   req An object with the request info.
     * @param   {Response}  res An object with the response functions.
     * @return {*}  {Promise<Response<JSON>>} A json response or void.
     * @memberof AuthController
     */
    static async signUp(req: Request, res: Response, next: NextFunction): Promise<Response<JSON> | void>{
        const { email }: User  = req.body;
        const [ user ] = await getConnection()
        .createQueryBuilder()
        .select()
        .from(User, 'users')
        .where('email = :email', { email })
        .execute();
        if(user){
            return res.json({ message: `User of email '${email}' already exists!` });
        }
        return next();
    }
}

export default AuthController;