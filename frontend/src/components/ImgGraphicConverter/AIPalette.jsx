import React, { useState } from 'react';

const AIPalette = ({ onApply }) => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);

  const generateFromColormind = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://colormind.io/api/', {
        method: 'POST',
        body: JSON.stringify({ model: 'default', input: ['N', 'N', 'N', 'N', 'N'] })
      });
      const data = await res.json();
      const colors = data.result.map(
        ([r, g, b]) => '#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('')
      );
      onApply(colors);
    } catch (err) {
      alert('Error fetching from Colormind.');
    }
    setLoading(false);
  };

  const generateFromGemini = async () => {
    setLoading(true);
    try {
      const encodedBody = JSON.stringify({
        contents: [{ parts: [{ text: `Generate a color palette for: ${prompt}. Return 6 hex codes only.` }] }]
      });
  
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`;
      const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
  
      const res = await fetch(proxyUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: encodedBody
      });
  
      const result = await res.json();
      console.log('Gemini raw response:', result); // 🔍 Add this
      
      const text = result.candidates?.[0]?.content?.parts?.[0]?.text || '';
      console.log('Extracted text:', text); // 🔍 Add this
      
      const hexCodes = text.match(/#(?:[0-9a-fA-F]{6})/g) || [];
      
  
      if (hexCodes.length) {
        onApply(hexCodes);
      } else {
        alert('No valid hex codes found.');
      }
    } catch (err) {
      console.error(err);
      alert('Gemini request failed.');
    }
    setLoading(false);
  };
  
  

  return (
    <div className="mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">🧠 Generate Palette with AI</h2>

      <div className="flex flex-col md:flex-row gap-4">
        <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe a mood, theme, or object..."
          className="border p-2 rounded-md flex-1"
        />
        <button
          onClick={generateFromGemini}
          disabled={loading}
          className="bg-purple-600 text-white px-4 py-2 rounded-md"
        >
          Gemini ✨
        </button>
        <button
          onClick={generateFromColormind}
          disabled={loading}
          className="bg-gray-800 text-white px-4 py-2 rounded-md"
        >
          Colormind 🎨
        </button>
      </div>
    </div>
  );
};

export default AIPalette;
