// pages/PasswordGenerator.jsx
import { useState, useEffect } from "react";
import PasswordForm from "../../components/password_generator/PasswordForm";

const PasswordGenerator = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load saved mode from localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode) {
      setIsDarkMode(savedMode === "true");
    }
  }, []);

  // Save mode on change
  useEffect(() => {
    localStorage.setItem("darkMode", isDarkMode.toString());
  }, [isDarkMode]);

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center transition-colors duration-500 ${
        isDarkMode
          ? "bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white"
          : "bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 text-black"
      }`}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className="absolute top-50 right-6 px-4 py-2 rounded-full font-semibold shadow-md transition
          bg-white text-black hover:bg-gray-200
          dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
      >
        {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>

      <PasswordForm isDarkMode={isDarkMode} />
    </div>
  );
};

export default PasswordGenerator;
