import React, { useState } from 'react';
import CryptoJS from 'crypto-js';
import axios from 'axios';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { duotoneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const EncryptPage = ({ isDarkMode }) => {
  const [inputUrl, setInputUrl] = useState('https://jsonplaceholder.typicode.com/todos/1');
  const [encryptedUrl, setEncryptedUrl] = useState('');
  const [manualEncryptedUrl, setManualEncryptedUrl] = useState('');
  const [decryptedData, setDecryptedData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const secretKey = '124'; // Ideally not hardcoded in production

  const handleEncrypt = () => {
    const encrypted = CryptoJS.AES.encrypt(inputUrl, secretKey).toString();
    setEncryptedUrl(encrypted);
  };

  const handleFetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const urlToDecrypt = manualEncryptedUrl || encryptedUrl;
      const bytes = CryptoJS.AES.decrypt(urlToDecrypt, secretKey);
      const decryptedUrl = bytes.toString(CryptoJS.enc.Utf8);

      const response = await axios.get(decryptedUrl);
      setDecryptedData(response.data);
    } catch (err) {
      setError('Failed to fetch data or decrypt URL');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Copied to clipboard!');
    });
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const bgColor = isDarkMode ? 'bg-[#0f0f1a]' : 'bg-white';
  const cardColor = isDarkMode ? 'bg-[#1a1a2e]' : 'bg-gray-100';
  const inputColor = isDarkMode ? 'bg-[#2a2a40] text-white' : 'bg-white text-black';
  const textColor = isDarkMode ? 'text-white' : 'text-black';
  const borderColor = isDarkMode ? 'border-gray-700' : 'border-gray-300';
  const shadowStyle = 'shadow-xl shadow-purple-900/30';
  const buttonEncrypt = 'bg-purple-600 hover:bg-purple-700';
  const buttonFetch = 'bg-purple-600 hover:bg-purple-700';
  const buttonSecondary = 'bg-purple-500 hover:bg-purple-600';

  return (
    <div className={`min-h-screen ${bgColor} ${textColor} p-8 flex justify-center transition duration-300`}>
      <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-8">
        {/* Encrypt Section */}
        <div className={`${cardColor} ${shadowStyle} p-8 rounded-2xl w-full lg:w-1/2`}>
          <h2 className="text-center text-2xl font-bold text-purple-400 mb-6">🔐 Server Side: Encrypt URL</h2>

          <input
            type="text"
            className={`w-full p-4 rounded-lg mb-4 border ${borderColor} ${inputColor} focus:ring-2 focus:ring-purple-500`}
            placeholder="Enter API URL to Encrypt"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
          />

          <button
            onClick={handleEncrypt}
            className={`w-full text-white p-3 rounded-xl font-semibold transition ${buttonEncrypt}`}
          >
            Encrypt URL
          </button>

          {encryptedUrl && (
            <div className="mt-6">
              <h3 className="font-semibold mb-2">Encrypted URL:</h3>
              <div className="flex items-start gap-3">
                <pre className={`flex-1 p-4 rounded-lg overflow-x-auto ${inputColor}`}>{encryptedUrl}</pre>
                <button
                  onClick={() => handleCopy(encryptedUrl)}
                  className={`${buttonSecondary} text-white px-4 py-2 rounded-lg`}
                >
                  Copy
                </button>
              </div>
            </div>
          )}

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Decryption and API Call Snippet</h3>
            <SyntaxHighlighter
              language="javascript"
              style={isDarkMode ? duotoneDark : solarizedlight}
              customStyle={{
                backgroundColor: 'transparent',
                padding: '1rem',
                borderRadius: '0.5rem',
              }}
            >
{`const secretKey = '124';
const encryptedUrl = 'Your Encrypted URL';
const bytes = CryptoJS.AES.decrypt(encryptedUrl, secretKey);
const decryptedUrl = bytes.toString(CryptoJS.enc.Utf8);

axios.get(decryptedUrl)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error('Error fetching:', error);
  });`}
            </SyntaxHighlighter>

            <button
              onClick={() => handleCopy(`const secretKey = '124';\nconst encryptedUrl = 'Your Encrypted URL';\nconst bytes = CryptoJS.AES.decrypt(encryptedUrl, secretKey);\nconst decryptedUrl = bytes.toString(CryptoJS.enc.Utf8);\n\naxios.get(decryptedUrl)\n  .then(response => {\n    console.log(response.data);\n  })\n  .catch(error => {\n    console.error('Error fetching:', error);\n  });`)}
              className={`mt-4 ${buttonSecondary} text-white px-4 py-2 rounded-lg`}
            >
              Copy Code
            </button>
          </div>
        </div>

        {/* Decrypt + Fetch Section */}
        <div className={`${cardColor} ${shadowStyle} p-8 rounded-2xl w-full lg:w-1/2`}>
          <h2 className="text-center text-2xl font-bold text-purple-400 mb-6">🌐 Client Side: Fetch Encrypted URL</h2>

          <input
            type="text"
            className={`w-full p-4 rounded-lg mb-4 border ${borderColor} ${inputColor} focus:ring-2 focus:ring-purple-500`}
            placeholder="Paste Encrypted URL"
            value={manualEncryptedUrl}
            onChange={(e) => setManualEncryptedUrl(e.target.value)}
          />

          <button
            onClick={handleFetchData}
            className={`w-full text-white p-3 rounded-xl font-semibold transition ${buttonFetch}`}
          >
            Fetch Data from Encrypted URL
          </button>

          {loading && <div className="text-center mt-4 text-purple-400">Loading...</div>}
          {error && <div className="text-center mt-4 text-red-400">{error}</div>}

          {decryptedData && (
            <div className="mt-6">
              <h3 className="font-semibold mb-2">Decrypted Response:</h3>
              <pre className={`p-4 rounded-lg overflow-x-auto whitespace-pre-wrap ${inputColor}`}>
                {JSON.stringify(decryptedData, null, 2).split('\n').slice(0, isExpanded ? undefined : 6).join('\n')}
              </pre>
              <button
                onClick={toggleExpand}
                className={`mt-4 ${buttonSecondary} text-white px-4 py-2 rounded-lg`}
              >
                {isExpanded ? 'Show Less' : 'Show More'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EncryptPage;
