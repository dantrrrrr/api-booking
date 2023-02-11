import Room from '../models/Room.js'
import Hotel from '../models/Hotel.js'


//CREATE ROOM AND PUSH ID INTO [ROOMS] OF HOTELS
export const createRoom = async (req, res, next) => {
    const hotelId = req.params.hotelId;
    const newRoom = new Room(req.body)
    try {
        const savedRoom = await newRoom.save(); //save room to collection
        try {
            // push more id room to rooms from Hotel Collection
            //1 hotel have many rooms 
            await Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: savedRoom._id } });

        } catch (error) {
            next(error);
        }
        res.status(200).json(savedRoom)
    } catch (error) {
        // res.status(404).json({ "error": error})
        next(error);
    }
}
//UPDATE 
export const updateRoom = async (req, res) => {
    try {
        const updateRoom = await Room.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true });
        res.status(200).json(updateRoom);

    } catch (error) {
        // res.status(500).json(error);
        next(error);

    }
}
//unfinished : had to check room belong to hotel or not
export const deleteRoom = async (req, res, next) => {
    const hotelId = req.params.hotelId;
    try {

        const roomIsExists = await Hotel.findOne({ _id: hotelId, rooms: { $in: [req.params.id] }, })
        if (roomIsExists) {
            await Room.findByIdAndDelete(req.params.id);
            try {
                await Hotel.findByIdAndUpdate(hotelId, {
                    $pull: { rooms: { $in: req.params.id } }
                })
            } catch (error) {
                next(error)
            }
            res.status(200).json("Room  has been deleted success");
        } else {
            console.log("DELETE : hotels not found this room")
            res.status(500).json("Room  not found in this hotel");
            
        }


    } catch (error) {
        // res.status(500).json(error);
        next(error)

    }
}
export const getRoom = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);

        if (room) {
            res.status(200).json(room);
        } else {
            res.status(501).json("Can not find room !")
        }

    } catch (error) {
        // res.status(500).json({ "error": error })
        next(error);
    }
}
export const getRooms = async (req, res) => {
    try {
        const rooms = await Room.find();

        if (rooms) {
            res.status(200).json(rooms);
        } else {
            res.status(501).json("Can not find hotel !")
        }

    } catch (error) {
        res.status(500).json({ "error": error })
    }
}
