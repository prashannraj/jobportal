//import packages

import express from "express";
import dotenv from "dotenv";
import colors from "colors";
// files and middleware
import connectDB from "./config/db.js";
import testRoutes from "./routes/testRoute.js";
import authRoutes from "./routes/authRoute.js";
import morgan from "morgan";
import 'express-async-errors';
import cors from "cors";
import errorMiddleware from "./middelwares/errorMiddleware.js";




// DOT ENV config
dotenv.config();

// monogodb connection
connectDB();

//rest oobject

const app = express();

// middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));


// route

app.use('/api/v1/test', testRoutes)
app.use('/api/v1/auth', authRoutes)

//validation middleware error

app.use(errorMiddleware);

// PORT
const PORT = process.env.PORT || 8080;
//listen
app.listen(PORT, () =>{
    console.log(`node server running in ${process.env.DEV_MODE}on port ${PORT}`.bgCyan.white)
});