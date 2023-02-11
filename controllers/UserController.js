import User from "../models/User.js";
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

var salt = bcrypt.genSaltSync(10);
export const updateUser = async (req, res) => {
    try {
        if (req.body.password) {
            req.body.password = await bcrypt.hashSync(req.body.password, salt);
        }
        // const data={}
        const updateUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true });
        res.status(200).json(updateUser);

    } catch (error) {
        res.status(500).json(error);

    }
}
export const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User  has been deleted success");

    } catch (error) {
        res.status(500).json(error);

    }
}
export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(501).json("Can not find User !")
        }

    } catch (error) {
        res.status(500).json({ "error": error })
    }
}
export const getUsers = async (req, res) => {
    try {
        const user = await User.find();

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(501).json("Can not find User !")
        }

    } catch (error) {
        res.status(500).json({ "error": error })
    }
}

