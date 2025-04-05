import React, { useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const languageOptions = {
    javascript: ['fetch', 'axios', 'http'],
    python: ['requests', 'urllib', 'httpx'],
    ruby: ['nethttp', 'httparty', 'faraday'],
    php: ['file_get_contents', 'curl', 'guzzle'],
};

const PublicApiCodePanel = ({ code, endpoint }) => {
    const [activeLang, setActiveLang] = useState('javascript');
    const [requestType, setRequestType] = useState(languageOptions['javascript'][0]);
    const [output, setOutput] = useState(null);

    console.log(endpoint)

    useEffect(() => {
        setRequestType(languageOptions[activeLang][0]);
    }, [activeLang]);

    const handleCopy = () => {
        const text = code[activeLang]?.[requestType] || '';
        navigator.clipboard.writeText(text);
    };

    const handleRun = async () => {
        setOutput(null);

        try {
            const res = await fetch(endpoint);
            const json = await res.json();
            setOutput(json);
        } catch (err) {
            setOutput({ error: 'Failed to fetch data.', message: err.message });
        }
    };


    const handleDownload = () => {
        if (!output) return;
        const dataStr = JSON.stringify(output, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'api-response.json';
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="w-1/3 bg-[#1e1e1e] rounded-lg p-4 ml-4 shadow-lg border border-gray-700 flex flex-col" style={{ maxHeight: '85vh' }}>
            {/* Language Tabs */}
            <div className="flex space-x-2 mb-4">
                {Object.keys(languageOptions).map((lang) => (
                    <button
                        key={lang}
                        className={`px-3 py-1 rounded-md text-sm font-medium capitalize transition ${activeLang === lang ? 'bg-gray-700 text-white' : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                            }`}
                        onClick={() => setActiveLang(lang)}
                    >
                        {lang}
                    </button>
                ))}
            </div>

            {/* Request Type Dropdown */}
            <div className="mb-2">
                <select
                    value={requestType}
                    onChange={(e) => setRequestType(e.target.value)}
                    className="text-sm bg-gray-800 text-white border border-gray-600 rounded px-2 py-1"
                >
                    {languageOptions[activeLang].map((type) => (
                        <option key={type} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
            </div>

            {/* Code Viewer */}
            <div className="flex-1 mb-4 rounded-lg overflow-y-auto">
                <SyntaxHighlighter
                    language={activeLang}
                    style={vscDarkPlus}
                    customStyle={{
                        padding: '1rem',
                        background: '#1e1e1e',
                        fontSize: '0.85rem',
                        borderRadius: '0.5rem',
                        margin: 0,
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word',
                    }}
                    wrapLongLines={true}
                >
                    {code[activeLang]?.[requestType] || '// Code not available'}
                </SyntaxHighlighter>
            </div>

            {/* Footer Actions */}
            <div className="pt-2 border-t border-gray-600 flex justify-between">
                <button
                    className="bg-gray-700 hover:bg-gray-600 text-white text-sm px-3 py-1 rounded"
                    onClick={handleCopy}
                >
                    Copy
                </button>
                <button
                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded"
                    onClick={handleRun}
                >
                    Run this code
                </button>
            </div>

            {/* Output Viewer */}
            {output && (
                <div className="mt-4 bg-gray-900 text-sm text-gray-100 p-3 rounded max-h-60 overflow-y-auto border border-gray-700">
                    <pre>{JSON.stringify(output, null, 2)}</pre>
                    <button
                        className="mt-2 bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-1 rounded"
                        onClick={handleDownload}
                    >
                        Download JSON
                    </button>
                </div>
            )}
        </div>
    );
};

export default PublicApiCodePanel;
