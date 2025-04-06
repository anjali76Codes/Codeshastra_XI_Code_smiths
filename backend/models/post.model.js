import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    username: { type: String, required: true },
    text: { type: String, required: true },
}, { timestamps: true });

const postSchema = new mongoose.Schema({
    username: { type: String, required: true }, // User who made the post
    caption: { type: String, required: true },
    postType: { type: String, enum: ['link', 'photo', 'poll'], required: true },
    link: { type: String },
    photo: { type: String }, // static URL if photo type
    pollQuestion: { type: String },
    pollOptions: [{ type: String }],

    likes: [{ type: String }], // Array of usernames who liked
    comments: [commentSchema], // Array of comments

}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);
export default Post;
