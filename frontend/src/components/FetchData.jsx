import React, { useEffect, useState } from 'react';
import CryptoJS from 'crypto-js';
import axios from 'axios';

const FetchData = ({ encryptedUrl }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const secretKey = 'your-secret-key'; // Make sure to securely store the key

  useEffect(() => {
    if (encryptedUrl) {
      setLoading(true);
      try {
        // Decrypt the URL using AES
        const bytes = CryptoJS.AES.decrypt(encryptedUrl, secretKey);
        const decryptedUrl = bytes.toString(CryptoJS.enc.Utf8);

        // Fetch data from the decrypted URL
        axios.get(decryptedUrl)
          .then(response => {
            setData(response.data);
            setLoading(false);
          })
          .catch(err => {
            setError('Failed to fetch data');
            setLoading(false);
          });
      } catch (err) {
        setError('Decryption failed');
        setLoading(false);
      }
    }
  }, [encryptedUrl, secretKey]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (data) return <pre className="bg-gray-200 p-4 rounded">{JSON.stringify(data, null, 2)}</pre>;

  return null;
};

export default FetchData;
