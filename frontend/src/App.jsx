import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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
import PaymentStatus from './components/login/PaymentStatus';

// Other tools & pages
import LandingPage from './pages/LandingPage';
import PasswordGenerator from './pages/password_generator/PasswordGenerator';
import EmbeddedWebsite from './components/EmbeddedWebsite';
import Linuxterminal from './pages/LinuxTerminal';
import MockDataGenerator from './components/sql_feature/MockDataGenerator';
import QueryMaker from './components/sql_feature/QueryMaker';

// Community Features
import CommunityHomePage from './pages/community_feature/CommunityHomePage';
import PostForm from './components/community_feature/PostForm';

// AES Encryption Page
import EncryptPage from './pages/EncryptPage';

// Multiplayer Typing Test Pages
import RoomSelector from './pages/RoomSelector';
import TypingTestPage from './pages/TypingTest';

// SEO and Dashboard
import MainApp from './components/MainApp';
import FeaturePage from './pages/FeaturePage';

// Context for Payment Status
import { PaymentStatusProvider } from './components/login/PaymentStatusContext';
import { ThemeProvider } from './components/Theme/themecontext';

import './App.css';
import ColorPalette from './components/ColorPalette';

function App() {
  return (
    <PaymentStatusProvider> {/* Wrap the app with the payment provider */}
      <ThemeProvider> {/* Wrap the app with the theme provider */}
        <Router>
          <Navbar />
          <Routes>
            {/* Landing & Auth */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/home" element={<Home />} />
            <Route path="/subscribe" element={<SubscriptionPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/payment/status" element={<PaymentStatus />} /> {/* Updated PaymentStatus Route */}

            {/* Graphic/Image Features */}
            <Route path="/graphic" element={<GraphicSuite />} />
            <Route path="/image" element={<ImageConverter />} />
            <Route path="/color" element={<ColorFeature />} />
            <Route path="/chat" element={<ChatWithAI />} />

            {/* Format & Code Features */}
            <Route path="/format" element={<FormatConverterPage />} />
            <Route path="/formatter" element={<FormatterApp />} />
            <Route path="/code" element={<CodeFormatter />} />

            {/* Utility Tools */}
            <Route path="/random" element={<RandomNoGeneratorPage />} />
            <Route path="/api" element={<ApiDocsServicePage />} />
            <Route path="/password" element={<PasswordGenerator />} />
            <Route path="/terminal" element={<Linuxterminal />} />
            <Route path="/embed" element={<EmbeddedWebsite />} />
            <Route path="/encrypt" element={<EncryptPage />} />
            <Route path="/mockdata" element={<MockDataGenerator />} />
            <Route path="/query" element={<QueryMaker />} />

            {/* Community */}
            <Route path="/community" element={<CommunityHomePage />} />
            <Route path="/community/post" element={<PostForm />} />

            {/* SEO & Dashboard */}
            <Route path="/seo" element={<MainApp />} />
            <Route path="/dashboard" element={<FeaturePage />} />
          </Routes>
        </Router>

      </ThemeProvider>
    </PaymentStatusProvider>
  );
}

export default App;
