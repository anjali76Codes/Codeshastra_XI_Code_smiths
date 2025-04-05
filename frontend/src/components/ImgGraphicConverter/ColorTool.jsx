import React, { useState, useRef, useEffect } from 'react';
import { HexColorPicker } from 'react-colorful';
import { colord, extend } from 'colord';
import namesPlugin from 'colord/plugins/names';
import html2canvas from 'html2canvas';

extend([namesPlugin]);

const ColorTool = () => {
  const [color, setColor] = useState('#3498db');
  const [paletteType, setPaletteType] = useState('complementary');
  const [locked, setLocked] = useState(Array(6).fill(false));
  const [palette, setPalette] = useState([]);
  const [format, setFormat] = useState('hex');
  const [imagePreview, setImagePreview] = useState(null);

  const paletteRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  const formatColor = (hex) => {
    const c = colord(hex);
    switch (format) {
      case 'hsl': return c.toHslString();
      case 'rgb': return c.toRgbString();
      case 'name': return c.toName() || 'Unknown';
      default: return c.toHex();
    }
  };

  const generatePalette = () => {
    const base = colord(color);
    let newPalette;

    switch (paletteType) {
      case 'analogous':
        newPalette = [
          base.rotate(-40),
          base.rotate(-20),
          base,
          base.rotate(20),
          base.rotate(40),
          base.rotate(60),
        ];
        break;
      case 'triadic':
        newPalette = [
          base,
          base.rotate(120),
          base.rotate(240),
          base.rotate(120).lighten(0.1),
          base.rotate(240).saturate(0.2),
          base.darken(0.1)
        ];
        break;
      case 'complementary':
        newPalette = [
          base,
          base.rotate(180),
          base.rotate(180).lighten(0.1),
          base.rotate(180).darken(0.1),
          base.darken(0.1),
          base.lighten(0.1)
        ];
        break;
      case 'tetradic':
        newPalette = [
          base,
          base.rotate(90),
          base.rotate(180),
          base.rotate(270),
          base.rotate(90).lighten(0.1),
          base.rotate(270).saturate(0.2)
        ];
        break;
      case 'monochromatic':
        newPalette = [
          base,
          base.lighten(0.1),
          base.lighten(0.2),
          base.darken(0.1),
          base.darken(0.2),
          base.saturate(0.2)
        ];
        break;
      default:
        newPalette = [base];
    }

    setPalette((prev) =>
      newPalette.map((c, i) => (locked[i] ? prev[i] : c.toHex()))
    );
  };

  const randomize = () => {
    const randomHex = () =>
      '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    setColor(randomHex());
  };

  const toggleLock = (index) => {
    const newLocks = [...locked];
    newLocks[index] = !newLocks[index];
    setLocked(newLocks);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert(`Copied ${text} to clipboard!`);
  };

  const exportPaletteAsImage = () => {
    if (paletteRef.current) {
      html2canvas(paletteRef.current).then((canvas) => {
        const link = document.createElement('a');
        link.download = 'palette.png';
        link.href = canvas.toDataURL();
        link.click();
      });
    }
  };

  const handleFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return;

    const img = new Image();
    const reader = new FileReader();
    reader.onload = function (event) {
      const imageDataUrl = event.target.result;
      setImagePreview(imageDataUrl);
      img.src = imageDataUrl;

      img.onload = function () {
        const canvas = canvasRef.current;
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        canvas.onclick = (e) => {
          const x = e.offsetX;
          const y = e.offsetY;
          const data = ctx.getImageData(x, y, 1, 1).data;
          const picked = colord({ r: data[0], g: data[1], b: data[2] }).toHex();
          setColor(picked);
        };
      };
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    generatePalette();
  }, [color, paletteType, locked]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Floating Controls */}
      <div className="sticky bg-white shadow-md px-4 py-2 rounded-full flex gap-3 z-50">
        <select
          value={paletteType}
          onChange={(e) => setPaletteType(e.target.value)}
          className="px-2 py-1 rounded-md border"
        >
          <option value="complementary">Complementary</option>
          <option value="analogous">Analogous</option>
          <option value="triadic">Triadic</option>
          <option value="tetradic">Tetradic</option>
          <option value="monochromatic">Monochromatic</option>
        </select>

        <select
          value={format}
          onChange={(e) => setFormat(e.target.value)}
          className="px-2 py-1 rounded-md border"
        >
          <option value="hex">HEX</option>
          <option value="rgb">RGB</option>
          <option value="hsl">HSL</option>
          <option value="name">Name</option>
        </select>

        <button
          onClick={randomize}
          className="bg-blue-600 text-white px-3 py-1 rounded-md"
        >
          🎲
        </button>

        <button
          onClick={exportPaletteAsImage}
          className="bg-green-500 text-white px-3 py-1 rounded-md"
        >
          📤
        </button>
      </div>

      {/* Palette Display */}
      <div
        ref={paletteRef}
        className="flex w-full mt-24 rounded-xl overflow-hidden shadow-lg"
      >
        {palette.map((hex, i) => (
          <div
            key={i}
            className="flex-1 relative h-80 flex items-center justify-center text-white font-semibold text-lg cursor-pointer group transition duration-200"
            style={{ backgroundColor: hex }}
            onClick={() => copyToClipboard(formatColor(hex))}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleLock(i);
              }}
              className="absolute top-2 right-2 text-xl opacity-60 hover:opacity-100 transition"
            >
              {locked[i] ? '🔒' : '🔓'}
            </button>

            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 opacity-90 group-hover:opacity-100">
              {formatColor(hex)}
            </div>
          </div>
        ))}
      </div>

      {/* Color Picker & Image Picker */}
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
        <div className="flex flex-wrap justify-center gap-6">
          {/* Color Picker */}
          <div className="flex flex-col items-center">
            <HexColorPicker color={color} onChange={setColor} />
            <input
              type="text"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="mt-4 px-4 py-2 border rounded-lg w-40 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Image Picker */}
          <div className="w-full md:w-2/3 text-center">
            <label className="block mb-2 font-medium text-sm">Pick color from image:</label>
            <div
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              onClick={handleBrowseClick}
              className="w-full border-2 border-dashed border-blue-400 rounded-xl p-6 text-center cursor-pointer mb-4 hover:bg-blue-50 transition"
            >
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="max-h-60 mx-auto rounded" />
              ) : (
                <p className="text-gray-500">📂 Drag & drop an image here or click to browse</p>
              )}
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="hidden"
                onChange={(e) => handleFile(e.target.files[0])}
              />
            </div>
            <canvas
              ref={canvasRef}
              className="border rounded-md cursor-crosshair max-w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorTool;
