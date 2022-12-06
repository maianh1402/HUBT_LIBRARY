import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserModal from '../models/user.js'

const secret = "test"


export const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const oldUser = await UserModal.findOne({ email });
        if (!oldUser)
            return res.status(404).json({ message: "Người dùng không tồn tại." });

        const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

        if (!isPasswordCorrect)
            return res.status(400).json({ message: "Thông tin không hợp lệ." });

        const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
            expiresIn: "1h",
        });

        res.status(200).json({ result: oldUser, token });
    } catch (error) {
        res.status(500).json({ message: "Đã xảy ra sự cố" });
        console.log(error);
    }
};


export const signup = async (req, res) => {
    const { email, password, firstName, lastName } = req.body;
    try {
        const oldUser = await UserModal.findOne({ email });

        if (oldUser) {
            return res.status(400).json({ message: "Người dùng đã tồn tại!!!" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await UserModal.create({
            email,
            password: hashedPassword,
            name: `${firstName} ${lastName}`,
        });

        const token = jwt.sign({ email: result.email, id: result._id }, secret, {
            expiresIn: "1h",
        });
        res.status(201).json({ result, token });
    } catch (error) {
        res.status(500).json({ message: "Đã xảy ra sự cố" });
        console.log(error);
    }
};


