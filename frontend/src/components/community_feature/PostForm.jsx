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
        if (file) {
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

        let postData = {
            username,
            caption,
            postType,
            link,
            pollQuestion,
            pollOptions,
        };

        if (postType === 'photo') {
            postData.photo = 'https://cdn-icons-png.freepik.com/256/13887/13887810.png?semt=ais_hybrid';
        }

        try {
            const response = await axios.post('http://localhost:3000/api/community/posts', postData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200 || response.status === 201) {
                console.log('Post created successfully:', response.data);
                // Clear form on success
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
            console.error('Error:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-center mb-4">Create a Post</h2>

            {/* Caption */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Caption</label>
                <textarea
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    className="w-full mt-2 p-3 border border-gray-300 rounded-md"
                    placeholder="Write your caption..."
                />
            </div>

            {/* Post Type Toggle */}
            <div className="mb-4 flex justify-evenly">
                <button
                    type="button"
                    onClick={() => setPostType('link')}
                    className={`px-4 py-2 rounded-md ${postType === 'link' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                    Link
                </button>
                <button
                    type="button"
                    onClick={() => setPostType('photo')}
                    className={`px-4 py-2 rounded-md ${postType === 'photo' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                    Photo
                </button>
                <button
                    type="button"
                    onClick={() => setPostType('poll')}
                    className={`px-4 py-2 rounded-md ${postType === 'poll' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                    Poll
                </button>
            </div>

            {/* Post Type Specific Inputs */}
            {postType === 'link' && (
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Link</label>
                    <input
                        type="url"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        className="w-full mt-2 p-3 border border-gray-300 rounded-md"
                        placeholder="https://example.com"
                    />
                </div>
            )}

            {postType === 'photo' && (
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Photo</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="w-full mt-2 p-3 border border-gray-300 rounded-md"
                    />
                    {photo && (
                        <div className="mt-4">
                            <img src={photo} alt="Preview" className="w-full max-h-60 object-cover rounded-md" />
                        </div>
                    )}
                </div>
            )}

            {postType === 'poll' && (
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Poll Question</label>
                    <input
                        type="text"
                        value={pollQuestion}
                        onChange={(e) => setPollQuestion(e.target.value)}
                        className="w-full mt-2 p-3 border border-gray-300 rounded-md"
                        placeholder="What do you think?"
                    />
                    <div className="mt-4">
                        {pollOptions.map((option, index) => (
                            <input
                                key={index}
                                type="text"
                                value={option}
                                onChange={(e) => handlePollOptionChange(index, e.target.value)}
                                className="w-full mt-2 p-3 border border-gray-300 rounded-md mb-2"
                                placeholder={`Poll option ${index + 1}`}
                            />
                        ))}
                        <button
                            type="button"
                            onClick={handleAddPollOption}
                            className="text-sm text-blue-500 mt-2"
                        >
                            Add another option
                        </button>
                    </div>
                </div>
            )}

            {/* Submit */}
            <div className="flex justify-center mt-6">
                <button
                    type="submit"
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
                >
                    Submit Post
                </button>
            </div>
        </form>
    );
};

export default PostForm;
