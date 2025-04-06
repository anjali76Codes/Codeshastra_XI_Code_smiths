import React, { useState } from "react";

const CodeFormatter = ({ isDarkMode }) => {
  const [language, setLanguage] = useState("html");
  const [inputCode, setInputCode] = useState("");
  const [formattedCode, setFormattedCode] = useState("");

  const getParser = (lang) => {
    if (lang === "html") return "html";
    if (lang === "css") return "css";
    if (lang === "javascript") return "babel";
    return "babel";
  };

  const handleFormat = () => {
    try {
      const prettier = window.prettier;
      const plugins = window.prettierPlugins;

      if (!prettier || !plugins) {
        alert("Prettier is still loading. Please try again in a second.");
        return;
      }

      const formatted = prettier.format(inputCode, {
        parser: getParser(language),
        plugins: plugins,
        semi: true,
        singleQuote: true,
        tabWidth: 2,
      });

      setFormattedCode(formatted);
    } catch (err) {
      alert("Formatting Error: " + err.message);
    }
  };

  return (
    <div className={`max-w-5xl mx-auto mt-10 p-6 border-2 rounded-3xl shadow-md backdrop-blur-xl transition-colors duration-300 
      ${isDarkMode 
        ? 'bg-purple-900/20 border-white text-white' 
        : 'bg-purple-100 border-purple-300 text-black'}`}>
      
      <h2 className={`text-3xl font-bold text-center mb-6 
        ${isDarkMode ? 'text-purple-300' : 'text-purple-800'}`}>
        Code Formatter
      </h2>

      <label className={`block mb-2 font-semibold ${isDarkMode ? 'text-purple-300' : 'text-purple-700'}`}>
        Choose Language:
      </label>
      <select
        className={`w-full p-3 mb-6 rounded-3xl 
          ${isDarkMode ? 'bg-purple-200 text-black' : 'bg-white text-black border border-purple-300'}`}
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      >
        <option value="html">HTML</option>
        <option value="css">CSS</option>
        <option value="javascript">JavaScript</option>
      </select>

      <section className="space-x-2 grid grid-cols-2">
        <section>
          <label className={`block mb-2 font-semibold ${isDarkMode ? 'text-purple-300' : 'text-purple-700'}`}>
            Input Code:
          </label>
          <textarea
            rows="10"
            className={`w-full mb-6 p-3 font-mono rounded-3xl overflow-hidden border-2 
              ${isDarkMode 
                ? 'bg-black/20 text-white border-purple-400 backdrop-blur-3xl' 
                : 'bg-purple-800/20 text-black border-purple-300'}`}
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
            placeholder="Paste your code here..."
          ></textarea>
        </section>

        <section>
          <label className={`block mb-2 font-semibold ${isDarkMode ? 'text-purple-300' : 'text-purple-700'}`}>
            Formatted Output:
          </label>
          <textarea
            rows="10"
            className={`w-full mb-6 p-3 font-mono rounded-3xl shadow-md overflow-hidden border-2 
              ${isDarkMode 
                ? 'bg-black/20 text-white border-purple-800 backdrop-blur-3xl' 
                : 'bg-purple-800/20 text-black border-purple-400'}`}
            value={formattedCode}
            readOnly
          ></textarea>
        </section>
      </section>

      <button
        className={`w-full py-3 rounded-3xl font-semibold transition-all
          ${isDarkMode 
            ? 'bg-purple-700 hover:bg-purple-600 text-white border border-purple-400' 
            : 'bg-purple-400 hover:bg-purple-300 text-black border border-purple-500'}`}
        onClick={handleFormat}
      >
        Format Code
      </button>
    </div>
  );
};

export default CodeFormatter;
