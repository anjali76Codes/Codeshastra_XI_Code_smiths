import React, { useState } from 'react';

function JsonFormatter() {
  const [inputText, setInputText] = useState('');
  const [formattedJson, setFormattedJson] = useState('');
  const [isValidJson, setIsValidJson] = useState(true);
  const [validationMessage, setValidationMessage] = useState('');

  const handleInputChange = (event) => {
    setInputText(event.target.value);
    setValidationMessage('');
  };

  const handleFormat = () => {
    try {
      const parsedJson = JSON.parse(inputText);
      const prettyJson = JSON.stringify(parsedJson, null, 2);
      setFormattedJson(prettyJson);
      setIsValidJson(true);
      setValidationMessage('Valid JSON');
    } catch (error) {
      setFormattedJson('Invalid JSON');
      setIsValidJson(false);
      setValidationMessage('Invalid JSON format.');
    }
  };

  const handleValidate = () => {
    try {
      JSON.parse(inputText);
      setIsValidJson(true);
      setValidationMessage('✅ Valid JSON');
    } catch (error) {
      setIsValidJson(false);
      setValidationMessage('❌ Invalid JSON format.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-semibold mb-4">JSON Formatter & Validator</h1>

        <div className="mb-4">
          <label htmlFor="inputJson" className="block text-sm font-medium text-gray-700">
            Enter JSON:
          </label>
          <textarea
            id="inputJson"
            rows="6"
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
            Format JSON
          </button>
          <button
            onClick={handleValidate}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Validate JSON
          </button>
        </div>

        {validationMessage && (
          <p className={`text-sm ${isValidJson ? 'text-green-600' : 'text-red-500'}`}>
            {validationMessage}
          </p>
        )}

        <div className="mt-4">
          <label htmlFor="formattedJson" className="block text-sm font-medium text-gray-700">
            Formatted JSON:
          </label>
          <textarea
            id="formattedJson"
            rows="10"
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
              !isValidJson ? 'border-red-500' : ''
            }`}
            value={formattedJson}
            readOnly
          ></textarea>
        </div>
      </div>
    </div>
  );
}

export default JsonFormatter;
