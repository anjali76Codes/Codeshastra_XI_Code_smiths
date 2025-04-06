import React, { useState } from 'react';

// MainApp Component
const MainApp = () => {
  const [activeTab, setActiveTab] = useState('meta'); // default to 'meta' tab

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="flex justify-between border-b border-gray-700 pb-4 mb-4">
            <button
              className={`text-lg font-semibold py-2 px-4 ${activeTab === 'meta' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-400'}`}
              onClick={() => setActiveTab('meta')}
            >
              Meta Tag Generator
            </button>
            <button
              className={`text-lg font-semibold py-2 px-4 ${activeTab === 'keyword' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-400'}`}
              onClick={() => setActiveTab('keyword')}
            >
              Keyword Analyzer
            </button>
          </div>

          {/* Conditional Rendering Based on Active Tab */}
          {activeTab === 'meta' ? <MetaTagGenerator /> : <KeywordAnalyzer />}
        </div>
      </div>
    </div>
  );
};

// MetaTagGenerator Component
const MetaTagGenerator = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [metaTags, setMetaTags] = useState(null);
  const [error, setError] = useState('');

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);

  const generateMetaTags = async () => {
    if (!title || !description) {
      setError('Title and description are required.');
      return;
    }
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://127.0.0.1:5000/generate_meta_tags', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description }),
      });

      const data = await response.json();

      if (data.meta_title && data.meta_description) {
        setMetaTags(data);
      } else {
        setError(data.error || 'An error occurred while generating meta tags.');
      }
    } catch (err) {
      setError('Failed to fetch data from the backend.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-200">Meta Tag Generator</h2>

      <div>
        <input
          type="text"
          placeholder="Enter Page Title"
          value={title}
          onChange={handleTitleChange}
          className="w-full p-3 border-2 border-gray-700 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <textarea
          placeholder="Enter Page Description"
          value={description}
          onChange={handleDescriptionChange}
          rows="4"
          className="w-full p-3 border-2 border-gray-700 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <button
          onClick={generateMetaTags}
          disabled={loading}
          className={`w-full py-3 bg-blue-500 text-white rounded-md ${loading ? 'bg-gray-600 cursor-not-allowed' : 'hover:bg-blue-600'}`}
        >
          {loading ? 'Generating...' : 'Generate Meta Tags'}
        </button>
      </div>

      {error && <p className="text-red-400">{error}</p>}

      {metaTags && (
        <div className="mt-6">
          <h3 className="text-2xl font-semibold text-gray-200">Generated Meta Tags:</h3>
          <div className="mt-4 space-y-2">
            <div>
              <p className="text-sm text-gray-400">Meta Title:</p>
              <pre className="bg-gray-700 p-4 rounded-md text-gray-200">{metaTags.meta_title}</pre>
            </div>
            <div>
              <p className="text-sm text-gray-400">Meta Description:</p>
              <pre className="bg-gray-700 p-4 rounded-md text-gray-200">{metaTags.meta_description}</pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// KeywordAnalyzer Component
const KeywordAnalyzer = () => {
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const handleInputChange = (e) => setKeyword(e.target.value);

  const analyzeKeyword = async () => {
    if (!keyword.trim()) {
      setError('Please enter a keyword.');
      return;
    }
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`http://127.0.0.1:5000/analyze_keywords?keyword=${encodeURIComponent(keyword)}`);
      const data = await response.json();

      if (data.keywords) {
        setResults(data.keywords);
      } else {
        setError(data.error || 'An error occurred while analyzing the keyword.');
      }
    } catch (err) {
      setError('Failed to fetch data from the backend.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-200">Keyword Analyzer</h2>

      <div>
        <input
          type="text"
          placeholder="Enter a keyword"
          value={keyword}
          onChange={handleInputChange}
          className="w-full p-3 border-2 border-gray-700 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <button
          onClick={analyzeKeyword}
          disabled={loading}
          className={`w-full py-3 bg-blue-500 text-white rounded-md ${loading ? 'bg-gray-600 cursor-not-allowed' : 'hover:bg-blue-600'}`}
        >
          {loading ? 'Analyzing...' : 'Analyze'}
        </button>
      </div>

      {error && <p className="text-red-400">{error}</p>}

      <h3 className="text-2xl font-semibold text-gray-200">Top Keywords:</h3>
      {results.length > 0 ? (
        <ul className="list-disc pl-5 space-y-2 mt-4">
          {results.map(([word, count], index) => (
            <li key={index} className="text-gray-400">
              <span className="font-bold text-blue-500">{word}</span>: {count}
            </li>
          ))}
        </ul>
      ) : (
        !loading && <p className="text-gray-500 mt-4">No results to show.</p>
      )}
    </div>
  );
};

export default MainApp;
