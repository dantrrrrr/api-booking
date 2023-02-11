import mongoose from "mongoose";
const { Schema } = mongoose;

const RoomSchema = new mongoose.Schema({
    title: { type: String, require: true },
    price: { type: Number, require: true },
    maxPeople: { type: Number, require: true },
    desc: { type: String, require: true },
    roomNumbers: [{ number: Number, unvailableDates: { type: [Date] } }],
    photos: { type: [String] }, //array String

}, { timestamps: true })
export default mongoose.model('Rooms', RoomSchema); 