import App from "./app";
import config from "./config";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const { env } = process;

/********************************************************
 ******************** APPLICATION MAIN ******************
 ********************************************************/

const main = async () => {
    const app = new App(
        express(), 
        Number(config.APP_PORT)
    );
    mongoose.connect(
        env.MONGO_DB_HOST || "",
        () => {
          console.log("Connected to MongoDB");
        }
      );
    
    await app.initialize();
    app.checkDependencies();
    app.run();
    app.webpush();
};

/********************************************************
 ******************** RUN APPLICATION *******************
 ********************************************************/

main()
    .catch(console.error);