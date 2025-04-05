import React, { useState } from 'react';
import PublicApiSidebar from './PublicApiSidebar';
import apiData from '../../data/apidata';
import PublicApiCodePanel from './PublicApiCodePanel';

const PublicApiDocs = () => {
    const [selectedApi, setSelectedApi] = useState(Object.keys(apiData)[0]);
    const api = apiData[selectedApi];

    if (!api) {
        return (
            <div className="flex h-screen items-center justify-center text-red-600">
                <p>Error: Selected API not found</p>
            </div>
        );
    }

    return (
        <div className="flex bg-gray-100 min-h-screen">
            <PublicApiSidebar onSelect={setSelectedApi} selected={selectedApi} />

            <main className="flex-1 p-10 flex flex-col overflow-y-auto">
                <h1 className="text-3xl font-bold mb-4">{api.title}</h1>
                <p className="text-lg mb-6">{api.description}</p>

                <div className="bg-white p-6 rounded-xl shadow border max-w-3xl mb-6">
                    <div className="mb-3">
                        <span className="font-semibold">Method:</span>{' '}
                        <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-md">{api.method}</span>
                    </div>
                    <div className="mb-3">
                        <span className="font-semibold">Endpoint:</span>{' '}
                        <code className="bg-gray-200 px-2 py-1 rounded text-sm">{api.endpoint}</code>
                    </div>
                    {api.usage && (
                        <div
                            className="prose prose-sm max-w-none mb-6 text-gray-800"
                            dangerouslySetInnerHTML={{ __html: api.usage }}
                        ></div>

                    )}
                </div>

            </main>


            <PublicApiCodePanel code={api.code} endpoint={api.endpoint} />


        </div>
    );
};

export default PublicApiDocs;
