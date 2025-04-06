// src/components/MockDataGenerator.js
import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import { faker } from '@faker-js/faker';
import Papa from 'papaparse';
import yaml from 'js-yaml';
import { js2xml } from 'xml-js';
import { useTheme } from '../Theme/themecontext'; // Adjust if needed

export default function MockDataGenerator() {
    const { isDarkMode, toggleTheme } = useTheme();
    const [selectedFormat, setSelectedFormat] = useState('json');
    const [generatedData, setGeneratedData] = useState('');
    const [fileName, setFileName] = useState('sample');
    const [numRows, setNumRows] = useState(10);
    const [columns, setColumns] = useState(['name', 'age', 'email', 'address']);
    const [userId, setUserId] = useState('');
    const [queriedUser, setQueriedUser] = useState(null);

    const generateSampleData = () => {
        const data = Array.from({ length: numRows }, (_, index) => {
            const row = { id: index + 1 };
            columns.forEach((col) => {
                switch (col) {
                    case 'name': row.name = faker.person.fullName(); break;
                    case 'age': row.age = faker.number.int({ min: 18, max: 65 }); break;
                    case 'email': row.email = faker.internet.email(); break;
                    case 'address':
                        row.address = {
                            city: faker.location.city(),
                            country: faker.location.country(),
                        };
                        break;
                    default: break;
                }
            });
            return row;
        });

        let output = '';
        switch (selectedFormat) {
            case 'json': output = JSON.stringify(data, null, 2); break;
            case 'csv': output = Papa.unparse(data); break;
            case 'yaml': output = yaml.dump(data); break;
            case 'xml': output = js2xml({ users: { user: data } }, { compact: true, spaces: 2 }); break;
            default: output = '';
        }

        setGeneratedData(output);
        setFileName(`sample_${selectedFormat}`);
    };

    const handleDownload = () => {
        const blob = new Blob([generatedData], { type: 'text/plain;charset=utf-8' });
        saveAs(blob, `${fileName}.${selectedFormat}`);
    };

    const handleColumnChange = (e) => {
        const newColumns = e.target.value.split(',').map((col) => col.trim());
        setColumns(newColumns);
    };

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
        <div className={`min-h-screen p-6 transition-colors duration-300 ${isDarkMode
            ? 'bg-gradient-to-b from-black via-purple-400 to-black text-white'
            : 'bg-gradient-to-b from-purple-300 via-white to-purple-300 text-black border-2 border-purple-400'
        }`}>

            <div className={`max-w-4xl mx-auto p-8 backdrop-blur-2xl rounded-3xl shadow-md border-2 ${isDarkMode
                ? 'border-purple-300 bg-transparent'
                : 'border-purple-300 bg-white/70'
            }`}>
                <h2 className="text-2xl font-bold text-center mb-6 text-purple-500">Mock Data Generator</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    <select
                        className={`p-3 rounded-3xl ${isDarkMode ? 'bg-purple-900/70 text-white' : 'bg-purple-200 text-black'}`}
                        value={selectedFormat}
                        onChange={(e) => setSelectedFormat(e.target.value)}
                    >
                        <option value="json">JSON</option>
                        <option value="csv">CSV</option>
                        <option value="yaml">YAML</option>
                        <option value="xml">XML</option>
                    </select>

                    <input
                        type="number"
                        min="1"
                        value={numRows}
                        onChange={(e) => setNumRows(Number(e.target.value))}
                        placeholder="Number of Rows"
                        className={`p-3 rounded-3xl ${isDarkMode ? 'bg-purple-900/70 text-white' : 'bg-purple-200 text-black'}`}
                    />

                    <input
                        type="text"
                        value={columns.join(', ')}
                        onChange={handleColumnChange}
                        placeholder="Columns (e.g., name, age, email)"
                        className={`p-3 rounded-3xl ${isDarkMode ? 'bg-purple-900/70 text-white' : 'bg-purple-200 text-black'}`}
                    />
                </div>

                <div className="flex flex-wrap gap-4 mb-8">
                    <button
                        onClick={generateSampleData}
                        className="py-2 px-4 rounded-3xl font-semibold transition bg-purple-800 hover:bg-purple-700 text-white"
                    >
                        Generate Sample
                    </button>

                    {generatedData && (
                        <button
                            onClick={handleDownload}
                            className="py-2 px-4 rounded-3xl font-semibold transition bg-purple-800 hover:bg-purple-700 text-white"
                        >
                            Download
                        </button>
                    )}
                </div>

                {generatedData && (
                    <>
                        {/* <div className="mb-6">
                            <h3 className="text-white mb-2">Query by User ID</h3>
                            <div className="flex flex-wrap gap-4">
                                <input
                                    type="number"
                                    placeholder="Enter User ID"
                                    className={`p-3 rounded-3xl ${isDarkMode ? 'bg-purple-900/70 text-white' : 'bg-purple-100 text-black'}`}
                                    value={userId}
                                    onChange={(e) => setUserId(e.target.value)}
                                />
                                <button
                                    onClick={() => getUserById(userId)}
                                    className="py-2 px-4 rounded-3xl font-semibold transition bg-purple-800 hover:bg-purple-700 text-white"
                                >
                                    Get User
                                </button>
                            </div>
                            {queriedUser && (
                                <pre className={`mt-4 p-4 rounded-3xl border border-purple-300 ${isDarkMode ? 'bg-slate-800 text-white' : 'bg-purple-100 text-black'}`}>
                                    {JSON.stringify(queriedUser, null, 2)}
                                </pre>
                            )}
                        </div> */}

                        <div>
                            <h3 className={`text-lg mb-2 ${isDarkMode ? 'text-white' : 'text-purple-950'}`}>Sample Preview</h3>
                            <pre className={`max-h-[400px] overflow-auto p-4 rounded-3xl border border-purple-300 ${isDarkMode ? 'bg-purple-950/50 text-white' : 'bg-purple-100 text-black'}`}>
                                {generatedData}
                            </pre>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
