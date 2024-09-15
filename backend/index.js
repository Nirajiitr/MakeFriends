import express from "express"
import cors from "cors"
import authRoute from "./routes/authRoute.js"
import "dotenv/config"
import mongoose from "mongoose";
import cookieParser from "cookie-parser"

const app = express();
const port = process.env.PORT;
const origin = process.env.ORIGIN_URL


//database
 const DB_URL = process.env.DB_URL;
 mongoose.connect(DB_URL).then(()=>{
    console.log("datbase connected")
 }).catch((error)=>{
    console.log(`database connection error: ${error}`)
 })

//middlewere
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())
const corsOption ={
    origin:origin,
    credentials : true,
}
app.use(cors(corsOption));



//routes
 app.use("/auth", authRoute)
 
 

//server
app.listen(port, ()=>{
    console.log(`server is listening at port: ${port}`)
})
