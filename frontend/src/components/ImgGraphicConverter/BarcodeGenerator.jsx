import React, { useState, useRef } from 'react';
import Barcode from 'react-barcode';

const BarcodeGenerator = ({ isDarkMode }) => {
  const [value, setValue] = useState('');
  const [format, setFormat] = useState('EAN13');
  const barcodeRef = useRef();

  const barcodeTypes = [
    { value: 'EAN13', label: 'Retail (EAN-13)' },
    { value: 'UPC', label: 'Imported (UPC)' },
    { value: 'CODE128', label: 'Logistics (Code 128)' },
    { value: 'CODE39', label: 'Pharma/Warehouse (Code 39)' },
  ];

  const showHint = () => {
    switch (format) {
      case 'EAN13':
        return 'Enter a 13-digit number (e.g., 8901234567890)';
      case 'UPC':
        return 'Enter a 12-digit number (e.g., 012345678905)';
      case 'CODE128':
        return 'Enter any alphanumeric value';
      case 'CODE39':
        return 'Enter capital letters (A-Z), digits (0-9), or -.$/+%*';
      default:
        return '';
    }
  };

  const handleDownload = () => {
    const svg = barcodeRef.current?.querySelector('svg');
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
      link.download = 'barcode.png';
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
      <h2 className="text-2xl font-semibold mb-4 text-center">Barcode Generator</h2>

      <input
        type="text"
        placeholder="Enter barcode value"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={`w-full px-4 py-2 rounded-3xl mb-2 focus:outline-none focus:ring-2
          ${isDarkMode
            ? 'bg-purple-900/80 text-white focus:ring-purple-300'
            : 'bg-purple-100 text-black focus:ring-blue-400'
          }`}
      />

      <p className={`text-sm mb-4 ${isDarkMode ? 'text-purple-200' : 'text-gray-700'}`}>{showHint()}</p>

      <select
        value={format}
        onChange={(e) => setFormat(e.target.value)}
        className={`w-full px-4 py-2 rounded-3xl mb-4 focus:outline-none focus:ring-2
          ${isDarkMode
            ? 'bg-purple-900/80 text-white focus:ring-purple-300'
            : 'bg-purple-100 text-black focus:ring-blue-400'
          }`}
      >
        {barcodeTypes.map((type) => (
          <option key={type.value} value={type.value}>{type.label}</option>
        ))}
      </select>

      {value && (
        <div className={`flex flex-col items-center mt-4 p-4 rounded-lg
          ${isDarkMode ? 'bg-gray-100' : 'bg-gray-100'}`} ref={barcodeRef}
        >
          <Barcode value={value} format={format} />
          <button
            onClick={handleDownload}
            className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-3xl hover:bg-purple-700 transition"
          >
            Download Barcode
          </button>
        </div>
      )}
    </div>
  );
};

export default BarcodeGenerator;
