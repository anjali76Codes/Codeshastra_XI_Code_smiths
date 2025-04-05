import React, { useState, useEffect } from 'react';
import xmlFormatter from 'xml-formatter';
import yaml from 'js-yaml';

export default function FormatterApp() {
  const [inputText, setInputText] = useState('');
  const [formattedOutput, setFormattedOutput] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [validationMessage, setValidationMessage] = useState('');
  const [formatType, setFormatType] = useState('json');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') setDarkMode(true);
  }, []);

  const isInvalidYamlValue = (value) => value === null || value === undefined;

  const handleInputChange = (e) => {
    setInputText(e.target.value);
    setValidationMessage('');
  };

  const handleFormat = () => {
    try {
      let output = '';
      switch (formatType) {
        case 'json':
          output = JSON.stringify(JSON.parse(inputText), null, 2);
          break;
        case 'xml':
          const parsedXml = new DOMParser().parseFromString(inputText, 'application/xml');
          const parseError = parsedXml.getElementsByTagName('parsererror');
          if (parseError.length > 0) throw new Error('Invalid XML');
          output = xmlFormatter(inputText, { indentation: '  ', collapseContent: true });
          break;
        case 'yaml': {
          const withNewlines = inputText
            .replace(/(\s*)(\S+?:\S+)(?=\s|$)/g, '\n$2')
            .trim();
          const parsedYaml = yaml.load(withNewlines);
          if (isInvalidYamlValue(parsedYaml)) throw new Error("Invalid YAML content.");
          output = yaml.dump(parsedYaml, { indent: 2 });
          break;
        }
        case 'markdown':
          output = inputText;
          break;
        default:
          output = inputText;
      }
      setFormattedOutput(output);
      setIsValid(true);
      setValidationMessage('✅ Valid ' + formatType.toUpperCase());
    } catch (err) {
      setFormattedOutput('Invalid input');
      setIsValid(false);
      setValidationMessage(`❌ Invalid ${formatType.toUpperCase()} format`);
    }
  };

  const handleValidate = () => {
    try {
      switch (formatType) {
        case 'json':
          JSON.parse(inputText);
          break;
        case 'xml':
          const parsed = new DOMParser().parseFromString(inputText, 'application/xml');
          const parseError = parsed.getElementsByTagName('parsererror');
          if (parseError.length > 0) throw new Error('Invalid XML');
          break;
        case 'yaml': {
          const withNewlines = inputText
            .replace(/(\s*)(\S+?:\S+)(?=\s|$)/g, '\n$2')
            .trim();
          const parsedYaml = yaml.load(withNewlines);
          if (isInvalidYamlValue(parsedYaml)) throw new Error("Invalid YAML content.");
          break;
        }
        case 'markdown':
          break;
        default:
          throw new Error('Unsupported format');
      }

      setIsValid(true);
      setValidationMessage('✅ Valid ' + formatType.toUpperCase());
    } catch (err) {
      setIsValid(false);
      setValidationMessage(`❌ Invalid ${formatType.toUpperCase()} format`);
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 border-2 rounded-2xl shadow-md backdrop-blur-md transition-colors duration-300 bg-purple-900/20 border-white text-white">
      <h2 className="text-3xl font-bold text-center text-purple-300 mb-6">Universal Formatter & Validator</h2>

      <label className="block mb-2 font-semibold text-purple-300">Select Format:</label>
      <select
        value={formatType}
        onChange={(e) => setFormatType(e.target.value)}
        className="w-full p-3 mb-6 bg-purple-200 text-black rounded-lg"
      >
        <option value="json">JSON</option>
        <option value="xml">XML</option>
        <option value="yaml">YAML</option>
        <option value="markdown">Markdown</option>
      </select>

      <label className="block mb-2 font-semibold text-purple-300">Input:</label>
      <textarea
        rows="10"
        className="w-full mb-6 p-3 bg-purple-500 text-white font-mono rounded-lg"
        value={inputText}
        onChange={handleInputChange}
      ></textarea>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <button
          onClick={handleFormat}
          className="w-full bg-purple-700 hover:bg-purple-600 py-3 rounded-xl font-semibold"
        >
          Format
        </button>
        <button
          onClick={handleValidate}
          className="w-full bg-green-700 hover:bg-green-600 py-3 rounded-xl font-semibold"
        >
          Validate
        </button>
      </div>

      {validationMessage && (
        <p className={`mb-4 font-semibold ${isValid ? 'text-green-400' : 'text-red-400'}`}>
          {validationMessage}
        </p>
      )}

      <label className="block mb-2 font-semibold text-purple-300">Output:</label>
      <textarea
        rows="12"
        className={`w-full p-3 dark:bg-purple-600 text-white font-mono rounded-lg border ${
          isValid ? 'border-purple-700' : 'border-red-500'
        }`}
        value={formattedOutput}
        readOnly
      ></textarea>
    </div>
  );
}
