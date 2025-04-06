import React, { useState } from 'react';
import xmlFormatter from 'xml-formatter';
import yaml from 'js-yaml';

export default function FormatterApp({ isDarkMode }) {
  const [inputText, setInputText] = useState('');
  const [formattedOutput, setFormattedOutput] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [validationMessage, setValidationMessage] = useState('');
  const [formatType, setFormatType] = useState('json');

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
    <div className={`max-w-5xl mx-auto mt-10 p-6 border-2 rounded-3xl shadow-md backdrop-blur-xl transition-colors duration-300 
      ${isDarkMode 
        ? 'bg-purple-900/20 border-white text-white' 
        : 'bg-purple-100 border-purple-300 text-black'}`}>
      
      <h2 className={`text-3xl font-bold text-center mb-6 
        ${isDarkMode ? 'text-purple-300' : 'text-purple-800'}`}>
        Universal Formatter & Validator
      </h2>

      <label className={`block mb-2 font-semibold ${isDarkMode ? 'text-purple-300' : 'text-purple-700'}`}>Select Format:</label>
      <select
        value={formatType}
        onChange={(e) => setFormatType(e.target.value)}
        className={`w-full p-3 mb-6 rounded-3xl 
          ${isDarkMode ? 'bg-purple-200 text-black' : 'bg-white text-black border border-purple-300'}`}
      >
        <option value="json">JSON</option>
        <option value="xml">XML</option>
        <option value="yaml">YAML</option>
        <option value="markdown">Markdown</option>
      </select>

      <section className="space-x-2 grid grid-cols-2">
        <section>
          <label className={`block mb-2 font-semibold ${isDarkMode ? 'text-purple-300' : 'text-purple-700'}`}>Input:</label>
          <textarea
            rows="10"
            className={`w-full mb-6 p-3 font-mono rounded-3xl overflow-hidden border-2
              ${isDarkMode
                ? 'bg-black/20 text-white border-purple-400 backdrop-blur-3xl'
                : 'bg-purple-800/20 text-black border-purple-300'}`}
            value={inputText}
            onChange={handleInputChange}
          ></textarea>
        </section>

        <section>
          <label className={`block mb-2 font-semibold ${isDarkMode ? 'text-purple-300' : 'text-purple-700'}`}>Output:</label>
          <textarea
            rows="10"
            className={`w-full mb-6 p-3 font-mono rounded-3xl shadow-md overflow-hidden border-2
              ${isValid ? (isDarkMode ? 'border-purple-400' : 'border-green-500') : 'border-red-800'}
              ${isDarkMode ? 'bg-black/20 text-white backdrop-blur-3xl' : 'bg-purple-800/20 text-black'}`}
            value={formattedOutput}
            readOnly
          ></textarea>
        </section>
      </section>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <button
          onClick={handleFormat}
          className={`w-full py-3 rounded-3xl font-semibold transition-all
            ${isDarkMode ? 'bg-purple-700 hover:bg-purple-600 text-white' : 'bg-purple-400 hover:bg-purple-300 text-black border border-purple-500'}`}
        >
          Format
        </button>
        <button
          onClick={handleValidate}
          className={`w-full py-3 rounded-3xl font-semibold transition-all
            ${isDarkMode ? 'bg-purple-800 hover:bg-purple-600 text-white' : 'bg-purple-500 hover:bg-purple-400 text-black border border-purple-600'}`}
        >
          Validate
        </button>
      </div>

      {validationMessage && (
        <p className={`mb-4 font-semibold ${isValid ? 'text-green-700' : 'text-red-800'}`}>
          {validationMessage}
        </p>
      )}
    </div>
  );
}
