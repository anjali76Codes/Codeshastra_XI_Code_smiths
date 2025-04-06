import React from 'react';
import apiData from '../../data/apidata';

const apiRoutes = Object.keys(apiData);

const PublicApiSidebar = ({ onSelect, selected, isDarkMode }) => {
    return (
        <aside className={`${isDarkMode ? 'bg-[#111827] text-white' : 'bg-white text-black'} w-64 h-screen p-4 shadow`}>
            <h2 className="text-xl font-bold mb-6">Public APIs</h2>
            <ul className="space-y-2">
                {apiRoutes.map((route, index) => (
                    <li
                        key={index}
                        onClick={() => onSelect(route)}
                        className={`flex justify-between items-center p-2 rounded-lg cursor-pointer transition-all ${
                            selected === route
                                ? isDarkMode ? 'bg-[#1f2937]' : 'bg-purple-200'
                                : isDarkMode ? 'hover:bg-[#1f2937]' : 'hover:bg-purple-100'
                        }`}
                    >
                        <span>{route}</span>
                        <span className="bg-purple-500 text-sm text-black px-2 py-0.5 rounded-full font-semibold">GET</span>
                    </li>
                ))}

                <li
                    onClick={() => onSelect('__playground__')}
                    className={`flex justify-between items-center p-2 rounded-lg cursor-pointer transition-all ${
                        selected === '__playground__'
                            ? isDarkMode ? 'bg-[#1f2937]' : 'bg-green-200'
                            : isDarkMode ? 'hover:bg-[#1f2937]' : 'hover:bg-green-100'
                    }`}
                >
                    <span>Playground</span>
                    <span className="bg-green-400 text-sm text-black px-2 py-0.5 rounded-full font-semibold">TRY</span>
                </li>
            </ul>
        </aside>
    );
};

export default PublicApiSidebar;