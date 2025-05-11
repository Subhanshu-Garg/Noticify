import 'dotenv/config'
import httpServer from "./app.mjs";
import { connectDatabase } from './config/database.mjs';
// import cloudinary from "cloudinary";
import wss from './webSocket.mjs';
import configs from './config/config.mjs';

//Uncaught exception

process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`, err);
    console.log('Shutting down the server due to unhandled rejections.');
    process.exit(1);
})


connectDatabase();

// cloudinary.v2.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
//     api_key: process.env.CLOUDINARY_API_KEY, 
//     api_secret: process.env.CLOUDINARY_API_SECRET
// })

const PORT = configs.PORT;

httpServer.on('upgrade', (req, socket, head) => {
    wss.handleUpgrade(req, socket, head, (ws) => {
      wss.emit('connection', ws, req);
    });
});

const server = httpServer.listen(PORT,() => {
    console.info(`Server is running on the port:${PORT}`);
});

//Unhandled promise rejection

process.on("unhandledRejection", err => {
    console.log(`Error: ${err.message}`, err);
    console.log('Shutting down the server due to unhandled rejections.');

    server.close(() => {
        process.exit(1);
    });
});

