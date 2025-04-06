import React, { useState, useRef } from 'react';
import QRCode from 'react-qr-code';

const QRGenerator = ({ isDarkMode }) => {
  const [link, setLink] = useState('');
  const qrRef = useRef();

  const handleDownload = () => {
    const svg = qrRef.current?.querySelector('svg');
    if (!svg) return;

    const serializer = new XMLSerializer();
    const svgData = serializer.serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const img = new Image();
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);

      const imgURL = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = imgURL;
      link.download = 'qr-code.png';
      link.click();
    };

    img.src = url;
  };

  return (
    <div className={`max-w-md mx-auto mt-10 p-6 border-2 rounded-2xl shadow-md backdrop-blur-lg transition-colors duration-300
      ${isDarkMode
        ? 'bg-purple-900/20 border-white text-white'
        : 'bg-purple-300/80 border-purple-200 text-black'
      }`}
    >
      <h2 className="text-2xl font-semibold mb-4 text-center">QR Code Generator</h2>
      <input
        type="text"
        placeholder="Enter a URL"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        className={`w-full px-4 py-2 rounded-3xl mb-4 focus:outline-none focus:ring-2
          ${isDarkMode
            ? 'bg-purple-900/80 text-white focus:ring-purple-300'
            : 'bg-purple-100 text-black focus:ring-blue-400'
          }`}
      />
      {link && (
        <div className={`flex flex-col items-center mt-4 p-4 rounded-lg
          ${isDarkMode ? 'bg-gray-100' : 'bg-gray-100'}`} ref={qrRef}
        >
          <QRCode
            value={link}
            size={256}
            bgColor={isDarkMode ? '#1f1f1f' : '#ffffff'}
            fgColor={isDarkMode ? '#ffffff' : '#000000'}
          />
          <button
            onClick={handleDownload}
            className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-3xl hover:bg-purple-700 transition"
          >
            Download QR
          </button>
        </div>
      )}
    </div>
  );
};

export default QRGenerator;
