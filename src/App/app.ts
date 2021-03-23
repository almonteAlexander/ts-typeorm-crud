//modules
import express, { Application } from "express";
import { createConnection } from "typeorm";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
//interfaces
import IAppSettings from "../interface/IAppSettings";
//routers
import UserRouter from "../routes/user.routes";
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
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(morgan("dev"));
    }

    /**
     * Initialize app routes
     */
    useRoutes(): void {
        this.app.use("/users", UserRouter.init());
    }

    /**
     * Initialize the app.
     */
    async init(): Promise<void> {
        await this.app.listen(this.app.get("port"), this.app.get("host"));
        console.log(`Server On Port ${this.app.get("port")}!`);
    }
}