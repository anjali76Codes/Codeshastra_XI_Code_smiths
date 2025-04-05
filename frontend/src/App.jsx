import CodeFormatter from "./components/validator_feature/CodeFormatter"
// import TextFormatter from './components/TextFormatter';
// import JsonFormatter from './components/JsonFormatter';
// import FormatterApp from './components/FormatterApp';
import ApiDocsServicePage from './pages/api_feature/ApiDocsServicePage'
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import GraphicSuite from './pages/ImgGraphicConverter/GraphicGenerator';
import ImageConverter from './pages/ImgGraphicConverter/ImageConvertor';
import ColorFeature from './pages/ImgGraphicConverter/Color';
import FormatConverterPage from "./pages/converter_feature/FormatConverterPage";
import randomnogeneratorpage from "./pages/RandomGeneratorPage/randomgeneratorpage";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <Router>
      <nav className="bg-black shadow-md p-4">
        <div className="max-w-7xl mx-auto flex space-x-4">
          <Link to="/" className="text-purple-600 hover:underline">Home</Link>
          <Link to="/graphic" className="text-purple-600 hover:underline">graphic Generator</Link>
          <Link to="/image" className="text-purple-600 hover:underline">Img converter</Link>
        </div>
      </nav>
      <Routes>
        {/* <Route path="/" element={<div className="text-center mt-10 text-xl">Welcome to the QR Code App</div>} /> */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/graphic" element={<GraphicSuite />} />
        <Route path="/image" element={<ImageConverter />} />
        <Route path="/color" element={<ColorFeature />} />
        <Route path="/api" element={<ApiDocsServicePage />} />
        <Route path="/code" element={<CodeFormatter />} />
        
        <Route path="/random" element={<randomnogeneratorpage />} />
        {/* <Route path="/json" element={<JsonFormatter/>}/>
        <Route path="/format" element={<FormatterApp/>}/>
        <Route path="/format" element={<FormatConverterPage />} /> */}
        <Route path="/format" element={<FormatConverterPage />} />

      </Routes>
    </Router>
  );
}

export default App;