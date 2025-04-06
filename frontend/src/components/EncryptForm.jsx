import React, { useState } from 'react';
import CryptoJS from 'crypto-js';

const EncryptForm = ({ setEncryptedUrl }) => {
  const [inputUrl, setInputUrl] = useState('');
  const secretKey = 'your-secret-key'; // Make sure to securely store the key

  const handleEncrypt = () => {
    // Encrypt the URL using AES
    const encrypted = CryptoJS.AES.encrypt(inputUrl, secretKey).toString();
    setEncryptedUrl(encrypted); // Set the encrypted URL in the parent state
  };

  return (
    <div className="mb-6 max-w-md mx-auto p-4 bg-white rounded shadow-md">
      <input
        type="text"
        className="w-full p-3 border border-gray-300 rounded mb-4"
        placeholder="Enter API URL"
        value={inputUrl}
        onChange={(e) => setInputUrl(e.target.value)}
      />
      <button
        onClick={handleEncrypt}
        className="w-full bg-blue-500 text-white p-3 rounded"
      >
        Encrypt URL
      </button>
    </div>
  );
};

export default EncryptForm;
