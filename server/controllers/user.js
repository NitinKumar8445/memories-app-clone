import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import UserModal from "../models/user.js";

const JWT_SECRET = process.env.JWT_SECRET;

// One function for both: email/password 
export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    // 🔹 Case 1: Email/password login
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await UserModal.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User doesn't exist" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // jwt sign syntax : jwt.sign(payload, secretOrPrivateKey, [options, callback])
    const jwtToken = jwt.sign(
      { email: user.email, id: user._id, name: user.name },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ result: user, token: jwtToken });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

//  signup or create user or register
export const signup = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });
    if (oldUser) return res.status(400).json({ message: "User already exists" });

    if (password !== confirmPassword) return res.status(400).json({ message: "Passwords don't match" });

    // hash password
    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await UserModal.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`
    });

    const token = jwt.sign({ email: result.email, id: result._id, name: result.name }, JWT_SECRET, { expiresIn: "1h" });

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};


