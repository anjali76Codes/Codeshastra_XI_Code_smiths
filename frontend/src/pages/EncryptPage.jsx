import React, { useState } from 'react';
import CryptoJS from 'crypto-js';
import axios from 'axios';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism'; // Updated style

const EncryptPage = () => {
  const [inputUrl, setInputUrl] = useState('https://jsonplaceholder.typicode.com/todos/1');
  const [encryptedUrl, setEncryptedUrl] = useState('');
  const [manualEncryptedUrl, setManualEncryptedUrl] = useState('');
  const [decryptedData, setDecryptedData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const secretKey = '124'; // Ideally, this should not be hardcoded

  // Encrypt API URL (Server Side Logic)
  const handleEncrypt = () => {
    const encrypted = CryptoJS.AES.encrypt(inputUrl, secretKey).toString();
    setEncryptedUrl(encrypted);
  };

  // Fetch data from the manually entered encrypted URL (Client Side)
  const handleFetchData = async () => {
    setLoading(true);
    try {
      const urlToDecrypt = manualEncryptedUrl || encryptedUrl; // Use manual encrypted URL if provided

      const bytes = CryptoJS.AES.decrypt(urlToDecrypt, secretKey);
      const decryptedUrl = bytes.toString(CryptoJS.enc.Utf8);

      const response = await axios.get(decryptedUrl);
      setDecryptedData(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch data or decrypt URL');
      setLoading(false);
    }
  };

  // Function to escape characters in the URL for safe use in the code snippet
  const escapeStringForSnippet = (str) => {
    return str.replace(/`/g, '\\`').replace(/\$/g, '\\$'); // Escape backticks and dollar signs
  };

  // Copy content to clipboard
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Copied to clipboard!');
    }).catch(err => {
      alert('Failed to copy text: ', err);
    });
  };

  // Toggle show more/less
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 flex justify-center">
      <div className="w-full max-w-7xl flex flex-row gap-8">
        {/* Server Side: Encrypt URL Section */}
        <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-1/2">
          <h2 className="text-center text-2xl font-semibold text-blue-500 mb-6">Server Side: Encrypt URL</h2>

          <input
            type="text"
            className="w-full p-4 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 mb-6"
            placeholder="Enter API URL to Encrypt"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
          />
          <button
            onClick={handleEncrypt}
            className="w-full bg-blue-600 text-white p-4 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 mb-6"
          >
            Encrypt URL
          </button>

          {/* Display Encrypted URL */}
          {encryptedUrl && (
            <div className="mb-6">
              <strong className="block text-lg mb-2">Encrypted URL:</strong>
              <div className="flex justify-between items-center">
                <pre className="bg-gray-700 p-4 rounded-lg break-words overflow-x-auto">{encryptedUrl}</pre>
                <button
                  onClick={() => handleCopy(encryptedUrl)}
                  className="bg-blue-500 text-white p-2 rounded-lg ml-4 hover:bg-blue-600"
                >
                  Copy
                </button>
              </div>
            </div>
          )}

          {/* Code Snippet for Decryption and API Call */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-white mb-4">Decryption and API Call (Client-Side)</h3>
            <SyntaxHighlighter language="javascript" style={solarizedlight}>
              {`const secretKey = '124'; // Your AES Secret Key

const encryptedUrl = 'Your Encrypted URL'; // Encrypted URL

// Decrypt the URL
const bytes = CryptoJS.AES.decrypt(encryptedUrl, secretKey);
const decryptedUrl = bytes.toString(CryptoJS.enc.Utf8);

// Fetch data from decrypted URL
axios.get(decryptedUrl)
  .then(response => {
    console.log(response.data); // Data fetched from the API
  })
  .catch(error => {
    console.error('Error fetching data: ', error);
  });
`}
            </SyntaxHighlighter>
            <button
              onClick={() => handleCopy(`const secretKey = '124';\n\nconst encryptedUrl = 'Your Encrypted URL';\n\n// Decrypt the URL\nconst bytes = CryptoJS.AES.decrypt(encryptedUrl, secretKey);\nconst decryptedUrl = bytes.toString(CryptoJS.enc.Utf8);\n\n// Fetch data from decrypted URL\naxios.get(decryptedUrl)\n  .then(response => {\n    console.log(response.data); // Data fetched from the API\n  })\n  .catch(error => {\n    console.error('Error fetching data: ', error);\n  });`)}
              className="bg-blue-500 text-white p-2 rounded-lg mt-4 hover:bg-blue-600"
            >
              Copy Code
            </button>
          </div>
        </div>

        {/* Client Side: Fetch Data from Encrypted URL Section */}
        <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-1/2">
          <h2 className="text-center text-2xl font-semibold text-green-500 mb-6">Client Side: Fetch Data from Encrypted URL</h2>

          <input
            type="text"
            className="w-full p-4 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 mb-6"
            placeholder="Enter Encrypted URL to Fetch"
            value={manualEncryptedUrl}
            onChange={(e) => setManualEncryptedUrl(e.target.value)}
          />
          <button
            onClick={handleFetchData}
            className="w-full bg-green-600 text-white p-4 rounded-lg font-semibold hover:bg-green-700 transition duration-300"
          >
            Fetch Data from Encrypted URL
          </button>

          {/* Loading and Error States */}
          {loading && <div className="text-center text-blue-500 mt-4">Loading...</div>}
          {error && <div className="text-center text-red-500 mt-4">{error}</div>}

          {/* Decrypted Data Display */}
          {decryptedData && (
            <div className="mt-6">
              <pre className="bg-gray-700 p-4 rounded-lg overflow-x-auto">
                {JSON.stringify(decryptedData, null, 2).split('\n').slice(0, isExpanded ? undefined : 6).join('\n')}
              </pre>
              <button
                onClick={toggleExpand}
                className="bg-blue-500 text-white p-2 rounded-lg mt-4 hover:bg-blue-600"
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
