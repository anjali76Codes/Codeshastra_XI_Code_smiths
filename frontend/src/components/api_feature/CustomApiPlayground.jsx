import React, { useState } from 'react';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-tomorrow.css'; // Still used for dark theme
import 'prismjs/themes/prism.css'; // Light theme fallback

const defaultCode = `fetch('https://jsonplaceholder.typicode.com/posts/1')
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));`;

const CustomApiPlayground = ({ isDarkMode }) => {
    const [code, setCode] = useState(defaultCode);
    const [output, setOutput] = useState(null);
    const [error, setError] = useState(null);

    const handleRun = async () => {
        setOutput(null);
        setError(null);
        try {
            const log = [];
            const originalLog = console.log;
            const originalErr = console.error;

            console.log = (...args) => log.push(...args);
            console.error = (...args) => {
                setError(args.join(' '));
            };

            await eval(code);

            setOutput(log.length ? log : 'No output');
            console.log = originalLog;
            console.error = originalErr;
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div
            className={`w-full p-4 flex flex-col min-h-screen transition-all duration-300 overflow-y-auto
                ${isDarkMode
                    ? 'bg-gradient-to-b from-black via-purple-400 to-black text-white'
                    : 'bg-gradient-to-b from-purple-300 via-white to-purple-300 text-black'}`}
            style={{ maxHeight: '85vh' }}
        >
            <h2 className="text-lg mb-2 font-bold">Custom GET Request</h2>

            {/* Editor Wrapper */}
            <div
                className={`rounded-xl backdrop-blur-lg border-2 mb-4 transition-all duration-300
                    ${isDarkMode ? 'border-purple-200 bg-purple-50/10' : 'border-purple-400 bg-white/50'}`}
            >
                <Editor
                    value={code}
                    onValueChange={setCode}
                    highlight={(code) =>
                        Prism.highlight(code, Prism.languages.javascript, 'javascript')
                    }
                    padding={16}
                    style={{
                        fontFamily: '"Fira Code", monospace',
                        fontSize: 14,
                        backgroundColor: 'transparent',
                        color: isDarkMode ? 'white' : 'black',
                        whiteSpace: 'pre-wrap',
                        minHeight: '240px',
                        outline: 'none',
                    }}
                />
            </div>

            <button
                onClick={handleRun}
                className="bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-3xl mb-4"
            >
                Run Code
            </button>

            {output && (
                <div className={`mt-2 text-sm p-3 rounded-3xl max-h-60 overflow-y-auto border 
                    ${isDarkMode ? 'bg-purple-900 text-purple-100 border-purple-700' : 'bg-purple-100 text-black border-purple-400'}`}>
                    <h3 className="font-semibold mb-2">Response Output:</h3>
                    <pre>{JSON.stringify(output, null, 2)}</pre>
                </div>
            )}

            {error && (
                <div className={`mt-2 text-sm p-3 rounded-3xl max-h-60 overflow-y-auto border 
                    ${isDarkMode ? 'bg-red-900 text-red-100 border-red-700' : 'bg-red-100 text-red-800 border-red-400'}`}>
                    <h3 className="font-semibold mb-2">Error:</h3>
                    <pre>{error}</pre>
                </div>
            )}
        </div>
    );
};

export default CustomApiPlayground;
