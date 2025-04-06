import React, { useState, useRef, useEffect } from 'react';

const ImageConverter = () => {
  const [imageFile, setImageFile] = useState(null);
  const [convertedURL, setConvertedURL] = useState(null);
  const [format, setFormat] = useState('png');
  const [imagePreview, setImagePreview] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(true); // default to dark mode
  const fileInputRef = useRef();

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setIsDarkMode(storedTheme === 'dark');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const handleFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setConvertedURL(null);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  const handleImageURL = async (e) => {
    const url = e.target.value;
    if (!url) return;

    try {
      const response = await fetch(url);
      const blob = await response.blob();
      if (!blob.type.startsWith('image/')) throw new Error('Not an image');
      const file = new File([blob], 'downloaded-image', { type: blob.type });
      setImageFile(file);
      setImagePreview(URL.createObjectURL(blob));
      setConvertedURL(null);
    } catch (err) {
      alert('Failed to load image from URL.');
    }
  };

  const handleConvert = () => {
    if (!imageFile) return;

    const img = new Image();
    const reader = new FileReader();

    reader.onload = function (e) {
      img.src = e.target.result;
    };

    img.onload = function () {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      const mimeType = `image/${format === 'jpg' ? 'jpeg' : format}`;
      const dataURL = canvas.toDataURL(mimeType);
      setConvertedURL(dataURL);
    };

    reader.readAsDataURL(imageFile);
  };

  return (
    <div
      className={`min-h-screen p-6 transition-colors duration-300 ${
        isDarkMode
          ? 'bg-gradient-to-b from-black via-purple-400 to-black text-white'
          : 'bg-gradient-to-b from-purple-300 via-white to-purple-300 text-black'
      }`}
    >
      <div className="flex justify-end mb-4">
        <button
          onClick={toggleTheme}
          className={`px-4 py-2 rounded-full font-medium transition ${
            isDarkMode
              ? 'bg-white text-purple-900 hover:bg-gray-200'
              : 'bg-purple-900 text-white hover:bg-purple-700'
          }`}
        >
          Toggle {isDarkMode ? 'Light' : 'Dark'} Mode
        </button>
      </div>

      <div
        className={`max-w-3xl mx-auto mt-6 p-8 backdrop-blur-2xl rounded-3xl shadow-md border-2 ${
          isDarkMode
            ? 'border-purple-300 bg-transparent'
            : 'border-purple-300 bg-white/70'
        }`}
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-purple-400">Image Converter</h2>

        {/* Drag & Drop or Browse */}
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={handleBrowseClick}
          className={`w-full border-2 border-dashed rounded-xl p-6 text-center cursor-pointer mb-6 transition ${
            isDarkMode
              ? 'border-purple-400 bg-purple-50/20 hover:bg-purple-50/40'
              : 'border-purple-300 bg-purple-100 hover:bg-purple-200'
          }`}
        >
          {imagePreview ? (
            <img src={imagePreview} alt="Preview" className="max-h-60 mx-auto rounded" />
          ) : (
            <p className={`${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
              Drag & drop an image here or click to browse
            </p>
          )}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={(e) => handleFile(e.target.files[0])}
          />
        </div>

        {/* URL Input */}
        <input
          type="text"
          placeholder="Or paste image URL (https://...)"
          onBlur={handleImageURL}
          className={`w-full px-4 py-2 rounded-3xl mb-4 focus:outline-none focus:ring-2 ${
            isDarkMode
              ? 'bg-purple-900/70 text-white focus:ring-purple-300'
              : 'bg-purple-100 text-black focus:ring-purple-500'
          }`}
        />

        {/* Format Dropdown */}
        <div className="flex items-center gap-4 mb-6">
          <label
            className={`font-medium text-sm ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            Convert to:
          </label>
          <select
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            className={`flex-1 px-4 py-2 rounded-3xl focus:outline-none focus:ring-2 ${
              isDarkMode
                ? 'bg-purple-900/70 text-white focus:ring-purple-300'
                : 'bg-purple-100 text-black focus:ring-purple-500'
            }`}
          >
            <option value="png">PNG</option>
            <option value="jpg">JPG</option>
            <option value="jpeg">JPEG</option>
            <option value="webp">WebP</option>
          </select>
        </div>

        {/* Convert Button */}
        <button
          onClick={handleConvert}
          className={`w-full py-2 rounded-3xl font-semibold text-lg transition-all disabled:opacity-50 ${
            isDarkMode
              ? 'bg-purple-700 text-white hover:bg-purple-600 border border-purple-300'
              : 'bg-purple-900 text-white hover:bg-purple-700 border border-purple-300'
          }`}
          disabled={!imageFile}
        >
          Convert Image
        </button>

        {/* Output */}
        {convertedURL && (
          <div className="mt-8 text-center">
            <img
              src={convertedURL}
              alt="Converted"
              className="mb-4 rounded shadow max-h-60 mx-auto"
            />
            <a
              href={convertedURL}
              download={`converted.${format}`}
              className="inline-block bg-green-600 text-white px-4 py-2 rounded-3xl hover:bg-green-700 transition font-medium"
            >
              Download {format.toUpperCase()}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageConverter;
