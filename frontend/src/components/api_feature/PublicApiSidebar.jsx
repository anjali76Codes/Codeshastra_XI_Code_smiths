import React from 'react';
import apiData from '../../data/apidata';

const apiRoutes = Object.keys(apiData); // Use real keys from your data

const PublicApiSidebar = ({ onSelect, selected }) => {
    return (
        <aside className="w-64 h-screen bg-[#111827] text-white p-4">
            <h2 className="text-xl font-bold mb-6">Public APIs</h2>
            <ul className="space-y-2">
                {apiRoutes.map((route, index) => (
                    <li
                        key={index}
                        onClick={() => onSelect(route)}
                        className={`flex justify-between items-center p-2 rounded-lg cursor-pointer transition-all ${selected === route ? 'bg-[#1f2937]' : 'hover:bg-[#1f2937]'
                            }`}
                    >
                        <span>{route}</span>
                        <span className="bg-purple-500 text-sm text-black px-2 py-0.5 rounded-full font-semibold">GET</span>
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default PublicApiSidebar;
