import React, { useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import CustomApiPlayground from './CustomApiPlayground';

const languageOptions = {
    javascript: ['fetch', 'axios', 'http'],
    python: ['requests', 'urllib', 'httpx'],
    ruby: ['nethttp', 'httparty', 'faraday'],
    php: ['file_get_contents', 'curl', 'guzzle'],
};

const PublicApiCodePanel = ({ code, endpoint, isPlayground, isDarkMode }) => {
    if (isPlayground) {
        return (
            <div className="w-2/5 ml-4 fixed top-0 right-0 pt-12 min-h-full">
                <CustomApiPlayground isDarkMode={isDarkMode} />
            </div>
        );
    }

    const availableLangs = Object.keys(languageOptions).filter(lang => code?.[lang]);
    const defaultLang = availableLangs[0] || 'javascript';

    const [activeLang, setActiveLang] = useState(defaultLang);
    const [requestType, setRequestType] = useState(languageOptions[defaultLang]?.[0] || '');
    const [output, setOutput] = useState(null);

    useEffect(() => {
        setRequestType(languageOptions[activeLang]?.[0] || '');
    }, [activeLang]);

    const handleCopy = () => {
        const text = code?.[activeLang]?.[requestType] || '';
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
        <div className={`w-1/3 p-4 ml-4 pt-20 fixed right-0 top-0 min-h-full shadow-lg ${
            isDarkMode ? 'bg-[#1e1e1e] text-white' : 'bg-white text-black'
        }`}>
            {/* Language Tabs */}
            <div className="flex space-x-2 mb-4">
                {Object.keys(languageOptions).map((lang) => (
                    <button
                        key={lang}
                        className={`px-3 py-1 rounded-3xl text-sm font-medium capitalize transition ${
                            activeLang === lang
                                ? 'bg-purple-700 text-white'
                                : 'bg-purple-300 text-black hover:bg-purple-400'
                        }`}
                        onClick={() => setActiveLang(lang)}
                    >
                        {lang}
                    </button>
                ))}
            </div>

            {/* Request Dropdown */}
            <select
                value={requestType}
                onChange={(e) => setRequestType(e.target.value)}
                className="text-sm mb-2 border rounded-3xl px-3 py-1 bg-purple-100 text-black"
            >
                {(languageOptions[activeLang] || []).map((type) => (
                    <option key={type} value={type}>
                        {type}
                    </option>
                ))}
            </select>

            {/* Code Viewer */}
            <div className="flex-1 mb-4 rounded-lg overflow-y-auto">
                <SyntaxHighlighter
                    language={activeLang}
                    style={vscDarkPlus}
                    customStyle={{
                        padding: '1rem',
                        background: isDarkMode ? '#1e1e1e' : '#545454',
                        color: isDarkMode ? 'white' : '#000',
                        fontSize: '0.85rem',
                        borderRadius: '0.5rem',
                        margin: 0,
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word',
                    }}
                >
                    {code?.[activeLang]?.[requestType] || '// Code not available'}
                </SyntaxHighlighter>
            </div>

            {/* Footer Actions */}
            <div className="pt-2 border-t flex justify-between">
                <button className="bg-purple-700 text-white px-3 py-1 rounded-3xl" onClick={handleCopy}>
                    Copy
                </button>
                <button className="bg-purple-600 text-white px-3 py-1 rounded-3xl" onClick={handleRun}>
                    Run this code
                </button>
            </div>

            {/* Output */}
            {output && (
                <div className="mt-4 bg-purple-900 text-sm text-purple-100 p-3 rounded-3xl max-h-60 overflow-y-auto border border-purple-700">
                    <button
                        className="mt-2 bg-purple-950 hover:bg-purple-700 text-white border font-bold px-3 py-1 rounded-3xl"
                        onClick={handleDownload}
                    >
                        Download JSON
                    </button>
                    <pre>{JSON.stringify(output, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default PublicApiCodePanel;
