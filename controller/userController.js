import { User } from "../model/userModel.js";
import bcrypt from "bcrypt";

import { setCookie } from "../utils/jwt.js";

//register route
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    setCookie(res, user, "Registered Sucessfully", 201);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//login route
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      //agar user exist hi nhi krta
      return res.status(400).json({
        success: false,
        message: "Invalid Email",
      });
    }
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return res.status(400).json({
        success: false,
        message: "Invalid Password",
      });
    }
    setCookie(res, user, "Logged In Sucessfully", 201);
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Logout
export const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: "none",
      secure: true,
    })
    .json({
      success: true,
      message: "Logged Out Successfully!",
    });
};

// Get My Profile
export const getMyProfile = async (req, res) => {
  try {
    let user = await User.findById(req.user); // Assuming 'User' is your model
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message, // Use 'err.message' instead of 'error.message'
    });
  }
};

//delete User
export const deleteUser = async (req, res) => {
  let user = await User.findById(req.user);
  if (!user) {
    return res.status(400).json({
      success: false,
      message: "User not found",
    });
  }
  await user.deleteOne();
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: "none",
      secure: true,
    })
    .json({
      success: true,
      message: "Account Deleted Sucessfully",
    });
};
