import postMessage from '../models/postMessage.js';
import mongoose from 'mongoose';
import User from '../models/user.js';



export const createPosts = async (req, res) => {
  const {
    title,
    message,
    tags,
    selectedFile
  } = req.body;

  // Determine the name: prefer the name set by the auth middleware,
  // otherwise try to load it from the User collection as a fallback.
  let creatorName = req.userName;
  try {
    if ((!creatorName || creatorName === '') && req.userId) {
      const user = await User.findById(req.userId).select('name');
      creatorName = user?.name || 'Anonymous';
    }
  } catch (err) {
    creatorName = creatorName || 'Anonymous';
  }

  const newPostMessage = new postMessage({
    creator: req.userId,
    name: creatorName,
    title,
    message,
    tags: (req.body.tags || '').split(',').map(t => t.trim()),
    selectedFile,
  });

  try {
    await newPostMessage.save();
    res.status(201).json(newPostMessage);
  } catch (error) {
    console.error('Error saving to MongoDB:', error);
    res.status(409).json({ message: error.message });
  }
};

// Get a single post by ID
export const getPost = async (req, res) => {
  const { id } = req.params

  try {
    const post = await postMessage.findById(id);
    // If the post exists but doesn't have a name, try to populate it from the user
    if (post && (!post.name || post.name === '') && post.creator) {
      try {
        const user = await User.findById(post.creator).select('name');
        if (user?.name) post.name = user.name;
      } catch (e) {
        // ignore and return post as-is
      }
    }
    res.status(200).json(post);
  } catch (error) {
    console.error('Error getPost to mongoDb:', error);
    res.status(404).json({ message: error.message });
  }
}


export const getPosts = async (req, res) => {
  const { page } = req.query;

  try {
    const LIMIT = 8;
    const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page

    const total = await postMessage.countDocuments({});
    const posts = await postMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

    // For any posts missing a name, bulk-fetch user names to avoid N queries
    const postsMissingName = posts.filter(p => !p.name && p.creator);
    if (postsMissingName.length > 0) {
      const creatorIds = [...new Set(postsMissingName.map(p => p.creator))];
      try {
        const users = await User.find({ _id: { $in: creatorIds } }).select('name');
        const nameMap = new Map(users.map(u => [String(u._id), u.name]));
        posts.forEach(p => {
          if ((!p.name || p.name === '') && p.creator) {
            const mapped = nameMap.get(String(p.creator));
            if (mapped) p.name = mapped;
          }
        });
      } catch (e) {
        // ignore lookup errors and return posts as-is
      }
    }

    res.json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

// query = /posts/search?searchQuery -> page=1
// parameters = ./posts/12345 -> id=12345

// Search posts by title or tags
export const getPostsBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;
  try {
    const title = new RegExp(searchQuery, 'i'); // 'i' for case-insensitive
    const posts = await postMessage.find({
      $or: [{ title }, { tags: { $in: tags.split(',').map(tag => tag.trim()) } }]
    }).sort({ createdAt: -1 });
    res.json({ data: posts });
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
