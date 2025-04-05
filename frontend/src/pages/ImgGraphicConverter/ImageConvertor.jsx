import React, { useState, useRef } from 'react';

const ImageConverter = () => {
  const [imageFile, setImageFile] = useState(null);
  const [convertedURL, setConvertedURL] = useState(null);
  const [format, setFormat] = useState('png');
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef();

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
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">🖼️ Image Converter</h2>

      {/* Drag & Drop Box */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="w-full border-2 border-dashed border-blue-400 rounded-xl p-6 text-center cursor-pointer mb-4 hover:bg-blue-50 transition"
        onClick={handleBrowseClick}
      >
        {imagePreview ? (
          <img src={imagePreview} alt="Preview" className="max-h-60 mx-auto rounded" />
        ) : (
          <p className="text-gray-500">📂 Drag & drop an image here or click to browse</p>
        )}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={(e) => handleFile(e.target.files[0])}
        />
      </div>

      {/* Upload via URL */}
      <input
        type="text"
        placeholder="Or paste image URL - Image Address (https://...)"
        onBlur={handleImageURL}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {/* Format selection */}
      <select
        value={format}
        onChange={(e) => setFormat(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4"
      >
        <option value="png">PNG</option>
        <option value="jpg">JPG</option>
        <option value="jpeg">JPEG</option>
        <option value="webp">WebP</option>
      </select>

      <button
        onClick={handleConvert}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        disabled={!imageFile}
      >
        Convert Image
      </button>

      {convertedURL && (
        <div className="mt-6 text-center">
          <img src={convertedURL} alt="Converted" className="mb-4 rounded shadow max-h-60 mx-auto" />
          <a
            href={convertedURL}
            download={`converted.${format}`}
            className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Download {format.toUpperCase()}
          </a>
        </div>
      )}
    </div>
  );
};

export default ImageConverter;
