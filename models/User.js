import mongoose from "mongoose";
const { Schema } = mongoose;
const UserSchema = new mongoose.Schema({
    username: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    address: { type: String, require: true },
    isAdmin: { type: Boolean, default: false },

},{
    timestamps:true
})
export default mongoose.model('Users', UserSchema)