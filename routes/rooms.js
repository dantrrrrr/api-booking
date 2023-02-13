import express from "express";

import { createRoom,deleteRoom,getRoom,getRooms,updateRoom,updateRoomAvailability } from "../controllers/RoomController.js";
import { verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();

router.post('/:hotelId',verifyAdmin, createRoom)
//delete
router.delete('/:id/:hotelId',verifyAdmin, deleteRoom)
//update
router.put('/availability/:id', updateRoomAvailability)
router.put('/:id',verifyAdmin, updateRoom)
//get one by id
router.get('/find/:id', getRoom)
//get alll
router.get('/', getRooms)
export default router;
