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
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4 text-center">🛠 Code Formatter</h2>

      <div className="mb-4">
        <label className="block font-medium mb-1">Choose Language:</label>
        <select
          className="w-full border rounded p-2"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="html">HTML</option>
          <option value="css">CSS</option>
          <option value="javascript">JavaScript</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Input Code:</label>
        <textarea
          className="w-full h-40 border rounded p-2 font-mono"
          value={inputCode}
          onChange={(e) => setInputCode(e.target.value)}
          placeholder="Paste your code here..."
        ></textarea>
      </div>

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        onClick={handleFormat}
      >
        Format Code
      </button>

      {formattedCode && (
        <div className="mt-6">
          <label className="block font-medium mb-1">Formatted Code:</label>
          <textarea
            className="w-full h-40 border rounded p-2 font-mono bg-gray-100"
            value={formattedCode}
            readOnly
          ></textarea>
        </div>
      )}
    </div>
  );
};

export default CodeFormatter;
