import postMessage from '../models/postMessage.js';
import mongoose from 'mongoose';



export const createPosts = async (req, res) => {
  const {
    creator,
    title,
    message,
    tags,
    selectedFile
  } = req.body
  const post = req.body;

  const newPostMessage = new postMessage({
    creator: req.userId,
    title,
    message,
    tags: (req.body.tags || '').split(',').map(t => t.trim()),
    selectedFile, // store a URL-path, not disk path
  });
  try {
    await newPostMessage.save();

    res.status(201).json(newPostMessage);
  } catch (error) {
    console.error('Error saving to MongoDB:', error);
    res.status(409).json({ message: error.message });
  }
}

export const getPosts = async (req, res) => {
  try {
    const postMessages = await postMessage.find()
      .select('_id title message creator tags createdAt likes selectedFile')
      .sort({ createdAt: -1 })
      .limit(20);   // or use pagination
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}



export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

  const updatedPost = await postMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true });

  res.json(updatedPost);
}

export const deletePost = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');
  await postMessage.findByIdAndDelete(_id);
  res.json({ message: 'Post deleted successfully.' });
}

export const likePost = async (req, res) => {
  const { id } = req.params;


  if (!req.userId) {
    return res.json({ message: 'Unauthenticated' });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send('No post with that id');
  }

  const post = await postMessage.findById(id);

  const index = post.likes.findIndex((uid) => uid === String(req.userId));

  if (index === -1) {
    post.likes.push(req.userId);
  } else {
    post.likes = post.likes.filter((uid) => uid !== String(req.userId));
  }

  const updatedPost = await postMessage.findByIdAndUpdate(id, post, { new: true });
  res.json(updatedPost);
};
