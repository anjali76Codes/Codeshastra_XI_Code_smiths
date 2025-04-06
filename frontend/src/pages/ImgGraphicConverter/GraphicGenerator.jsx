import React, { useState, useEffect } from 'react';
import QRGenerator from '../../components/ImgGraphicConverter/QrGenerator';
import BarcodeGenerator from '../../components/ImgGraphicConverter/BarcodeGenerator';
import ColorTool from '../../components/ImgGraphicConverter/ColorTool';
import { useTheme } from '../../components/Theme/themecontext'; // Import the useTheme hook

const tabs = [
  { id: 'qr', label: 'QR Code' },
  { id: 'barcode', label: 'Barcode' },
  { id: 'palette', label: 'Color Palette' }
];

const GraphicSuite = () => {
  const { isDarkMode, toggleDarkMode } = useTheme(); // Use context for dark mode state

  const [activeTab, setActiveTab] = useState('qr');

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'qr':
        return <QRGenerator isDarkMode={isDarkMode} />;
      case 'barcode':
        return <BarcodeGenerator isDarkMode={isDarkMode} />;
      case 'palette':
        return <ColorTool />;
      default:
        return null;
    }
  };

  return (
    <div className={`${isDarkMode ? 'bg-gradient-to-b from-black via-purple-400 to-black text-white' : 'bg-gradient-to-b from-purple-300 via-white to-purple-300 text-black'} min-h-screen transition-colors duration-300 font-sans`}>
      {/* Header */}
      <header className="w-full py-6 px-6 flex flex-col items-center relative">
        <h1 className="text-4xl font-bold mb-2">Graphic Toolbox</h1>
        <p className="text-purple-400 text-sm">Generate QR, Barcode & explore color magic</p>

        {/* Theme Toggle (Handled by Navbar) */}
        {/* No need for theme toggle here as it's handled globally by ThemeContext */}

        {/* Tab Navigation */}
        <nav className={`${isDarkMode ? ' bg-purple-900' : ' bg-purple-900/50'} mt-6 flex space-x-4 bg-purple-800 px-4 py-2 rounded-full shadow-lg`}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-full transition-all duration-200 font-medium ${
                activeTab === tab.id
                  ? 'bg-white text-purple-700'
                  : 'text-white hover:bg-purple-800'
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

export default GraphicSuite;
