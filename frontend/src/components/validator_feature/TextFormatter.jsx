// src/components/TextFormatter.jsx
import React, { useState } from 'react';
import jsonlint from 'jsonlint-mod'; // For JSON validation
import { XMLParser, XMLValidator } from 'fast-xml-parser'; // For XML validation and parsing
import yaml from 'js-yaml'; // For YAML parsing
import { marked } from 'marked'; // For Markdown rendering

const TextFormatter = () => {
  const [type, setType] = useState('json');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  // Validation function
  const handleValidate = () => {
    try {
      switch (type) {
        case 'json':
          jsonlint.parse(input);
          setOutput('✅ Valid JSON');
          break;
        case 'xml':
          const xmlParser = new XMLParser({ ignoreAttributes: false });
          const xmlObj = xmlParser.parse(input);
          const isValidXML = XMLValidator.validate(input);
          if (isValidXML === true) {
            setOutput('✅ Valid XML');
          } else {
            throw new Error('Invalid XML');
          }
          break;
        case 'yaml':
          yaml.load(input);
          setOutput('✅ Valid YAML');
          break;
        case 'markdown':
          setOutput('✅ Markdown syntax is valid'); // Markdown doesn't error, it's syntactically flexible
          break;
        default:
          throw new Error('Unknown type selected');
      }
      setError('');
    } catch (err) {
      setOutput('');
      setError(`❌ Error: ${err.message}`);
    }
  };

  // Formatting function
  const handleFormat = () => {
    try {
      let result = '';
      switch (type) {
        case 'json':
          const parsed = jsonlint.parse(input); // Parse JSON for validation
          result = JSON.stringify(parsed, null, 2); // Format JSON nicely
          break;
        case 'xml':
          const xmlParserFormat = new XMLParser({ ignoreAttributes: false });
          const formattedXML = xmlParserFormat.parse(input);
          result = new XMLParser({ ignoreAttributes: false }).js2xml(formattedXML, {
            spaces: 2,
          }); // Format XML with indentation
          break;
        case 'yaml':
          const parsedYaml = yaml.load(input);
          result = yaml.dump(parsedYaml); // Dump YAML with proper indentation
          break;
        case 'markdown':
          result = marked(input); // Convert Markdown to HTML
          break;
        default:
          throw new Error('Unknown type selected');
      }
      setError('');
      setOutput(result);
    } catch (err) {
      setOutput('');
      setError(`❌ Error: ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-indigo-700 mb-4">Text Formatter and Validator</h2>

        <div className="mb-4 flex flex-col md:flex-row gap-4">
          <select
            value={type}
            onChange={(e) => {
              setType(e.target.value);
              setInput('');
              setOutput('');
              setError('');
            }}
            className="w-full md:w-1/3 border border-gray-300 rounded p-2 focus:ring-2 focus:ring-indigo-500"
          >
            <option value="json">JSON</option>
            <option value="xml">XML</option>
            <option value="yaml">YAML</option>
            <option value="markdown">Markdown</option>
          </select>
          <div className="flex gap-2">
            <button
              onClick={handleValidate}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              Validate
            </button>
            <button
              onClick={handleFormat}
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
            >
              Format
            </button>
          </div>
        </div>

        <textarea
          rows="10"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Paste your ${type.toUpperCase()} here...`}
          className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-indigo-400"
        ></textarea>

        {error && <p className="text-red-500 mt-3">{error}</p>}

        {output && type !== 'markdown' && (
          <pre className="bg-gray-100 mt-4 p-4 border rounded text-sm whitespace-pre-wrap">{output}</pre>
        )}

        {output && type === 'markdown' && (
          <div
            className="prose max-w-none mt-4 border rounded p-4 bg-gray-50"
            dangerouslySetInnerHTML={{ __html: output }}
          />
        )}
      </div>
    </div>
  );
};

export default TextFormatter;
