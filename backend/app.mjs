import cookieParser from "cookie-parser";
import express from "express";
import { errorMiddleware } from "./middleware/errorMiddleware.js";
import cors from "cors";
import http from 'http'
import * as httpContext from 'express-http-context'
import configs from "./config/config.mjs";

//Route Imports
import noticeRoute from "./routes/Notice.Router.mjs";
import userRoute from "./routes/User.Router.mjs";
import organizationRoute from "./routes/Organization.Router.mjs";
import membershipRoute from "./routes/MemberShip.Router.mjs"
import healthCheckRoute from "./routes/HealthCheck.Router.mjs"
// import jwt from "jsonwebtoken";

const app = express();
console.log('Allowed cors origin:', configs.ALLOWED_CORS_ORIGIN)
app.use(cors({
    origin(origin, callback) {
      // Allow requests with no origin (e.g. mobile apps, curl, etc.)
      if (!origin) return callback(null, true);
      return configs.ALLOWED_CORS_ORIGIN.includes(origin) ? callback(null, true) : callback(new Error('Not allowed by CORS'));
    },
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(httpContext.middleware);

app.use("/api/v1",healthCheckRoute)
app.use("/api/v1",noticeRoute);
app.use("/api/v1",userRoute);
app.use("/api/v1",organizationRoute);
app.use("/api/v1",membershipRoute);

//middleware for error

app.use(errorMiddleware);

const httpServer = http.createServer(app)
export default httpServer;