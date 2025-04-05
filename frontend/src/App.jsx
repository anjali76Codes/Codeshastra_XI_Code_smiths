import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TextFormatter from './components/TextFormatter';
import CodeFormatter from './components/CodeFormatter';
import JsonFormatter from './components/JsonFormatter';
import FormatterApp from './components/FormatterApp';





function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 p-6">
        <main className="w-full max-w-5xl mx-auto">
          <Routes>
            <Route path="/" element={<TextFormatter />} />
            <Route path="/code" element={<CodeFormatter />} />
            <Route path="/json" element={<JsonFormatter/>}/>
            <Route path="/format" element={<FormatterApp/>}/>
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
