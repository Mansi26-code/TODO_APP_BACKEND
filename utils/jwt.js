import jwt from "jsonwebtoken";

export const setCookie = async (res, user, message, statusCode = 200) => {
  try {
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15m", // Setting expiration time to 15 minutes
    });

    // Set the JWT token as a cookie in the response
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000, // 15 minutes in milliseconds
      sameSite: "none",
      secure: true,
    });

    // Send JSON response with success message
    res.status(statusCode).json({
      success: true,
      message: message,
    });
  } catch (error) {
    // Handle any errors
    console.error("Error setting JWT cookie:", error);
    res.status(500).json({
      success: false,
      message: "Failed to set JWT cookie",
    });
  }
};
