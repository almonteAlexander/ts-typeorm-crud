import App from "./App/app";
import dotenv from "dotenv";
import "reflect-metadata";
dotenv.config();

/**
 * Instantiates an initializes the app.
 */
var main = async (): Promise<void> => {
    let app = new App({
        port: process.env.PORT,
        host: process.env.HOST
    });
    await app.init();
}

main();