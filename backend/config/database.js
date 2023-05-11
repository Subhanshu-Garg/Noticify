import mongoose from "mongoose";


export function connectDatabase() {
    mongoose.set('strictQuery', false);
    mongoose.connect(process.env.DB_URI, { useNewUrlParser: true })
    .then(db => {
    console.log(`Mongodb connected with server: ${db.connection.host}`);
    });
};
