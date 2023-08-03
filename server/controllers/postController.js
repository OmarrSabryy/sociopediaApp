import Post from '../models/Post.js';
import User from '../models/User.js';

export const newPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });

    await newPost.save();
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(201).json({
      status: 'success',
      posts,
    });
  } catch (err) {
    res.status(409).json({ status: 'error', message: err.message });
  }
};

export const getFeedPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });

    res.status(200).json({
      status: 'success',
      posts,
    });
  } catch (err) {
    res.status(404).json({ status: 'error', message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await Post.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({ status: 'success', posts });
  } catch (err) {
    res.status(404).json({ status: 'error', message: err.message });
  }
};

export const likePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = req.body;

    const post = await Post.findById(postId);
    const isLiked = post.likes.get(userId);

    if (!isLiked) post.likes.set(userId, true);
    else post.likes.delete(userId);

    await post.save();
    // const updatedPost = Post.findByIdAndUpdate(postId,{likes: post.likes}, {new: true})
    res.status(200).json({ status: 'success', post });
  } catch (err) {
    res.status(404).json({ status: 'error', message: err.message });
  }
};
