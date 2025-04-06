import React, { useState } from 'react';
import PublicApiSidebar from './PublicApiSidebar';
import apiData from '../../data/apidata';
import PublicApiCodePanel from './PublicApiCodePanel';
import { useTheme } from '../Theme/themecontext';  // Import the custom hook

const PublicApiDocs = () => {
    const { isDarkMode, setIsDarkMode } = useTheme();  // Use the custom hook to get theme
    const [selectedApi, setSelectedApi] = useState(Object.keys(apiData)[0]);

    const isPlayground = selectedApi === '__playground__';
    const api = apiData[selectedApi];

    return (
        <div className={`${isDarkMode ? 'bg-[#23023c] text-white' : 'bg-purple-100 text-black'} min-h-screen w-full flex`}>
            <PublicApiSidebar onSelect={setSelectedApi} selected={selectedApi} isDarkMode={isDarkMode} />

            <main className="flex-1 p-10 flex flex-row overflow-y-auto">
                <div className="w-1/2">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-6">
                        <h1 className="text-3xl font-bold">
                            {isPlayground ? 'Custom API Playground' : api?.title}
                        </h1>
                       
                    </div>

                    {/* Description */}
                    <p className="text-lg mb-6">
                        {isPlayground
                            ? 'Write and run your own custom API fetch code here. Great for debugging and testing!'
                            : api?.description}
                    </p>

                    {/* API Info */}
                    {!isPlayground && api && (
                        <div className={`${isDarkMode ? 'bg-purple-950/90' : 'bg-white'} p-6 rounded-xl shadow border max-w-3xl mb-6`}>
                            <div className="mb-3">
                                <span className="font-semibold">Method:</span>{' '}
                                <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded-md">
                                    {api.method}
                                </span>
                            </div>
                            <div className="mb-3">
                                <span className="font-semibold">Endpoint:</span>{' '}
                                <code className={`${isDarkMode ? 'bg-purple-800/90' : ' bg-gray-200'} px-2 py-1 rounded text-sm`}>
                                    {api.endpoint}
                                </code>
                            </div>
                            {api.usage && (
                                <div
                                    className="prose prose-sm max-w-none mb-6"
                                    dangerouslySetInnerHTML={{ __html: api.usage }}
                                />
                            )}
                        </div>
                    )}
                </div>

                <PublicApiCodePanel
                    code={api?.code}
                    endpoint={api?.endpoint}
                    isPlayground={isPlayground}
                    isDarkMode={isDarkMode}
                />
            </main>
        </div>
    );
};

export default PublicApiDocs;
