import mongoose from "mongoose";
const { Schema } = mongoose;

const HotelSchema = new mongoose.Schema({
    name: { type: String, require: true },
    type: { type: String, require: true },
    city: { type: String, require: true },
    address: { type: String, require: true },
    distance: { type: String, require: true },
    photos: { type: [String] }, //array String
    desc: { type: String, require: true },
    rating: { type: Number, require: true, min: 0, max: 5 },//number
    // rooms: { type: [String] }, //array String
    rooms: [{ type: Schema.Types.ObjectId, ref: "Rooms" }], //array String
    cheapestPrice: { type: Number, require: true }, //Number
    featured: { type: Boolean, default: false }, //Boolean

})
export default mongoose.model('Hotels', HotelSchema);