import cookieParser from "cookie-parser";
import express from "express";
import { errorMiddleware } from "./middleware/errorMiddleware.js";
import cors from "cors";
// import jwt from "jsonwebtoken";

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

//Route Imports
import noticeRoute from "./routes/noticeRoute.js";
import userRoute from "./routes/userRoute.js";
import organizationRoute from "./routes/organizationRoute.js";

app.use("/api/v1",noticeRoute);
app.use("/api/v1",userRoute);
app.use("/api/v1",organizationRoute);

//middleware for error

app.use(errorMiddleware);

export default app;