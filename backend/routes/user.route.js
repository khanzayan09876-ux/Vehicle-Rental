import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import user from "../model/user.model.js";

const route = express.Router();

const JWT_SECRET = "Fahim";

// ======================================================
// REGISTER
// ======================================================

route.post("/registerCreate", async function (req, res) {
  try {
    const data = req.body;

    console.log(data, "The registration data");

    // Check required fields
    if (
      !data.name ||
      !data.email ||
      !data.password ||
      !data.Role
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    // Check if user already exists
    const existingUser = await user.findOne({
      email: data.email,
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already registered with this email",
      });
    }

    // Hash password
    const hashpassword = await bcrypt.hash(data.password, 10);

    // Create user
    const createdData = await user.create({
      name: data.name,
      email: data.email,
      Role: data.Role,
      password: hashpassword,
    });

    return res.status(201).json({
      success: true,
      message: "Registration successfully completed. Please login.",
      data: {
        id: createdData._id,
        name: createdData.name,
        email: createdData.email,
        Role: createdData.Role,
      },
    });
  } catch (error) {
    console.log("Registration Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// ======================================================
// GET ALL USERS — ADMIN DASHBOARD
// URL: GET http://localhost:3000/user/Admain
// ======================================================

route.get("/Admain", async function (req, res) {
  try {
    const users = await user
      .find()
      .select("name email -_id");

    return res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    console.log("Get Users Error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while getting users",
    });
  }
});

// ======================================================
// LOGIN
// ======================================================

route.post("/login", async function (req, res) {
  try {
    console.log(req.body, "Login data");

    const { email, password, Role } = req.body;

    if (!email || !password || !Role) {
      return res.status(400).json({
        success: false,
        message: "Email, password and role are required",
      });
    }

    const mydata = await user.findOne({
      email,
      Role,
    });

    // User not found
    if (!mydata) {
      return res.status(401).json({
        success: false,
        message: "Email and Role are not found for the same user",
      });
    }

    // Compare password
    const result = await bcrypt.compare(
      password,
      mydata.password
    );

    if (!result) {
      return res.status(401).json({
        success: false,
        message: "Password is not matching",
      });
    }

    // Create JWT token after login
    const checkData = {
      id: mydata._id,
      Role: mydata.Role,
    };

    const token = jwt.sign(checkData, JWT_SECRET, {
      expiresIn: "1d",
    });

    // Save JWT in cookie
    res.cookie("stc-oprater", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "You are successfully logged in",
      data: {
        id: mydata._id,
        name: mydata.name,
        email: mydata.email,
        Role: mydata.Role,
      },
    });
  } catch (error) {
    console.log("Login Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// ======================================================
// CHECK LOGIN / AUTHENTICATION
// URL: GET /user/my
// ======================================================

route.get("/my", async function (req, res) {
  try {
    const token = req.cookies?.["stc-oprater"];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "You are not logged in",
      });
    }

    const result = jwt.verify(token, JWT_SECRET);

    return res.status(200).json({
      success: true,
      message: "User is authenticated",
      user: result,
    });
  } catch (error) {
    console.log("Authentication Error:", error);

    return res.status(401).json({
      success: false,
      message: "Login expired or invalid token",
    });
  }
});

// ======================================================
// LOGOUT
// URL: POST /user/logout
// ======================================================

route.post("/logout", function (req, res) {
  res.clearCookie("stc-oprater", {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
  });

  return res.status(200).json({
    success: true,
    message: "Logout successful",
  });
});

export default route;