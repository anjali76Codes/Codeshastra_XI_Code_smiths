import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PostForm = () => {
    const [caption, setCaption] = useState('');
    const [postType, setPostType] = useState('');
    const [link, setLink] = useState('');
    const [photo, setPhoto] = useState(null);
    const [pollQuestion, setPollQuestion] = useState('');
    const [pollOptions, setPollOptions] = useState(['', '']);
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        } else {
            navigate('/');
        }
    }, [navigate]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setPhoto(URL.createObjectURL(file));
        }
    };

    const handlePollOptionChange = (index, value) => {
        const newOptions = [...pollOptions];
        newOptions[index] = value;
        setPollOptions(newOptions);
    };

    const handleAddPollOption = () => {
        setPollOptions([...pollOptions, '']);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const postData = {
            username,
            caption,
            postType,
            link,
            pollQuestion,
            pollOptions,
            photo: postType === 'photo' ? 'https://cdn-icons-png.freepik.com/256/13887/13887810.png?semt=ais_hybrid' : undefined,
        };

        try {
            const response = await axios.post('http://localhost:3000/api/community/posts', postData, {
                headers: { 'Content-Type': 'application/json' },
            });

            if ([200, 201].includes(response.status)) {
                setCaption('');
                setPostType('');
                setLink('');
                setPhoto(null);
                setPollQuestion('');
                setPollOptions(['', '']);
            } else {
                console.error('Error creating post:', response.data);
            }
        } catch (error) {
            console.error('Error:', error.response?.data || error.message);
        }
    };

    return (
        <div className="min-h-screen p-6 bg-gradient-to-b from-purple-200 via-white to-purple-300 text-black">
            <h1 className="text-center text-2xl font-semibold mb-10 text-black">Create a Community Post</h1>

            <form
                onSubmit={handleSubmit}
                className="max-w-2xl mx-auto p-8 rounded-3xl shadow-lg backdrop-blur-2xl bg-white/70 border-2 border-purple-300"
            >
                <h2 className="text-2xl font-bold text-center mb-6 text-purple-500">Create a Post</h2>

                {/* Caption */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Caption</label>
                    <textarea
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        className="w-full p-3 rounded-3xl border bg-purple-100 text-black border-purple-300"
                        placeholder="Write your caption..."
                    />
                </div>

                {/* Post Type Toggle */}
                <div className="mb-6 flex justify-end gap-4">
                    {['link', 'photo', 'poll'].map(type => (
                        <button
                            key={type}
                            type="button"
                            onClick={() => setPostType(type)}
                            className={`px-4 py-2 rounded-3xl font-semibold transition border-2 ${postType === type
                                ? 'bg-purple-700 text-white border-purple-400'
                                : 'bg-transparent text-purple-400 border-purple-300 hover:bg-purple-600 hover:text-white'
                            }`}
                        >
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Post Type Inputs */}
                {postType === 'link' && (
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Link</label>
                        <input
                            type="url"
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                            placeholder="https://example.com"
                            className="w-full p-3 rounded-3xl border bg-purple-100 text-black border-purple-300"
                        />
                    </div>
                )}

                {postType === 'photo' && (
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Photo</label>
                        <div
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => {
                                e.preventDefault();
                                const file = e.dataTransfer.files[0];
                                if (file && file.type.startsWith('image/')) {
                                    setPhoto(URL.createObjectURL(file));
                                }
                            }}
                            onClick={() => document.getElementById('fileInput').click()}
                            className="flex flex-col items-center justify-center w-full h-48 rounded-3xl border-2 border-dashed cursor-pointer bg-purple-100 border-purple-300 text-black hover:bg-purple-200 transition"
                        >
                            <input
                                type="file"
                                id="fileInput"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                            {photo ? (
                                <img src={photo} alt="Preview" className="w-full h-full object-cover rounded-2xl" />
                            ) : (
                                <div className="text-center">
                                    <p className="text-lg font-medium">Drag & Drop Image Here</p>
                                    <p className="text-sm mt-1 opacity-80">or click to browse</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {postType === 'poll' && (
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Poll Question</label>
                        <input
                            type="text"
                            value={pollQuestion}
                            onChange={(e) => setPollQuestion(e.target.value)}
                            className="w-full p-3 rounded-3xl border bg-purple-100 text-black border-purple-300"
                            placeholder="What do you think?"
                        />
                        <div className="mt-4">
                            {pollOptions.map((option, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    value={option}
                                    onChange={(e) => handlePollOptionChange(index, e.target.value)}
                                    className="w-full mt-2 p-3 rounded-3xl border bg-purple-100 text-black border-purple-300"
                                    placeholder={`Poll option ${index + 1}`}
                                />
                            ))}
                            <button
                                type="button"
                                onClick={handleAddPollOption}
                                className="mt-2 text-sm font-semibold text-purple-500 hover:underline"
                            >
                                + Add another option
                            </button>
                        </div>
                    </div>
                )}

                {/* Submit */}
                <div className="flex justify-center mt-6">
                    <button
                        type="submit"
                        className="px-6 py-2 bg-purple-700 text-white rounded-3xl font-semibold hover:bg-purple-600 transition"
                    >
                        Submit Post
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PostForm;
