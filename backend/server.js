import * as dotenv from 'dotenv' 
dotenv.config({path: "./config/.env"});
import app from "./app.js";
import { connectDatabase } from './config/database.js';
import cloudinary from "cloudinary";

//Uncaught exception

process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log('Shutting down the server due to unhandled rejections.');
    process.exit(1);
})

// dotenv.config();



connectDatabase();


cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const PORT = process.env.PORT;
const server = app.listen(PORT,function(){
    console.log(`Server is running on the port:${PORT}`);
});


//Unhandled promise rejection

process.on("unhandledRejection", err => {
    console.log(`Error: ${err.message}`);
    console.log('Shutting down the server due to unhandled rejections.');

    server.close(() => {
        process.exit(1);
    });
});

