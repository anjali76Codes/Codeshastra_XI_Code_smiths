import React, { useState } from 'react';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/themes/prism.css';
import { usePaymentStatus } from '../login/PaymentStatusContext';

const defaultCode = `fetch('https://jsonplaceholder.typicode.com/posts/1')
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));`;

const CustomApiPlayground = ({ isDarkMode }) => {
    const { isPremium } = usePaymentStatus(); // Access payment status
    const [code, setCode] = useState(defaultCode);
    const [output, setOutput] = useState(null);
    const [error, setError] = useState(null);

    const handleRun = async () => {
        setOutput(null);
        setError(null);

        try {
            const logs = [];
            const originalLog = console.log;
            const originalError = console.error;

            console.log = (...args) => logs.push(...args);
            console.error = (...args) => {
                setError(args.join(' '));
            };

            await eval(code);

            setOutput(logs.length ? logs : 'No output');

            // Restore original console methods
            console.log = originalLog;
            console.error = originalError;
        } catch (err) {
            setError(err.message);
        }
    };

    // If not premium, show upgrade prompt
    if (!isPremium) {
        return (
            <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
                <div className={`p-8 rounded-2xl shadow-xl text-center max-w-md w-full
                    ${isDarkMode ? 'bg-purple-950 text-white' : 'bg-white text-black'}`}>
                    <h2 className="text-3xl font-bold mb-4">Premium Feature</h2>
                    <p className="mb-6 text-sm leading-relaxed">
                        The API Playground is available only for premium users. Please upgrade your plan to access this feature.
                    </p>
                    <a
                        href="/subscribe"
                        className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full transition duration-300"
                    >
                        Upgrade Now
                    </a>
                </div>
            </div>
        );
    }
    

    return (
        <div
            className={`w-full p-4 flex flex-col min-h-screen transition-all duration-300 overflow-y-auto
                ${isDarkMode
                    ? 'bg-gradient-to-b from-black via-purple-400 to-black text-white'
                    : 'bg-gradient-to-b from-purple-300 via-white to-purple-300 text-black'}`}
            style={{ maxHeight: '85vh' }}
        >
            <h2 className="text-lg mb-2 font-bold">Custom GET Request</h2>

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
