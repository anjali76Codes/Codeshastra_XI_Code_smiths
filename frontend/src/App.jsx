import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Components
import Navbar from './components/login/Navbar';

// Graphic/Image feature pages
import GraphicSuite from './pages/ImgGraphicConverter/GraphicGenerator';
import ImageConverter from './pages/ImgGraphicConverter/ImageConvertor';
import ColorFeature from './pages/ImgGraphicConverter/Color';
import ChatWithAI from './components/ImgGraphicConverter/ChatWithAI';

// Format Converter
import FormatConverterPage from './pages/Format and Convert/FormatConverterPage';

// Random Generator
import RandomNoGeneratorPage from './pages/RandomGeneratorPage/randomgeneratorpage';

// Validator features
import FormatterApp from './components/validator_feature/FormatterApp';
import CodeFormatter from './components/validator_feature/CodeFormatter';

// API Docs
import ApiDocsServicePage from './pages/api_feature/ApiDocsServicePage';

// Auth and Payment
import Signup from './components/login/Signup';
import Signin from './components/login/Signin';
import Home from './components/login/Home';
import SubscriptionPage from './components/login/SubscriptionPage';
import PaymentPage from './components/login/PaymentPage';

// Others
import LandingPage from './pages/LandingPage';
import PasswordGenerator from './pages/password_generator/PasswordGenerator';
import { Terminal } from 'lucide-react';
import EmbeddedWebsite from './EmbeddedWebsite';
import MockDataGenerator from './components/sql_feature/MockDataGenerator';
import QueryMaker from './components/sql_feature/QueryMaker';
import CommunityHomePage from './pages/community_feature/CommunityHomePage';
import PostForm from './components/community_feature/PostForm';

function App() {
  return (
    <Router>
      {/* Optional: Use your own Navbar OR use this temporary nav for development */}
      <Navbar />
      {/* 
      <nav className="bg-black shadow-md p-4">
        <div className="max-w-7xl mx-auto flex space-x-4">
          <Link to="/" className="text-purple-600 hover:underline">Home</Link>
          <Link to="/graphic" className="text-purple-600 hover:underline">Graphic Generator</Link>
          <Link to="/image" className="text-purple-600 hover:underline">Image Converter</Link>
          <Link to="/color" className="text-purple-600 hover:underline">Color Feature</Link>
          <Link to="/format" className="text-purple-600 hover:underline">Format Converter</Link>
          <Link to="/random" className="text-purple-600 hover:underline">Random Generator</Link>
          <Link to="/chat" className="text-purple-600 hover:underline">Chat with AI</Link>
          <Link to="/api" className="text-purple-600 hover:underline">API Docs</Link>
          <Link to="/signin" className="text-purple-600 hover:underline">Sign In</Link>
          <Link to="/signup" className="text-purple-600 hover:underline">Sign Up</Link>
          <Link to="/subscribe" className="text-purple-600 hover:underline">Subscribe</Link>
          <Link to="/payment" className="text-purple-600 hover:underline">Payment</Link>
        </div>
      </nav>
      */}

      <Routes>
        {/* Landing & Auth */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/home" element={<Home />} />
        <Route path="/subscribe" element={<SubscriptionPage />} />
        <Route path="/payment" element={<PaymentPage />} />

        {/* Graphic/Image Features */}
        <Route path="/graphic" element={<GraphicSuite />} />
        <Route path="/image" element={<ImageConverter />} />
        <Route path="/color" element={<ColorFeature />} />
        <Route path="/chat" element={<ChatWithAI />} />

        {/* Format & Code */}
        <Route path="/format" element={<FormatConverterPage />} />
        <Route path="/formatter" element={<FormatterApp />} />
        <Route path="/code" element={<CodeFormatter />} />

        {/* Utilities */}
        <Route path="/random" element={<RandomNoGeneratorPage />} />
        <Route path="/api" element={<ApiDocsServicePage />} />
        <Route path="/password" element={<PasswordGenerator />} />
        <Route path="/terminal" element={<Terminal />} />
        <Route path="/embed" element={<EmbeddedWebsite />} />
        <Route path="/mockdata" element={<MockDataGenerator />} />
        <Route path="/query" element={<QueryMaker />} />
        <Route path="/mockdata" element={<MockDataGenerator />} />
        <Route path="/community" element={<CommunityHomePage />} />
        <Route path="/community/post" element={<PostForm />} />
      </Routes>
    </Router>
  );
}

export default App;
