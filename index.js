import express from 'express';
import * as dotenv from 'dotenv'
import mongoose from 'mongoose';
import cors from 'cors'; 
import router from'./routes/index.js'
import cookieParser from 'cookie-parser'
dotenv.config();
const app = express();


const port = process.env.PORT || 5001;

const connect =async () => {
    mongoose.set('strictQuery',true);
    try {
       await mongoose.connect(process.env.MONGO_URL);
       console.log("Connect to Database successfully !!!");

    } catch (error) {
        throw new Error(error);
    }

}
connect();

mongoose.connection.on("disconnected",()=>{
    console.log("MongoDB connection : disconnected !!");
})
// mongoose.connection.on("connected",()=>{
//     console.log("MongoDB connection : connected !!");
// })
app.use(cors());
app.use(express.json());
app.use(cookieParser());
router(app);



app.listen(port, () => {
    console.log(` APP listening on port :  ${port}`)
})