import React from 'react';
import { useTheme } from '../Theme/themecontext'; // Adjust path as needed

const QueryMaker = () => {
  const { isDarkMode } = useTheme();

  const handleRedirect = () => {
    window.location.href = 'http://localhost:5000/';
  };

  return (
    <div
      className={`min-h-screen p-6 flex items-center justify-center transition-colors duration-300 ${
        isDarkMode
          ? 'bg-gradient-to-b from-black via-purple-400 to-black text-white'
          : 'bg-gradient-to-b from-purple-200 via-white to-purple-300 text-black'
      }`}
    >
      <div
        className={`p-10 rounded-3xl shadow-xl backdrop-blur-2xl border-2 ${
          isDarkMode
            ? 'bg-purple-950/20 border-purple-400'
            : 'bg-white/70 border-purple-300'
        }`}
      >
        <h1 className="text-2xl font-bold text-center mb-6 text-purple-950">
          SQL Query Simulator
        </h1>
        <button
          onClick={handleRedirect}
          className={`w-full py-3 px-6 rounded-3xl font-semibold transition ${
            isDarkMode
              ? 'bg-purple-700 text-white hover:bg-purple-600'
              : 'bg-purple-500 text-white hover:bg-purple-600'
          }`}
        >
          Go to SQL Simulator
        </button>
      </div>
    </div>
  );
};

export default QueryMaker;
