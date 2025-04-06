import React, { useState } from 'react';
import FormatConverter from '../../components/converter_feature/FormatConverter';
import FormatterAppPage from './formatterappPage';
import CodeFormatterPage from './CodeFormatterPage';
import { useTheme } from '../../components/Theme/themecontext'; // Import the useTheme hook

const tabs = [
  { id: 'format', label: 'Universal Converter' },
  { id: 'formatter', label: 'Text Formatter' },
  { id: 'code', label: 'Code Beautifier' },
];

const FormatConverterPage = () => {
  const { isDarkMode, toggleDarkMode } = useTheme(); // Use context for dark mode state

  const [activeTab, setActiveTab] = useState('format');

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'format':
        return <FormatConverter isDarkMode={isDarkMode} />;
      case 'formatter':
        return <FormatterAppPage isDarkMode={isDarkMode} />;
      case 'code':
        return <CodeFormatterPage isDarkMode={isDarkMode} />;
      default:
        return null;
    }
  };

  return (
    <div className={`${isDarkMode ? 'bg-gradient-to-b from-black via-purple-400 to-black text-white' : 'bg-gradient-to-b from-purple-300 via-white to-purple-300 text-black'} min-h-screen transition-colors duration-300 font-sans`}>
      {/* Header */}
      <header className="w-full py-6 px-6 flex flex-col items-center relative">
        <h1 className="text-4xl font-bold mb-2">Format Converter Suite</h1>
        <p className="text-sm">Convert. Format. Beautify.</p>

        {/* Theme Toggle (Handled by Navbar) */}
        {/* No need for theme toggle here as it's handled globally by ThemeContext */}

        {/* Tab Navigation */}
        <nav className={`${isDarkMode ? 'bg-purple-900' : 'bg-purple-900/50'} mt-6 flex space-x-4 px-4 py-2 rounded-full shadow-lg`}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-full transition-all duration-200 font-medium ${
                activeTab === tab.id
                  ? 'bg-white text-purple-800'
                  : 'text-white hover:bg-purple-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto w-2/3 px-4 py-10 text-black">
        {renderActiveTab()}
      </main>

      {/* Footer */}
      <footer className="text-sm text-center text-purple-300 py-6">
        Built with 💜 by You · <a href="https://github.com" className="underline">View on GitHub</a>
      </footer>
    </div>
  );
};

export default FormatConverterPage;
