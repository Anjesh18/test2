import Blog from "../models/blogModel.js";
import User from "../models/userModel.js";

export const newBlogController = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.id;//fecthing user from the auth token via middleware
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }
    if (user.role != "Author") { //verifying if the user is an author, if not he shall not be able to post blog
      return res.status(500).json({
        message: "You are not authorized to post blogs",
        success: false,
      });
    }
    const newBlog = await Blog.create({ //after passing all the checks, the blog shall be posted
      title: title,
      content: content,
      postedBy: userId,
    });
    return res
      .status(202)
      .json({ message: "Blog posted successfully", success: true, newBlog });
  } catch (error) {
    console.log(error.message);
    return res
      .status(401)
      .json({ message: "Internal server error", success: false });
  }
};

export const getAllBlogsController = async (req, res) => {
  try {
    const blogs = await Blog.find({}).populate({ path: "postedBy" });//finding every posted blog
    if (!blogs) {
      return res
        .status(404)
        .json({ message: "Blogs not found", success: false });
    }
    return res
      .status(201)
      .json({ message: "Blogs fetched successfully", success: true, blogs });
  } catch (error) {
    console.log(error.message);
    return res
      .status(405)
      .json({ message: "Internal server error", success: false });
  }
};

export const getBlogByIdController = async (req, res) => {
  try {
    const blogId = req.params.id; //fetching the blog ID through params
    const blog = await Blog.findById(blogId).populate({ path: "postedBy" });
     //populating the "postedBy" path in order to get user who has posted the blog
    if (!blog) {
      return res
        .status(404)
        .json({ message: "Blog not found", success: false });
    }
    return res
      .status(202)
      .json({ message: "Blog found successfully", success: true, blog });
  } catch (error) {
    console.log(error.message);
    return res
      .status(406)
      .json({ messge: "Internal server error", success: false });
  }
};

export const updateBlogByIdController = async (req, res) => {
  try {
    const blogId = req.params.id; //fetching blog ID from params
    const userId = req.id; //retrieving user from the auth token via middleware
    const { title, content } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      //checking if the user exists
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }
    if (user.role != "Editor") {
      //verifying if the user is an editor, only then he can perform the edit operation
      return res.status(500).json({
        message: "You are not authorized to update blogs",
        success: false,
      });
    }
    const blog = await Blog.findByIdAndUpdate(blogId, req.body, { new: true });
    if (!blog) {
      return res
        .status(401)
        .json({ message: "Blog not updated", success: false });
    }
    return res
      .status(201)
      .json({ message: "Blog updated successfully", success: true });
  } catch (error) {
    console.log(error.message);
    return res
      .status(406)
      .json({ messge: "Internal server error", success: false });
  }
};

export const deleteBlogByIdController = async (req, res) => {
  try {
    const blogId = req.params.id; //retrieving blog id through parameters
    const userId = req.id; //fetching user from auth token via middleware
    const user = await User.findById(userId); //verifying if the user exists
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }
    const blog = await Blog.findById(blogId);
    if (user.role != "Author" && blog.postedBy != user._id) {
      //the user can perform delete operation only if he is the author of the blog
      return res.status(500).json({
        message: "You are not authorized to delete the post",
        success: false,
      });
    }
    const blogDelete = await Blog.findByIdAndDelete(blogId);
    if (blogDelete) {
      return res
        .status(401)
        .json({ message: "Delete unsuccessful", success: false });
    }
    return res
      .status(201)
      .json({ message: "Blog deleted successfully", success: true });
  } catch (error) {
    console.log(error.message);
    return res
      .status(406)
      .json({ messge: "Internal server error", success: false });
  }
};

export const getBlogsBySingleUserController = async (req, res) => {
  try {
    const userId = req.id; //fetching user from auth token via middleware

    const blogs = await Blog.find({ postedBy: userId }); //finding all blogs posted by a single user
    if (!blogs) {
      return res.status(404).json({ message: "No blog found", success: false });
    }
    return res.status(201).json({ message: "Success", success: true, blogs });
  } catch (error) {
    console.log(error.message);
    return res
      .status(406)
      .json({ messge: "Internal server error", success: false });
  }
};

export const searchBlogController = async (req, res) => {
  try {
    const keyword = req.query.q;
    const results = await Blog.find({
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { content: { $regex: keyword, $options: "i" } },
      ], //the keyword might be present in either the content or title
    }).populate({ path: "postedBy" }); //populating the "postedBy" path in order to fetch user details as well
    if (!results) {
      return res
        .status(404)
        .json({ message: "Blogs not found", success: false });
    }
    return res
      .status(201)
      .json({ message: "Blogs found", success: true, results });
  } catch (error) {
    console.log(error.message);
    return res
      .status(406)
      .json({ messge: "Internal server error", success: false });
  }
};
