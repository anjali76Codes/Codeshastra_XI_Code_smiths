// src/components/MockDataGenerator.js
import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import { faker } from '@faker-js/faker';
import Papa from 'papaparse';
import yaml from 'js-yaml';
import { js2xml } from 'xml-js';

export default function MockDataGenerator() {
    const [selectedFormat, setSelectedFormat] = useState('json');
    const [generatedData, setGeneratedData] = useState('');
    const [fileName, setFileName] = useState('sample');
    const [numRows, setNumRows] = useState(10); // Default 10 rows
    const [columns, setColumns] = useState(['name', 'age', 'email', 'address']); // Default columns
    const [userId, setUserId] = useState(''); // For querying by ID
    const [queriedUser, setQueriedUser] = useState(null); // Store query result

    // Function to generate mock data based on columns and row count
    const generateSampleData = () => {
        const data = Array.from({ length: numRows }, (_, index) => {
            const row = {
                id: index + 1, // Assigning an incremental ID
            };
            columns.forEach((col) => {
                switch (col) {
                    case 'name':
                        row.name = faker.person.fullName();
                        break;
                    case 'age':
                        row.age = faker.number.int({ min: 18, max: 65 });
                        break;
                    case 'email':
                        row.email = faker.internet.email();
                        break;
                    case 'address':
                        row.address = {
                            city: faker.location.city(),
                            country: faker.location.country(),
                        };
                        break;
                    default:
                        break;
                }
            });
            return row;
        });

        let output = '';
        switch (selectedFormat) {
            case 'json':
                output = JSON.stringify(data, null, 2);
                break;
            case 'csv':
                output = Papa.unparse(data);
                break;
            case 'yaml':
                output = yaml.dump(data);
                break;
            case 'xml':
                output = js2xml({ users: { user: data } }, { compact: true, spaces: 2 });
                break;
            default:
                output = '';
        }

        setGeneratedData(output);
        setFileName(`sample_${selectedFormat}`);
    };

    // Function to handle download
    const handleDownload = () => {
        const blob = new Blob([generatedData], { type: 'text/plain;charset=utf-8' });
        saveAs(blob, `${fileName}.${selectedFormat}`);
    };

    // Function to handle the columns input
    const handleColumnChange = (e) => {
        const newColumns = e.target.value.split(',').map((col) => col.trim());
        setColumns(newColumns);
    };

    // Function to simulate getUserById (MongoDB query)
    const getUserById = (id) => {
        if (!generatedData) return;
        try {
            const data = JSON.parse(generatedData);
            const user = data.find((user) => user.id === parseInt(id));
            setQueriedUser(user || null);
        } catch (error) {
            console.error('Error parsing JSON:', error);
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto bg-slate-900 border border-purple-800 rounded-2xl shadow-[0_0_30px_5px_rgba(168,85,247,0.4)] mt-10 text-white">
            <h2 className="text-2xl font-bold text-purple-300 mb-4">🧪 Mock Data Generator</h2>

            <div className="flex flex-col md:flex-row gap-4 mb-4">
                {/* Format selection */}
                <select
                    className="p-3 bg-slate-800 rounded-lg"
                    value={selectedFormat}
                    onChange={(e) => setSelectedFormat(e.target.value)}
                >
                    <option value="json">JSON</option>
                    <option value="csv">CSV</option>
                    <option value="yaml">YAML</option>
                    <option value="xml">XML</option>
                </select>

                {/* Number of rows input */}
                <input
                    type="number"
                    min="1"
                    value={numRows}
                    onChange={(e) => setNumRows(Number(e.target.value))}
                    className="p-3 bg-slate-800 rounded-lg"
                    placeholder="Number of Rows"
                />

                {/* Columns input */}
                <input
                    type="text"
                    value={columns.join(', ')}
                    onChange={handleColumnChange}
                    className="p-3 bg-slate-800 rounded-lg"
                    placeholder="Columns (e.g., name, age, email, address)"
                />

                {/* Generate button */}
                <button
                    onClick={generateSampleData}
                    className="bg-green-700 hover:bg-green-600 py-3 px-4 rounded-lg font-semibold"
                >
                    ➕ Generate Sample
                </button>

                {/* Download button */}
                {generatedData && (
                    <button
                        onClick={handleDownload}
                        className="bg-blue-700 hover:bg-blue-600 py-3 px-4 rounded-lg font-semibold"
                    >
                        📥 Download Sample
                    </button>
                )}
            </div>

            {/* Query Section */}
            {generatedData && (
                <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2 text-purple-300">🔍 Query by User ID:</h3>
                    <input
                        type="number"
                        placeholder="Enter User ID"
                        className="p-3 bg-slate-800 rounded-lg mb-2"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                    />
                    <button
                        onClick={() => getUserById(userId)}
                        className="bg-yellow-700 hover:bg-yellow-600 py-3 px-4 rounded-lg font-semibold"
                    >
                        🔍 Get User by ID
                    </button>

                    {queriedUser && (
                        <div className="mt-4">
                            <h3 className="text-lg font-semibold mb-2 text-purple-300">👤 Queried User:</h3>
                            <pre className="p-4 bg-slate-800 rounded-lg border border-purple-700 whitespace-pre-wrap">
                                {JSON.stringify(queriedUser, null, 2)}
                            </pre>
                        </div>
                    )}
                </div>
            )}

            {/* Preview section */}
            {generatedData && (
                <div>
                    <h3 className="text-lg font-semibold mb-2 text-purple-300">👀 Sample Preview:</h3>
                    <pre className="max-h-[400px] overflow-auto p-4 bg-slate-800 rounded-lg border border-purple-700 whitespace-pre-wrap">
                        {generatedData}
                    </pre>
                </div>
            )}
        </div>
    );
}
