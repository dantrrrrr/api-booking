import express from "express";
import { createHotel, updateHotel,deleteHotel,getHotel,getHotels, getHotelRooms, getByType,getCountByCity } from "../controllers/HotelController.js";
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
router.get('/room/:id',getHotelRooms)
router.get('/city',getCountByCity)
router.get('/type',getByType)
router.get('/',getHotels)

export default router;
