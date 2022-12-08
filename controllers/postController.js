const Post = require("../models/Post");
const Group = require("../models/Group");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const User = require("../models/User");

const getAllPosts = async (req, res) => {
  const { userId } = req.user;
  const user = await User.findOne({ _id: userId });
  const posts = await Post.find({ group: { $in: user.groups } });
  res.status(StatusCodes.OK).json({ posts });
};

const createPost = async (req, res) => {
  const { userId } = req.user;
  const { group_name, content, author } = req.body;
  const user = await User.findOne({ _id: userId });

  const group = await Group.findOne({ user: userId, name: group_name });
  if (!group) {
    throw new CustomError.BadRequestError(`Group does not exist `);
  }
  const post = await Post.create({ content, author, group: group._id });
  res.status(StatusCodes.OK).json(post);
};

const getPostByName = async (req, res) => {
  let { group_name } = req.body;
  const group = await Group.findOne({ name: group_name });
  if (!group) {
    throw new CustomError.BadRequestError(`Group does not exist `);
  }
  const posts = await Post.find({ group: group._id });
  res.status(StatusCodes.OK).json(posts);
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!post) {
    throw new CustomErorr.BadRequestError("Can't find the post");
  }
  res.status(StatusCodes.OK).json({ post });
};

const removePost = async (req, res) => {
  res.send("Remove Post");
};
module.exports = {
  getAllPosts,
  createPost,
  getPostByName,
  updatePost,
  removePost,
};
