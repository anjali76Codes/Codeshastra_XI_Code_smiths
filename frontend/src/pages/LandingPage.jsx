import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  RocketIcon,
  ShieldCheckIcon,
  PaintbrushIcon,
  CodeIcon,
  NetworkIcon,
  LockIcon,
  MusicIcon,
  BarChartIcon,
  MessageCircleIcon
} from "lucide-react";

export default function LandingPage() {
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    AOS.init({ once: true, duration: 800 });
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    // Here you can implement search functionality, like filtering features.
    // Right now, it just updates the searchQuery state.
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d1117] to-[#161b22] text-white font-sans">
      <header className="w-full border-b border-gray-800 bg-[#0d1117]">
        <div className="container mx-auto px-6 py-6 flex justify-between items-center">
          {/* <h1 className="text-2xl font-extrabold tracking-tight">ToolBoxHub</h1>
          <nav className="space-x-8 text-sm font-medium text-gray-400">
            <a href="#features" className="hover:text-white transition">Features</a>
            <a href="#pricing" className="hover:text-white transition">Pricing</a>
            <a href="#get-started" className="hover:text-white transition">Get Started</a>
          </nav> */}
        </div>
      </header>

      <section className="text-center px-6 py-32" data-aos="fade-up">
        <h2 className="text-6xl font-extrabold leading-tight mb-6">
          All Your Everyday Tools,<br className="hidden md:block" /> One Unified Platform
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10">
          Boost your productivity with ToolBoxHub — a centralized, user-friendly hub for all your favorite web utilities.
        </p>

        {/* Search Bar - Positioned right above the "Get Started for Free" button */}
        <div className="max-w-lg mx-auto mb-8">
          <input
            type="text"
            placeholder="Search features..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full px-6 py-3 rounded-full bg-[#161b22] border border-gray-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <button
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold text-lg px-8 py-4 rounded-3xl shadow-md transition duration-200"
          id="get-started"
        >
          Get Started for Free
        </button>
      </section>

      {/* Core Features */}
      <section id="features" className="container mx-auto px-6 py-24">
        <h3 className="text-4xl font-bold text-center mb-16" data-aos="fade-up">Why ToolBoxHub?</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {[  
            { icon: <RocketIcon />, title: "Boosted Productivity", desc: "Access formatters, converters, and editors all in one tab.", color: "text-purple-400" },
            { icon: <ShieldCheckIcon />, title: "Secure & Scalable", desc: "Designed for personal & professional workflows.", color: "text-green-400" },
            { icon: <CodeIcon />, title: "Code & Text Formatters", desc: "JSON, XML, Markdown, HTML/CSS/JS — all beautified & validated.", color: "text-blue-400" },
            { icon: <PaintbrushIcon />, title: "Color & Image Tools", desc: "Pick colors, generate palettes, convert images, create QR/barcodes.", color: "text-pink-400" },
            { icon: <NetworkIcon />, title: "Networking Utilities", desc: "Ping, DNS/IP lookups, traceroutes, and more tools coming soon.", color: "text-teal-400" },
            { icon: <LockIcon />, title: "Security Suite", desc: "AES encryption, JWT decoder, password generator and more.", color: "text-red-400" },
          ].map((tool, i) => (
            <div
              key={i}
              className="bg-[#161b22] rounded-3xl p-6 shadow-lg hover:shadow-xl transition"
              data-aos="fade-up"
              data-aos-delay={i * 100}
            >
              <div className={`w-10 h-10 mb-4 ${tool.color}`}>{tool.icon}</div>
              <h4 className="text-xl font-semibold mb-2">{tool.title}</h4>
              <p className="text-gray-400">{tool.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Extended Tools */}
      <section className="container mx-auto px-6 py-24">
        <h3 className="text-4xl font-bold text-center mb-16" data-aos="fade-up">Extended Tools & Productivity Suite</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {[  
            { icon: <BarChartIcon />, title: "Analytics & SEO", desc: "Generate meta tags, sitemaps & run keyword analysis.", color: "text-yellow-400" },
            { icon: <MusicIcon />, title: "Audio & Video Tools", desc: "Trim, convert, and synthesize media content easily.", color: "text-indigo-400" },
            { icon: <MessageCircleIcon />, title: "User Requested Features", desc: "We build what you need. Send us your requests.", color: "text-orange-400" },
          ].map((tool, i) => (
            <div
              key={i}
              className="bg-[#161b22] rounded-3xl p-6 shadow-lg hover:shadow-xl transition"
              data-aos="fade-up"
              data-aos-delay={i * 150}
            >
              <div className={`w-10 h-10 mb-4 ${tool.color}`}>{tool.icon}</div>
              <h4 className="text-xl font-semibold mb-2">{tool.title}</h4>
              <p className="text-gray-400">{tool.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="bg-[#0d1117] px-6 py-24 text-center border-t border-gray-800">
        <h3 className="text-4xl font-bold mb-16" data-aos="fade-up">Simple Pricing</h3>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div
            className="bg-[#161b22] rounded-3xl p-10 shadow-lg hover:shadow-xl transition"
            data-aos="zoom-in"
          >
            <h4 className="text-2xl font-semibold mb-2">Free Tier</h4>
            <p className="text-gray-400 mb-4">No login required. Access essential tools freely.</p>
            <p className="text-5xl font-bold text-white">$0</p>
          </div>
          <div
            className="bg-purple-700 rounded-3xl p-10 shadow-lg hover:shadow-xl transition"
            data-aos="zoom-in"
            data-aos-delay="200"
          >
            <h4 className="text-2xl font-semibold mb-2">Pro Tier</h4>
            <p className="text-gray-100 mb-4">Unlock advanced tools, save settings, and get priority features.</p>
            <p className="text-5xl font-bold">$5<span className="text-xl">/mo</span></p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0d1117] text-gray-500 border-t border-gray-800 py-8 text-center text-sm">
        © {new Date().getFullYear()} ToolBoxHub. All rights reserved.
      </footer>
    </div>
  );
}
