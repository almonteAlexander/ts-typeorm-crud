import { Router } from "express";
import UserController from "../controllers/user.controller";

export default class UserRouter{
    static router   : Router = Router();

    /**
     *
     *
     * @static
     * @return {Router}  A router object.
     * @memberof UserRouter
     */
    static init(): Router{
        this.router.route("/")
        
        .get    (UserController.getUsers)
        .post   (UserController.createUser);
        
         
        this.router.route("/:id")
        
        .get    (UserController.getUser)
        .put    (UserController.updateUser)
        .delete (UserController.deleteUser) ;

        return this.router;
    }
}