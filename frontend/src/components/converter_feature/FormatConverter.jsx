import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import Papa from 'papaparse';
import yaml from 'js-yaml';
import { xml2js, js2xml } from 'xml-js';
import { faker } from '@faker-js/faker';

export default function FormatConverter({ isDarkMode }) {
  const [parsedData, setParsedData] = useState(null);
  const [textAreaValue, setTextAreaValue] = useState('');
  const [selectedFormat, setSelectedFormat] = useState('json');
  const [fileName, setFileName] = useState('converted');
  const [convertedPreview, setConvertedPreview] = useState('');
  const [uploadedFormat, setUploadedFormat] = useState('');
  const [sampleGenerated, setSampleGenerated] = useState(false);
  const [samplePreview, setSamplePreview] = useState('');

  const flattenData = (data) => {
    if (data.students && Array.isArray(data.students)) data = data.students;
    const flatten = (obj) => {
      const result = {};
      for (const key in obj) {
        if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
          const nested = flatten(obj[key]);
          Object.assign(result, nested);
        } else {
          result[key] = obj[key];
        }
      }
      return result;
    };
    return Array.isArray(data) ? data.map(flatten) : [flatten(data)];
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const extension = file.name.split('.').pop().toLowerCase();
    setUploadedFormat(extension);
    setFileName(file.name.split('.')[0]);

    const reader = new FileReader();

    reader.onload = (event) => {
      const content = event.target.result;

      try {
        let data;
        switch (extension) {
          case 'json':
            data = JSON.parse(content);
            setTextAreaValue(JSON.stringify(data, null, 2));
            break;
          case 'csv':
            data = Papa.parse(content, { header: true }).data;
            setTextAreaValue(JSON.stringify(data, null, 2));
            break;
          case 'yaml':
          case 'yml':
            data = yaml.load(content);
            setTextAreaValue(yaml.dump(data));
            break;
          case 'xml':
            data = xml2js(content, { compact: true });
            setTextAreaValue(js2xml(data, { compact: true, spaces: 2 }));
            break;
          case 'xlsx':
            const workbook = XLSX.read(content, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            data = XLSX.utils.sheet_to_json(worksheet);
            setTextAreaValue(JSON.stringify(data, null, 2));
            break;
          default:
            alert('Unsupported file type');
            return;
        }
        setParsedData(data);
        setConvertedPreview('');
        setSampleGenerated(false);
        setSamplePreview('');
      } catch (error) {
        alert('Failed to parse file');
        console.error(error);
      }
    };

    extension === 'xlsx' ? reader.readAsBinaryString(file) : reader.readAsText(file);
  };

  const convertAndDownload = () => {
    if (!textAreaValue) return alert('No data to convert');

    try {
      let finalData;
      let convertedStr = '';

      switch (selectedFormat) {
        case 'json':
          finalData = JSON.parse(textAreaValue);
          convertedStr = JSON.stringify(finalData, null, 2);
          saveAs(new Blob([convertedStr], { type: 'application/json' }), `${fileName}.json`);
          break;
        case 'csv':
          finalData = JSON.parse(textAreaValue);
          convertedStr = Papa.unparse(flattenData(finalData));
          saveAs(new Blob([convertedStr], { type: 'text/csv' }), `${fileName}.csv`);
          break;
        case 'yaml':
          finalData = JSON.parse(textAreaValue);
          convertedStr = yaml.dump(finalData);
          saveAs(new Blob([convertedStr], { type: 'text/yaml' }), `${fileName}.yaml`);
          break;
        case 'xml':
          finalData = JSON.parse(textAreaValue);
          convertedStr = js2xml(finalData, { compact: true, spaces: 2 });
          saveAs(new Blob([convertedStr], { type: 'application/xml' }), `${fileName}.xml`);
          break;
        default:
          alert('Invalid format selected');
      }

      setConvertedPreview(convertedStr.slice(0, 2000));
    } catch (error) {
      alert('Conversion failed. Please make sure your edited data is valid.');
      console.error(error);
    }
  };

  const generateLargeSampleData = (count = 100) => {
    const users = Array.from({ length: count }, () => ({
      name: faker.person.fullName(),
      age: faker.number.int({ min: 18, max: 65 }),
      email: faker.internet.email(),
      address: {
        city: faker.location.city(),
        country: faker.location.country(),
      },
    }));
    return users;
  };

  const generateSampleData = (format) => {
    const sampleJson = generateLargeSampleData(100);

    let generated = '';
    switch (format) {
      case 'json':
        generated = JSON.stringify(sampleJson, null, 2);
        break;
      case 'csv':
        generated = Papa.unparse(sampleJson);
        break;
      case 'yaml':
        generated = yaml.dump(sampleJson);
        break;
      case 'xml':
        generated = js2xml({ users: { user: sampleJson } }, { compact: true, spaces: 2 });
        break;
      default:
        generated = '';
    }

    setTextAreaValue(generated);
    setParsedData(sampleJson);
    setFileName(`sample_${format}`);
    setUploadedFormat(format);
    setConvertedPreview('');
    setSampleGenerated(true);
    setSamplePreview(generated);
  };

  return (
    <div className={`max-w-5xl mx-auto mt-10 p-6 border-2 rounded-3xl shadow-md backdrop-blur-xl transition-colors duration-300
      ${isDarkMode ? 'bg-purple-900/20 border-white text-white' : 'bg-purple-100 border-purple-300 text-black'}`}>

      <h2 className={`text-3xl font-bold text-center mb-6 ${isDarkMode ? 'text-purple-300' : 'text-purple-800'}`}>
        Fast Format Converter
      </h2>

      {/* Drag and Drop Upload */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const file = e.dataTransfer.files[0];
          if (file) handleFileUpload({ target: { files: [file] } });
        }}
        onClick={() => document.getElementById('hidden-file-input').click()}
        className={`mb-4 cursor-pointer border-dashed border-2 rounded-3xl p-6 text-center transition-colors
          ${isDarkMode
            ? 'bg-purple-800/40 border-purple-400 text-white hover:bg-purple-900/60'
            : 'bg-purple-100 border-purple-400 text-purple-800 hover:bg-purple-200'}`}
      >
        <p className="font-semibold">Drag & Drop a file here or click to browse</p>
        <p className="text-sm mt-1 opacity-50">Accepted: .json, .csv, .xlsx, .yaml, .yml, .xml</p>
        <input
          type="file"
          accept=".json,.csv,.xlsx,.yaml,.yml,.xml"
          id="hidden-file-input"
          className="hidden"
          onChange={handleFileUpload}
        />
      </div>

      {fileName && uploadedFormat && (
        <div className={`mb-4 p-3 rounded-xl font-semibold 
          ${isDarkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800'}`}>
          Uploaded File: <span className="font-mono">{fileName}.{uploadedFormat}</span>
        </div>
      )}

      <label className={`block mb-2 font-semibold ${isDarkMode ? 'text-purple-300' : 'text-purple-700'}`}>Edit Your Data:</label>
      <textarea
        className={`w-full h-64 p-3 font-mono rounded-3xl overflow-auto border-2 
          ${isDarkMode ? 'bg-black/20 text-white border-purple-400 backdrop-blur-3xl' : 'bg-purple-200 text-black border-purple-300'}`}
        value={textAreaValue}
        onChange={(e) => setTextAreaValue(e.target.value)}
      ></textarea>

      <label className={`block mt-6 mb-2 font-semibold ${isDarkMode ? 'text-purple-300' : 'text-purple-700'}`}>Convert To:</label>
      <select
        className={`w-full p-3 mb-6 rounded-3xl 
          ${isDarkMode ? 'bg-purple-200 text-black' : 'bg-white text-black border border-purple-300'}`}
        value={selectedFormat}
        onChange={(e) => setSelectedFormat(e.target.value)}
      >
        <option value="json">JSON</option>
        <option value="csv">CSV</option>
        <option value="yaml">YAML</option>
        <option value="xml">XML</option>
      </select>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <button
          onClick={convertAndDownload}
          className={`w-full py-3 rounded-3xl font-semibold transition-all
            ${isDarkMode ? 'bg-purple-700 hover:bg-purple-600 text-white' : 'bg-purple-400 hover:bg-purple-300 text-black border border-purple-500'}`}
        >
          Convert & Download
        </button>

        <button
          onClick={() => generateSampleData(selectedFormat)}
          className={`w-full py-3 rounded-3xl font-semibold transition-all
            ${isDarkMode ? 'bg-purple-800 hover:bg-purple-600 text-white' : 'bg-purple-500 hover:bg-purple-400 text-black border border-purple-600'}`}
        >
          Generate Sample
        </button>
      </div>

      {convertedPreview && (
        <div className="mt-6">
          <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-purple-300' : 'text-purple-700'}`}>Converted Preview:</h3>
          <pre className={`max-h-[400px] overflow-auto p-4 font-mono rounded-xl border 
            ${isDarkMode ? 'bg-black/20 text-white border-purple-400' : 'bg-purple-200 text-black border-purple-300'}`}>
            {convertedPreview}
          </pre>
        </div>
      )}
    </div>
  );
}
