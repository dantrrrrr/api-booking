import express from "express";
import User from "../models/User.js ";
import {  updateUser,deleteUser,getUser,getUsers } from "../controllers/UserController.js";
import {verifyToken, verifyUser} from'../utils/verifyToken.js';
const router = express.Router();


//create

//delete
router.delete('/:id',deleteUser)
//update
router.put('/:id',verifyUser,updateUser)
//get one by id
router.get('/find/:id',getUser) 

router.get('/checkauth',verifyToken,(req,res,next)=>{
    res.send("Your are login !");
})
router.get('/checkuser/:id',verifyUser,(req,res,next)=>{
    res.send("Your are login user !");
})
//get alll

router.get('/',getUsers)

export default router;
