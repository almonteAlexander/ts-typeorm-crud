import { Router } from "express";
import AuthController from "../controllers/auth.controller";
import UserController from "../controllers/user.controller";
import JWT from "../utils/jwt.utils";

class AuthRouter{
    static router   : Router = Router();

    /**
     *
     *
     * @static
     * @return {Router}  A router object.
     * @memberof AuthRouter
     */
     static init(): Router{
        this.router.route("/signin")

            .post   (AuthController.signIn);

        this.router.route('/signup')

            .post   (AuthController.signUp, UserController.createUser)
            
        return this.router;
    }
}

export default AuthRouter;