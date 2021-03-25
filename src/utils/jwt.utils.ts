import jwt, { Secret } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

class JWT{
    /**
     *
     *
     * @static
     * @param {string | number} id The user's id.
     * @return {*}  {Promise<string>} A token string.
     * @memberof JWT
     */
    static async sign(id: string | number): Promise<string>{
        return await jwt.sign(
            { id }, 
            process.env.JWT_SECRET as any, 
            { expiresIn: parseInt(process.env.JWT_EXPIRES_IN as any) }
        );
    }

    /**
     *
     *
     * @static
     * @param {(Request | any)} req     A request object.
     * @param {Response}        res     A response object.
     * @param {NextFunction}    next    A next middleware function.
     * @return {*}                      {(Promise<Response<JSON> | void>)} A json response | void.
     * @memberof JWT
     */
    static async verifyToken(req: Request | any, res: Response, next: NextFunction): Promise<Response<JSON> | void>{
        const token = req.headers['x-access-token'];
        if(token){
            await jwt.verify(token as string, process.env.JWT_SECRET as Secret, 
            (err, decoded: any): Response<JSON> | void => {
                if(err) return res.json({ auth: false, token: null, message: err.message });
                req.userId = decoded.id;
                return next();
            });
        }
        else{
            return res.json({ auth: false, token: null, message: 'No token provided!' });
        }
       
    }
}

export default JWT;