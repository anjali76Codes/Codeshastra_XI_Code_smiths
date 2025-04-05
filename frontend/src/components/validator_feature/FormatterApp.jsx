import React, { useState } from 'react';
import xmlFormatter from 'xml-formatter';
import yaml from 'js-yaml';

function FormatterApp() {
  const [inputText, setInputText] = useState('');
  const [formattedOutput, setFormattedOutput] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [validationMessage, setValidationMessage] = useState('');
  const [formatType, setFormatType] = useState('json');

  const handleInputChange = (e) => {
    setInputText(e.target.value);
    setValidationMessage('');
  };

  const isLikelyJsonStructure = (text) => {
    try {
      JSON.parse(text);
      return true;
    } catch {
      return false;
    }
  };

  const isInvalidYamlValue = (value) => value === null || value === undefined;

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
          // Normalize YAML: convert single-line key:value pairs to multi-line YAML
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
          // Basic check – assume valid
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
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4">Universal Formatter & Validator</h1>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Select Format:</label>
          <select
            value={formatType}
            onChange={(e) => setFormatType(e.target.value)}
            className="block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="json">JSON</option>
            <option value="xml">XML</option>
            <option value="yaml">YAML</option>
            <option value="markdown">Markdown</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Input:</label>
          <textarea
            rows="8"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={inputText}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <div className="flex gap-4 mb-4">
          <button
            onClick={handleFormat}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
          >
            Format
          </button>
          <button
            onClick={handleValidate}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Validate
          </button>
        </div>

        {validationMessage && (
          <p className={`text-sm ${isValid ? 'text-green-600' : 'text-red-500'}`}>
            {validationMessage}
          </p>
        )}

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Output:</label>
          <textarea
            rows="12"
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
              !isValid ? 'border-red-500' : ''
            }`}
            value={formattedOutput}
            readOnly
          ></textarea>
        </div>
      </div>
    </div>
  );
}

export default FormatterApp;
