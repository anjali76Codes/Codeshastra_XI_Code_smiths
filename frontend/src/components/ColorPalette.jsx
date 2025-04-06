import React, { useState } from "react";

const ColorPalette = () => {
  const [prompt, setPrompt] = useState("");
  const [colors, setColors] = useState([]);
  const [loading, setLoading] = useState(false);

  const generatePalette = async () => {
    setLoading(true);
    try {
      // API call to generate colors based on the prompt
      const response = await fetch('https://your-color-generator-api.com/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: prompt }),
      });

      const data = await response.json();
      setColors(data.colors); // Assuming the API returns an array of colors
    } catch (error) {
      console.error("Error generating palette:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-2xl font-semibold mb-4">AI Generated Color Palette</h1>

      <div className="mb-4">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter prompt (e.g. 'sunset over the ocean')"
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <button
        onClick={generatePalette}
        className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none"
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Colors"}
      </button>

      {colors.length > 0 && (
        <div className="mt-8 grid grid-cols-3 gap-4">
          {colors.map((color, index) => (
            <div
              key={index}
              className="w-32 h-32 rounded-md"
              style={{ backgroundColor: color }}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ColorPalette;
