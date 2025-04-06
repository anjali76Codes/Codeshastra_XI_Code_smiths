import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PostForm from '../../components/community_feature/PostForm';

const CommunityHomePage = () => {
    const [posts, setPosts] = useState([]);
    const [commentText, setCommentText] = useState({});
    const [showPostForm, setShowPostForm] = useState(false);
    const username = localStorage.getItem('username');

    const fetchPosts = async () => {
        try {
            const res = await axios.get('http://localhost:3000/api/community/posts');
            setPosts(res.data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleStar = async (postId) => {
        try {
            await axios.patch(`http://localhost:3000/api/community/posts/${postId}/like`, { username });
            fetchPosts();
        } catch (err) {
            console.error('Error starring post:', err);
        }
    };

    const handleComment = async (postId) => {
        try {
            const text = commentText[postId];
            if (!text) return;
            await axios.post(`http://localhost:3000/api/community/posts/${postId}/comment`, {
                username,
                text,
            });
            setCommentText((prev) => ({ ...prev, [postId]: '' }));
            fetchPosts();
        } catch (err) {
            console.error('Error commenting:', err);
        }
    };

    return (
        <div className="relative min-h-screen px-4 py-10 bg-gradient-to-b from-purple-100 via-white to-purple-200 text-black">
            <h2 className="text-4xl font-extrabold text-center mb-10 text-purple-600">✨ Community Feed ✨</h2>

            {/* Slide-in Post Form */}
            <div className={`fixed top-0 right-0 h-full w-full max-w-lg z-50 transition-transform duration-500 ${showPostForm ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="relative h-full bg-white shadow-xl border-l border-purple-300 overflow-y-auto">
                    <button
                        onClick={() => setShowPostForm(false)}
                        className="absolute top-4 right-4 text-purple-700 hover:text-purple-500 font-bold text-lg"
                    >
                        ✖
                    </button>
                    <PostForm />
                </div>
            </div>

            {/* Floating Button */}
            <button
                onClick={() => setShowPostForm(true)}
                className="fixed bottom-8 right-8 z-40 px-6 py-3 bg-purple-700 hover:bg-purple-600 text-white rounded-full shadow-xl text-lg font-semibold transition"
            >
                + Make a Post
            </button>

            {posts.length === 0 ? (
                <p className="text-center text-xl opacity-70">No posts yet. Be the first to post!</p>
            ) : (
                <div className="grid gap-8 max-w-4xl mx-auto">
                    {posts.map((post) => (
                        <div
                            key={post._id}
                            className="p-6 rounded-3xl border-2 border-purple-300 shadow-xl backdrop-blur-xl bg-white/70 transition-all duration-300 hover:scale-[1.02]"
                        >
                            <div className="text-sm text-purple-800">Posted by <span className="font-semibold">@{post.username}</span></div>
                            <h3 className="text-xl font-bold mt-2 text-purple-900">{post.caption}</h3>

                            {post.postType === 'link' && post.link && (
                                <a
                                    href={post.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block mt-3 text-blue-500 underline hover:text-blue-400"
                                >
                                    🔗 {post.link}
                                </a>
                            )}

                            {post.postType === 'photo' && post.photo && (
                                <img
                                    src={post.photo}
                                    alt="Post"
                                    className="mt-4 w-full max-h-60 object-cover rounded-xl border border-purple-700"
                                />
                            )}

                            {post.postType === 'poll' && (
                                <div className="mt-4 w-1/2 p-2 rounded-2xl bg-purple-200/50">
                                    <p className="font-semibold text-lg text-purple-800 mb-2">{post.pollQuestion}</p>
                                    <ul className="space-y-1 text-sm">
                                        {post.pollOptions.map((option, idx) => (
                                            <li key={idx} className="pl-3 py-1 rounded bg-purple-300">
                                                {option}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <div className="mt-4 text-sm text-purple-700">
                                ⭐ {post.likes.length} Stars · 💬 {post.comments.length} Comments
                            </div>

                            <div className="flex items-center gap-4 mt-3">
                                <button
                                    onClick={() => handleStar(post._id)}
                                    className="text-sm font-medium text-yellow-700 hover:text-yellow-600 transition bg-yellow-100 rounded-3xl px-3 py-1"
                                >
                                    {post.likes.includes(username) ? 'Unstar ⭐' : 'Star ☆'}
                                </button>
                            </div>

                            <div className="mt-4">
                                <input
                                    type="text"
                                    placeholder="Write a comment..."
                                    value={commentText[post._id] || ''}
                                    onChange={(e) =>
                                        setCommentText((prev) => ({ ...prev, [post._id]: e.target.value }))
                                    }
                                    className="w-full p-3 rounded-2xl mt-1 border text-sm bg-purple-100 text-black border-purple-300"
                                />
                                <button
                                    onClick={() => handleComment(post._id)}
                                    className="mt-2 bg-purple-600 hover:bg-purple-500 text-white px-4 py-1.5 rounded-2xl font-medium transition"
                                >
                                    Comment
                                </button>
                            </div>

                            {post.comments.length > 0 && (
                                <div className="mt-4 space-y-2">
                                    {post.comments.map((comment, idx) => (
                                        <div key={idx} className="text-sm text-purple-800">
                                            <span className="font-semibold text-purple-500">@{comment.username}</span>: {comment.text}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CommunityHomePage;
