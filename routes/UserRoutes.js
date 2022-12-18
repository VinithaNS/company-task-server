import express from "express";

import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";

import UserModel from "../models/UserModel.js";

const secret = "test";
const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const { name, email, password,phonenumber } = req.body;
  try {
    const oldUser = await UserModel.findOne({ email });
    if (oldUser) {
      return res.status(400).json({ msg: "User Already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await UserModel.create({
      name,
      email,
        password: hashedPassword,
      phonenumber,
    });
    const token = jwt.sign({ email: result.email, id: result._id }, secret, {
      expiresIn: "1h",
    });
    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ msg: "Something Went Wrong" });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const oldUser = await UserModel.findOne({ email });
    if (!oldUser) return res.status(400).json({ msg: "User doesn't exist" });
    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
    if (!isPasswordCorrect)
      return res.status(400).json({ msg: "Invalid Credentials" });
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "1hr",
    });
    res.status(200).json({ result: oldUser, token });
  } catch (error) {
    res.status(500).json({ msg: "Something Went Wrong" });
  }
});

export default userRouter;
