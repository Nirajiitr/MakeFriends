import { User } from "../models/authModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
export const register = async (req, res) => {
  const { fullname, email, password, confirmPass, phone } = req.body;

  if (!fullname || !email || !password || !confirmPass || !phone) {
    return res.status(401).json({ message: "All fields are required!" });
  }

  const phoneRegex = /^[6-9]\d{9}$/;
  if (!phoneRegex.test(phone)) {
    return res.status(401).json({ message: "Invalid Indian phone number" });
  }

  if (password.length < 6) {
    return res.status(401).json({ message: "Password is too short" });
  }

  if (password !== confirmPass) {
    return res.status(401).json({ message: "Passwords do not match" });
  }

  try {
    const isUser = await User.findOne({ email });
    if (isUser) {
      return res.status(401).json({ message: "User already exists!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullname,
      email,
      password: hashPassword,
      phone,
    });

    await newUser.save();
    const { password: _, ...user } = newUser._doc;
    return res
      .status(201)
      .json({ user, message: "Account created successfully" });
  } catch (error) {
    return res.status(501).json({ message: "Server error", error });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(401).json({ message: "all field are required" });
  try {
    const newUser = await User.findOne({ email });
    if (!newUser)
      return res.status(401).json({ message: "user does not exists!" });
    const isPasswordMatch = await bcrypt.compare(password, newUser.password);

    if (!isPasswordMatch)
      return res.status(401).json({ message: "worng password!" });
    const TokenData = {
      UserId: newUser._id,
    };

    const Token = jwt.sign(TokenData, process.env.JWT_SECRETE_KEY, {
      expiresIn: "1d",
    });
    const { password: _, ...user } = newUser._doc;
    res
      .status(200)
      .cookie("Token", Token, {
        MaxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      })
      .json({ user, message: "logged in successfully" });
  } catch (error) {
    res.status(501).json({ message: "server error", error });
  }
};
