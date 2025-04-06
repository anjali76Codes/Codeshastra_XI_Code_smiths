import React, { useState } from 'react';

const EmbeddedWebsite = () => {
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        const fileData = reader.result;
        localStorage.setItem('uploadedFile', fileData);
        setUploadedFile(file.name);
      };

      reader.readAsDataURL(file); // or readAsText for text files
    }
  };

  return (
    <div className="relative bg-purple-50/10 backdrop-blur-3xl w-full max-w-2/3 mx-auto aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl border border-gray-300">
      {/* Overlay Label */}
      <div className="absolute top-3 left-3 z-10 bg-black bg-opacity-60 text-white text-sm px-3 py-1 rounded-full">
        Linux Terminal (Alpine)
      </div>

      {/* File Upload */}
      <div className="absolute top-3 right-3 z-10 bg-white bg-opacity-70 text-black text-sm px-3 py-1 rounded-full">
        <label className="cursor-pointer">
          Upload Key
          <input
            type="file"
            accept=".pem,.txt"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
      </div>

      {/* Show filename if uploaded */}
      {uploadedFile && (
        <div className="absolute top-12 right-3 z-10 bg-black bg-opacity-60 text-white text-xs px-3 py-1 rounded-full">
          {uploadedFile}
        </div>
      )}

      {/* Iframe */}
      <iframe
        src="https://bellard.org/jslinux/vm.html?url=alpine-x86.cfg&mem=192"
        title="Linux Terminal"
        className="h-full mx-auto mt-15 flex w-3/4 overflow-hidden scrollbar-hide"
        frameBorder="0"
        allow="fullscreen"
        loading="lazy"
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  );
};

export default EmbeddedWebsite;
