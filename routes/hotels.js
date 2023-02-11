import express from "express";
import { createHotel, updateHotel,deleteHotel,getHotel,getHotels, getByCity, getByType } from "../controllers/HotelController.js";
import {verifyAdmin, verifyToken, verifyUser} from'../utils/verifyToken.js';

const router = express.Router();



//create
router.post('/',verifyAdmin, createHotel)
//delete
router.delete('/:id',verifyAdmin,deleteHotel)
//update
router.put('/:id',verifyAdmin,updateHotel)
//get one by id
router.get('/find/:id',getHotel) 
//get alll
router.get('/city',getByCity)
router.get('/type',getByType)
router.get('/',getHotels)

export default router;
