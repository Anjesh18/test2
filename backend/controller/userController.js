import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import Blog from "../models/blogModel.js";

export const registerController = async (req, res) => {
  try {
    const { name, username, password, role } = req.body;
    const files = req.file;
    const dataUri = getDataUri(files); //passing the file as parameter to the function
    const cloudRes = await cloudinary.uploader.upload(dataUri.content); 
    //uploading the file to cloudinary and it returns an url
    const user = await User.findOne({ username });
    if (user) {
      return res
        .status(402)
        .json({ message: "User already exists!", success: false });
    }
    const hashedPass = await bcrypt.hash(password, 10); //hashing the password using bcrypt
    if (!hashedPass) {
      return res
        .status(405)
        .json({ message: "Could not hash password", success: false });
    }
    const newUser = await User.create({
      name: name,
      username: username,
      password: hashedPass,
      role: role,
      profilePicture: cloudRes?.secure_url, //providing the url to the "profilePicture" field
    });
    return res.status(201).json({
      message: "User registered successfully",
      success: true,
      newUser,
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

export const loginController = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const user = await User.findOne({ username });
    if (!username) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }
    const pass = await bcrypt.compare(password, user.password); //comparing the password using bcrypt
    if (!pass) {
      return res
        .status(402)
        .json({ message: "Invalid credentials", success: false }); //login denied if passwords do not match
    }
    if (user.role != role) {
      return res
        .status(500)
        .json({ message: "User with this role dos not exist!" }); //verifying the role of te user
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      //signing the jwt token with user ID as payload
      expiresIn: "1d",
    });
    if (!token) {
      return res
        .status(403)
        .json({ message: "Token not found", success: false });
    }
    const loggedinUser = {
      name: user?.name,
      id: user?._id,
      username: user?.username,
      profilePicture: user?.profilePicture,
      role: user?.role,
    };
    return res
      .status(202)
      .cookie("token", token, { maxAge: 24 * 60 * 60 * 1000 }) //token shall be valid for 1 complete day before it expires
      //sending token in the cookie and which is verified in the middleware 
      .json({
        message: `Welcome back ${user?.name}`,
        success: true,
        loggedinUser,
      });
  } catch (error) {
    console.log(error.message);
    return res
      .status(506)
      .json({ message: "Imternal server error", success: false });
  }
};

export const logoutController = async (req, res) => {
  try {
    return res
      .status(201)
      .cookie("token", "", { maxAage: 0 }) //setting the token as an empty string in order to clear cookies
      .json({ message: "Logout successful", success: true });
  } catch (error) {
    console.log(error.message);
    return res
      .status(506)
      .json({ message: "Imternal server error", success: false });
  }
};

export const getAllUsersController = async (req, res) => {
  try {
    const allUsers = await User.find({}); //fetching all registered users from the database
    if (!allUsers) {
      return res
        .status(404)
        .json({ message: "Users not found", success: false });
    }
    return res
      .status(201)
      .json({ message: "Success", success: true, allUsers });
  } catch (error) {
    return res
      .status(505)
      .json({ message: "Internal server error", success: false });
  }
};

export const getUserByIdController = async (req, res) => {
  try {
    const userId = req.params.id; //fetching the user ID from params
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ message: "Users not found", success: false }); //verifying if the user exists
    }
    return res.status(202).json({ message: "User found", success: true, user });
  } catch (error) {
    console.log(error.message);
    return res
      .status(405)
      .json({ message: "Internal server error", success: false });
  }
};

export const updateUserByIdController = async (req, res) => {
  try {
    const userId = req.params.id; //fetching the user ID to be updated from params
    const { name, role } = req.body;
    const user = await User.findByIdAndUpdate(userId, req.body, { new: true });
    if (!user) {
      return res
        .status(404)
        .json({ message: "Could not edit", success: false });
    }
    return res
      .status(202)
      .json({ message: "Updated successfully!", success: true, user });
  } catch (error) {
    console.log(error.message);
    return res
      .status(405)
      .json({ message: "Internal server error", success: false });
  }
};

export const deleteUserByIdController = async (req, res) => {
  try {
    const userId = req.params.id; //fetching the user ID to be deleted from the params
    const userDelete = await User.findByIdAndDelete(userId);
    if (!userDelete) {
      return res
        .status(402)
        .json({ message: "User could not be deleted", success: false });
    }
    return res
      .status(203)
      .json({ message: "User deleted successfully", success: true });
  } catch (error) {
    console.log(error.message);
    return res
      .status(405)
      .json({ message: "Internal server error", success: false });
  }
};
