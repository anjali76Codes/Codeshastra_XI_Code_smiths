import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../Theme/themecontext';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [username, setUsername] = useState(null);
  const { isDarkMode, toggleDarkMode } = useTheme(); // Dark mode toggle
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const handleDropdown = (idx) => {
    setActiveDropdown(activeDropdown === idx ? null : idx);
  };

  useEffect(() => {
    document.body.classList.toggle('overflow-x-hidden', menuOpen);
  }, [menuOpen]);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    setUsername(storedUsername);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setUsername(null);
    navigate('/signin');
  };

  const navLinks = [
    { label: 'Home', path: '/' },
    {
      label: 'Graphic Tools',
      dropdown: [
        { label: 'Graphic Generator', path: '/graphic' },
        { label: 'Image Converter', path: '/image' },
        { label: 'Chat with AI', path: '/chat' },
      ],
    },
    {
      label: 'Format Tools',
      dropdown: [
        { label: 'Format Converter', path: '/format' },
      ],
    },
    {
      label: 'Services',
      dropdown: [
        { label: 'API Docs', path: '/api' },
        { label: 'Password Generator', path: '/password' },
      ],
    },
    {
      label: 'Simulations', // New section added here
      dropdown: [
        { label: 'Linux Terminal', path: '/terminal' },
        { label: 'SQL Playground', path: '/query' },
      ],
    },
    {
      label: 'Account',
      dropdown: username
        ? [
          { label: `👤 ${username}`, path: '/home' },
          { label: 'Logout', action: handleLogout },
        ]
        : [
          { label: 'Sign In', path: '/signin' },
          { label: 'Sign Up', path: '/signup' },
          { label: 'Subscription', path: '/subscribe' },
          { label: 'Payment', path: '/payment' },
        ],
    },
  ];
  

  return (
    <nav className="bg-black text-white shadow-lg sticky top-0 z-50 font-medium">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-purple-500 tracking-wide">
          ToolSuite
        </Link>

        {/* Mobile toggle */}
        <div className="lg:hidden">
          <button onClick={toggleMenu}>
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Desktop nav */}
        <div className="hidden lg:flex space-x-6 items-center" ref={dropdownRef}>
          {navLinks.map((nav, idx) =>
            nav.dropdown ? (
              <div key={idx} className="relative">
                <button
                  onClick={() => handleDropdown(idx)}
                  className="hover:text-purple-400 transition duration-300 flex items-center gap-1"
                >
                  {nav.label}
                  <span className="text-xs">{activeDropdown === idx ? '▴' : '▾'}</span>
                </button>
                {activeDropdown === idx && (
                  <div className={`absolute top-full mt-2 w-52 bg-white text-black rounded-3xl shadow-lg z-50`}>
                    {nav.dropdown.map((item, i) =>
                      item.action ? (
                        <button
                          key={i}
                          onClick={() => {
                            item.action();
                            setActiveDropdown(null);
                          }}
                          className="block w-full text-left px-4 py-2 text-sm hover:bg-purple-100 rounded-3xl transition"
                        >
                          {item.label}
                        </button>
                      ) : (
                        <Link
                          key={i}
                          to={item.path}
                          className="block px-4 py-2 text-sm hover:bg-purple-100 rounded-3xl transition"
                          onClick={() => setActiveDropdown(null)}
                        >
                          {item.label}
                        </Link>
                      )
                    )}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={idx}
                to={nav.path}
                className="hover:text-purple-400 transition duration-300"
              >
                {nav.label}
              </Link>
            )
          )}
        </div>

                {/* Theme Toggle */}
          <button
          onClick={toggleDarkMode}
          className="text-white hover:text-purple-400 transition lg:mr-4 flex-end"
          title="Toggle dark mode"
        >
          {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-black px-4 py-4 space-y-4 transition-all duration-500">
          {navLinks.map((nav, idx) =>
            nav.dropdown ? (
              <div key={idx}>
                <button
                  onClick={() => handleDropdown(idx)}
                  className="text-purple-400 font-semibold flex justify-between w-full"
                >
                  {nav.label}
                  <span className="text-xs">{activeDropdown === idx ? '▴' : '▾'}</span>
                </button>
                {activeDropdown === idx && (
                  <div className="pl-4 mt-2 space-y-2 transition-all duration-300">
                    {nav.dropdown.map((item, i) =>
                      item.action ? (
                        <button
                          key={i}
                          onClick={() => {
                            item.action();
                            setMenuOpen(false);
                          }}
                          className="block w-full text-left text-sm text-white hover:text-purple-300"
                        >
                          {item.label}
                        </button>
                      ) : (
                        <Link
                          key={i}
                          to={item.path}
                          className="block text-sm text-white hover:text-purple-300"
                          onClick={() => setMenuOpen(false)}
                        >
                          {item.label}
                        </Link>
                      )
                    )}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={idx}
                to={nav.path}
                className="block text-sm py-1 text-white hover:text-purple-300"
                onClick={() => setMenuOpen(false)}
              >
                {nav.label}
              </Link>
            )
          )}
        </div>
      )}

    </nav>
  );
}
