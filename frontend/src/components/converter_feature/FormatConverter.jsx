import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import Papa from 'papaparse';
import yaml from 'js-yaml';
import { xml2js, js2xml } from 'xml-js';

export default function FormatConverter() {
  const [parsedData, setParsedData] = useState(null);
  const [selectedFormat, setSelectedFormat] = useState('json');
  const [fileName, setFileName] = useState('converted');
  const [convertedPreview, setConvertedPreview] = useState('');
  const [uploadedFormat, setUploadedFormat] = useState('');

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
            break;
          case 'csv':
            data = Papa.parse(content, { header: true }).data;
            break;
          case 'yaml':
          case 'yml':
            data = yaml.load(content);
            break;
          case 'xml':
            data = xml2js(content, { compact: true });
            break;
          case 'xlsx':
            const workbook = XLSX.read(content, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            data = XLSX.utils.sheet_to_json(worksheet);
            break;
          default:
            alert('Unsupported file type');
            return;
        }
        setParsedData(data);
        setConvertedPreview('');
      } catch (error) {
        alert('Failed to parse file');
        console.error(error);
      }
    };

    extension === 'xlsx' ? reader.readAsBinaryString(file) : reader.readAsText(file);
  };

  const convertAndDownload = () => {
    if (!parsedData) return alert('No data to convert');

    try {
      let dataToConvert = parsedData;
      let convertedStr = '';

      if (['csv', 'excel'].includes(selectedFormat)) {
        dataToConvert = flattenData(parsedData);
      }

      switch (selectedFormat) {
        case 'json':
          convertedStr = JSON.stringify(parsedData, null, 2);
          saveAs(new Blob([convertedStr], { type: 'application/json' }), `${fileName}.json`);
          break;
        case 'csv':
          convertedStr = Papa.unparse(dataToConvert);
          saveAs(new Blob([convertedStr], { type: 'text/csv' }), `${fileName}.csv`);
          break;
        case 'yaml':
          convertedStr = yaml.dump(parsedData);
          saveAs(new Blob([convertedStr], { type: 'text/yaml' }), `${fileName}.yaml`);
          break;
        case 'xml':
          convertedStr = js2xml(parsedData, { compact: true, spaces: 2 });
          saveAs(new Blob([convertedStr], { type: 'application/xml' }), `${fileName}.xml`);
          break;
        default:
          alert('Invalid format selected');
      }

      setConvertedPreview(convertedStr.slice(0, 2000));
    } catch (error) {
      alert('Conversion failed');
      console.error(error);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto bg-slate-900 border border-purple-800 rounded-2xl shadow-[0_0_30px_5px_rgba(168,85,247,0.4)] mt-10 text-white">
      <h2 className="text-3xl font-bold text-center text-purple-300 mb-6">🚀 Fast Format Converter</h2>

      <input
        type="file"
        accept=".json,.csv,.xlsx,.yaml,.yml,.xml"
        className="mb-4 block w-full p-3 rounded-lg bg-slate-800 text-white"
        onChange={handleFileUpload}
      />

      {fileName && uploadedFormat && (
        <div className="mb-4 p-3 rounded-lg bg-green-800 text-green-200 font-semibold">
          📁 Uploaded File: <span className="text-white">{fileName}.{uploadedFormat}</span>
        </div>
      )}

      <label className="block mb-2 font-semibold text-purple-300">Convert To:</label>
      <select
        className="w-full p-3 mb-6 bg-slate-800 rounded-lg"
        value={selectedFormat}
        onChange={(e) => setSelectedFormat(e.target.value)}
      >
        <option value="json">JSON</option>
        <option value="csv">CSV</option>
        <option value="yaml">YAML</option>
        <option value="xml">XML</option>
      </select>

      <button
        onClick={convertAndDownload}
        className="w-full bg-purple-700 hover:bg-purple-600 py-3 rounded-xl font-semibold mb-8"
      >
        🔄 Convert & Download
      </button>

      {convertedPreview && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2 text-purple-300">🔍 Converted Preview:</h3>
          <pre className="max-h-[400px] overflow-auto p-4 bg-slate-800 rounded-lg border border-purple-700 whitespace-pre-wrap">
            {convertedPreview}
          </pre>
        </div>
      )}
    </div>
  );
}
