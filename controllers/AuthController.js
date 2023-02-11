import User from "../models/User.js";
import * as bcrypt from 'bcrypt'
import { createError } from '../utils/error.js'
import jwt from 'jsonwebtoken'

export const register = async (req, res, next) => {
    const salt = bcrypt.genSaltSync(10);

    try {
        const passwordHashed = await bcrypt.hashSync(req.body.password, salt);
        const dataUser = {
            username: req.body.username,
            email: req.body.email,
            password: passwordHashed

        }
        const newUser = await new User(dataUser);
        try {
            const savedUser = await newUser.save();
            res.status(200).json({ "user has been created": savedUser })


        } catch (error) {
            res.json(error);
        }
    } catch (error) {
        next(error);
    }
}
export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            // return next(createError(404,"user not found"));//
            return res.status(404).json({ message: "user not found" });

        }
        const checkPassword = await bcrypt.compare(req.body.password, user.password);
        console.log(`LOGIN :    ${user.username} - ${checkPassword}`);
        if (!checkPassword) {
            // return next(createError(400,"Wrong password or username !")); 
            return res.status(400).json({ message: "Wrong password or username !" });

        }

        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.JWT_KEY,
            { expiresIn: "3d" }
        );
        const {
            password,
            isAdmin,
            // _id,
            // createdAt,
            // updatedAt,
            // __v,
            ...others
        } = user._doc;
        res.cookie("access_token", token, { httpOnly: true }).status(200).json(others); //save token to cookie


    } catch (error) {
        next(error);
    }
}
export const deleteX = async (req, res) => {

}
export const get = async (req, res) => {

}
export const gets = async (req, res) => {

}
