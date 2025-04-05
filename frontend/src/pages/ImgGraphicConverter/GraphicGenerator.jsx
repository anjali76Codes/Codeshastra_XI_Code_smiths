import React, { useState } from 'react';
import QRGenerator from '../../components/ImgGraphicConverter/QrGenerator';
import BarcodeGenerator from '../../components/ImgGraphicConverter/BarcodeGenerator';

const GraphicGenerator = () => {
  const [activeTab, setActiveTab] = useState('qr');

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center px-4">
      <h1 className="text-3xl font-bold mt-8 mb-4">Code Generator</h1>

      <div className="flex space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded-lg text-white ${
            activeTab === 'qr' ? 'bg-blue-600' : 'bg-gray-400'
          }`}
          onClick={() => setActiveTab('qr')}
        >
          QR Code
        </button>
        <button
          className={`px-4 py-2 rounded-lg text-white ${
            activeTab === 'barcode' ? 'bg-blue-600' : 'bg-gray-400'
          }`}
          onClick={() => setActiveTab('barcode')}
        >
          Barcode
        </button>
      </div>

      {activeTab === 'qr' ? <QRGenerator /> : <BarcodeGenerator />}
    </div>
  );
};

export default GraphicGenerator;
