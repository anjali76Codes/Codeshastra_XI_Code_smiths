import React, { useState } from 'react';
import CryptoJS from 'crypto-js';

const EncryptForm = ({ setEncryptedUrl, isDarkMode }) => {
  const [inputUrl, setInputUrl] = useState('');
  const secretKey = 'your-secret-key'; // Make sure to securely store this in real projects

  const handleEncrypt = () => {
    const encrypted = CryptoJS.AES.encrypt(inputUrl, secretKey).toString();
    setEncryptedUrl(encrypted);
  };

  const containerClasses = isDarkMode
    ? 'bg-[#111827] text-white'
    : 'bg-white text-black';

  const inputClasses = isDarkMode
    ? 'bg-[#1f2937] border-gray-600 text-white placeholder-gray-400'
    : 'bg-white border-gray-300 text-black placeholder-gray-500';

  const buttonClasses = isDarkMode
    ? 'bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white'
    : 'bg-gradient-to-r from-purple-400 to-purple-600 hover:from-purple-500 hover:to-purple-700 text-white';

  return (
    <div
      className={`mb-6 max-w-md mx-auto p-6 rounded-2xl shadow-lg transition-all duration-300 ${containerClasses}`}
    >
      <input
        type="text"
        className={`w-full p-3 rounded-lg mb-4 border ${inputClasses}`}
        placeholder="Enter API URL"
        value={inputUrl}
        onChange={(e) => setInputUrl(e.target.value)}
      />
      <button
        onClick={handleEncrypt}
        className={`w-full p-3 rounded-lg font-semibold shadow-md transition ${buttonClasses}`}
      >
        Encrypt URL
      </button>
    </div>
  );
};

export default EncryptForm;
