import jwt from "jsonwebtoken";
import { User } from "../model/userModel.js";
export const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(404).json({
      success: false,
      message: "Login into Your Account First",
    });
  }

  //AGAR token exist nhi krta h to

  const decode = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decode._id);
  next();
};
