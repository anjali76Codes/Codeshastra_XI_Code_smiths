import React, { useState } from "react";

const CodeFormatter = () => {
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
    <div className="max-w-5xl mx-auto mt-10 p-6 border-2 rounded-2xl shadow-lg backdrop-blur-md transition-all duration-300 bg-white/80 dark:bg-slate-900/20 border-gray-300 dark:border-white text-gray-800 dark:text-white">
      <h2 className="text-3xl font-bold text-center text-purple-500  mb-8">🛠 Code Formatter</h2>

      <div className="mb-6">
        <label className="block mb-2 font-semibold text-gray-700 dark:text-blue-200">Choose Language:</label>
        <select
          className="w-full p-3 rounded-lg bg-gray-100 dark:bg-purple-600 text-white font-semibold"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="html">HTML</option>
          <option value="css">CSS</option>
          <option value="javascript">JavaScript</option>
        </select>
      </div>

      <div className="mb-6">
        <label className="block mb-2 font-semibold text-gray-700 dark:text-blue-200">Input Code:</label>
        <textarea
          className="w-full h-48 p-3 bg-white dark:bg-purple-700 text-black dark:text-white font-mono rounded-lg border border-blue-300 dark:border-blue-700 focus:ring-2 focus:ring-blue-400"
          value={inputCode}
          onChange={(e) => setInputCode(e.target.value)}
          placeholder="Paste your code here..."
        ></textarea>
      </div>

      <button
        className="w-full sm:w-auto bg-blue-700 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-xl transition-colors"
        onClick={handleFormat}
      >
        Format Code
      </button>

      {formattedCode && (
        <div className="mt-8">
          <label className="block mb-2 mt-4 font-semibold text-gray-700 dark:text-blue-200">Formatted Code:</label>
          <textarea
            className="w-full h-48 p-3 bg-gray-100 dark:bg-slate-800 text-black dark:text-white font-mono rounded-lg border border-green-500"
            value={formattedCode}
            readOnly
          ></textarea>
        </div>
      )}
    </div>
  );
};

export default CodeFormatter;
