import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import axios from 'axios';

const TypingTest = ({ match }) => {
  const [text, setText] = useState('');
  const [typedText, setTypedText] = useState('');
  const [time, setTime] = useState(0);
  const [username, setUsername] = useState('Player');
  const [results, setResults] = useState([]);
  const socket = socketIOClient('http://localhost:5000');

  useEffect(() => {
    const { code } = match.params;
    socket.emit('joinRoom', code, username);

    socket.on('playerJoined', (newPlayer) => {
      console.log(`${newPlayer} joined the room`);
    });

    socket.on('updateResults', (newResults) => {
      setResults(newResults);
    });

    // Fetch the test text from the server
    axios.get(`http://localhost:5000/api/room/${code}`)
      .then((response) => {
        setText(response.data.text);
      });

    return () => {
      socket.disconnect();
    };
  }, [match.params, username]);

  const handleInputChange = (e) => {
    setTypedText(e.target.value);
    if (e.target.value === text) {
      const accuracy = (typedText.length / text.length) * 100;
      const result = { username, time, accuracy };
      socket.emit('submitResult', match.params.code, result);
    }
  };

  const startTimer = () => {
    setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
  };

  return (
    <div className="flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-xl bg-gray-800 text-white rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-semibold text-center mb-6">Typing Test</h2>
        <p className="text-lg mb-6">Text: {text}</p>

        <input
          type="text"
          value={typedText}
          onChange={handleInputChange}
          onFocus={startTimer}
          placeholder="Start typing"
          className="w-full p-3 mb-4 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <h3 className="text-xl text-center mb-4">Time: {time} seconds</h3>
        <div className="mt-4">
          <h4 className="text-xl text-center">Results:</h4>
          {results.map((result, index) => (
            <div key={index} className="mb-2 text-center">
              <p>{result.username}: {result.accuracy}% accuracy, {result.time}s</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TypingTest;
