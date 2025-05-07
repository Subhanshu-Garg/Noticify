import mongoose from "mongoose";
import configs from "./config.mjs";


export function connectDatabase() {
    mongoose.set('strictQuery', false);
    mongoose.connect(configs.DB_URI, { useNewUrlParser: true })
    .then(db => {
    console.log(`Mongodb connected with server: ${db.connection.host}`);
    });
};
