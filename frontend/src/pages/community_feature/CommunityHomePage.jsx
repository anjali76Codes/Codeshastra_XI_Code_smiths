import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CommunityHomePage = () => {
    const [posts, setPosts] = useState([]);
    const [commentText, setCommentText] = useState({});
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

    const handleLike = async (postId) => {
        try {
            await axios.patch(`http://localhost:3000/api/community/posts/${postId}/like`, { username });
            fetchPosts(); // refresh
        } catch (err) {
            console.error('Error liking post:', err);
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
            fetchPosts(); // refresh
        } catch (err) {
            console.error('Error commenting:', err);
        }
    };

    return (
        <div className="max-w-4xl mx-auto py-10">
            <h2 className="text-2xl font-bold mt-10 mb-6">Community Posts</h2>
            {posts.length === 0 ? (
                <p>No posts yet.</p>
            ) : (
                posts.map((post) => (
                    <div key={post._id} className="mb-6 p-4 bg-white shadow rounded-lg">
                        <div className="text-sm text-gray-500">Posted by @{post.username}</div>
                        <h3 className="text-lg font-semibold mt-1">{post.caption}</h3>

                        {post.postType === 'link' && post.link && (
                            <a
                                href={post.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 underline block mt-2"
                            >
                                {post.link}
                            </a>
                        )}

                        {post.postType === 'photo' && post.photo && (
                            <img
                                src={post.photo}
                                alt="Post"
                                className="mt-3 max-h-60 w-full object-cover rounded-md"
                            />
                        )}

                        {post.postType === 'poll' && (
                            <div className="mt-3">
                                <strong className="block mb-1">{post.pollQuestion}</strong>
                                <ul className="list-disc list-inside">
                                    {post.pollOptions.map((option, idx) => (
                                        <li key={idx}>{option}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <div className="mt-3 text-sm text-gray-600">
                            ❤️ {post.likes.length} Likes · 💬 {post.comments.length} Comments
                        </div>

                        <div className="flex items-center gap-4 mt-3">
                            <button
                                onClick={() => handleLike(post._id)}
                                className="text-red-500 text-sm font-medium"
                            >
                                {post.likes.includes(username) ? 'Unlike ❤️' : 'Like 🤍'}
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
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                            <button
                                onClick={() => handleComment(post._id)}
                                className="mt-2 bg-blue-500 text-white px-4 py-1 rounded"
                            >
                                Comment
                            </button>
                        </div>

                        {post.comments.length > 0 && (
                            <div className="mt-4">
                                {post.comments.map((comment, idx) => (
                                    <div key={idx} className="text-sm text-gray-700 mt-1">
                                        <strong>@{comment.username}</strong>: {comment.text}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))
            )}
        </div>
    );
};

export default CommunityHomePage;
