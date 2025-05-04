import cookieParser from "cookie-parser";
import express from "express";
import { errorMiddleware } from "./middleware/errorMiddleware.js";
import cors from "cors";
import http from 'http'
import * as httpContext from 'express-http-context'
// import jwt from "jsonwebtoken";

const app = express();

app.use(cors({
    origin: 'http://localhost:8080',
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(httpContext.middleware);

//Route Imports
import noticeRoute from "./routes/noticeRoute.js";
import userRoute from "./routes/userRoute.js";
import organizationRoute from "./routes/organizationRoute.js";
import membershipRoute from "./routes/MemberShip.Router.mjs"

app.use("/api/v1",noticeRoute);
app.use("/api/v1",userRoute);
app.use("/api/v1",organizationRoute);
app.use("/api/v1",membershipRoute);

//middleware for error

app.use(errorMiddleware);

const httpServer = http.createServer(app)
export default httpServer;