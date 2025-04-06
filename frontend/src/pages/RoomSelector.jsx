import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import axios from 'axios';

const RoomSelector = () => {
  const [roomCode, setRoomCode] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const createRoom = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/room/create', {
        text: 'The quick brown fox jumps over the lazy dog',
      });
      navigate(`/test/${response.data.code}`); // Use navigate instead of history.push
    } catch (error) {
      console.error('Error creating room:', error);
    }
  };

  const joinRoom = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/room/join', {
        code: roomCode,
        username,
      });
      navigate(`/test/${response.data.code}`); // Use navigate instead of history.push
    } catch (error) {
      console.error('Error joining room:', error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md bg-gray-800 text-white rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-semibold text-center mb-6">Welcome to the Typing Test</h2>
        
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 mb-4 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex justify-between items-center mb-4">
          <button
            onClick={createRoom}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Create Room
          </button>
        </div>

        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Enter room code"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value)}
            className="w-full p-3 mb-4 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={joinRoom}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Join Room
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomSelector;
