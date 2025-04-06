import Post from "../models/post.model.js";

// CREATE a new post
export const createPost = async (req, res) => {
    try {
        const {
            username,
            caption,
            postType,
            link,
            pollQuestion,
            pollOptions
        } = req.body;

        if (!username || !caption || !postType) {
            return res.status(400).json({ error: "Username, caption, and postType are required." });
        }

        let photo = null;
        if (postType === 'photo') {
            photo = 'https://cdn-icons-png.freepik.com/256/13887/13887810.png?semt=ais_hybrid';
        }

        const newPost = new Post({
            username,
            caption,
            postType,
            link,
            photo,
            pollQuestion,
            pollOptions,
            likes: [],
            comments: []
        });

        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ error: 'Server Error' });
    }
};

export const likePost = async (req, res) => {
    const { postId } = req.params;
    const { username } = req.body;

    try {
        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ error: 'Post not found' });

        if (post.likes.includes(username)) {
            // Unlike
            post.likes = post.likes.filter((u) => u !== username);
        } else {
            // Like
            post.likes.push(username);
        }

        await post.save();
        res.json(post);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error' });
    }
};

// Add a comment
export const commentOnPost = async (req, res) => {
    const { postId } = req.params;
    const { username, text } = req.body;

    try {
        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ error: 'Post not found' });

        post.comments.push({ username, text });
        await post.save();

        res.json(post);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error' });
    }
};

// Get all posts
export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.json(posts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error' });
    }
};
