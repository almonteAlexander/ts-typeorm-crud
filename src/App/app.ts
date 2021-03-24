//modules
import express, { Application } from "express";
import { createConnection } from "typeorm";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import JWT from "../utils/jwt.utils";
import "reflect-metadata";
//interfaces
import IAppSettings from "../interface/IAppSettings";
//routers
import UserRouter from "../routes/user.routes";
import AuthRouter from "../routes/auth.routes";
//
dotenv.config();
//

export default class App {
    public app: Application;

    /**
     * 
     * @param settings An object with the app settings.
     */
    constructor(private settings: IAppSettings) {
        this.app = express();
        this.useSettings();
        this.useMiddlewares();
        this.useRoutes();
        createConnection();
    }

    /**
     * Set the app settings.
     */
    useSettings(): void {
        this.app.set("port", this.settings.port || process.env.PORT || "4000");
        this.app.set("host", this.settings.host || process.env.HOST || "localhost");
    }

    /**
     * Initialize app modules middlewares.
     */
    useMiddlewares(): void {
        this.app.use(helmet());
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(morgan("dev"));
    }

    /**
     * Initialize app routes
     */
    useRoutes(): void {
        this.app.use("/api/users", UserRouter.init());
        this.app.use("/api/auth", AuthRouter.init());
        this.app.post('/home', JWT.verifyToken, (req: any, res: any) => {
            return res.send('Hello Home!');
        });
    }

    /**
     * Initialize the app.
     */
    async init(): Promise<void> {
        await this.app.listen(this.app.get("port"), this.app.get("host"));
        console.log(`Server On Port ${this.app.get("port")}!`);
    }
}