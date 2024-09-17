import { User } from "../models/authModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const generateToken = (UserId) => {
  return jwt.sign({ UserId }, process.env.JWT_SECRETE_KEY, { expiresIn: "1d" });
};

export const register = async (req, res) => {
  const { fullname, email, password, confirmPass, phone } = req.body;

  if (!fullname || !email || !password || !confirmPass || !phone) {
    return res.status(400).json({ message: "All fields are required!" });
  }


  const phoneRegex = /^[6-9]\d{9}$/;
  if (!phoneRegex.test(phone)) {
    return res.status(400).json({ message: "Invalid Indian phone number" });
  }

 
  if (password.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters long" });
  }


  if (password !== confirmPass) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {

    const isUser = await User.findOne({ email });
    if (isUser) {
      return res.status(409).json({ message: "User already exists!" });
    }

    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);


    const newUser = new User({
      fullname,
      email,
      password: hashedPassword,
      phone,
    });

    await newUser.save();

   
    const Token = generateToken(newUser._id);

   
    const { password: _, ...user } = newUser._doc;
    return res.status(201).json({ user, Token, message: "Account created successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};


export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  try {
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User does not exist!" });
    }

   
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Incorrect password!" });
    }

    
    const Token = generateToken(user._id);

    const { password: _, ...userData } = user._doc;
    return res.status(200).json({ user: userData, Token, message: "Logged in successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};
