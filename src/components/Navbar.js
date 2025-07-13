import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Heart, Search } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/profiles', label: 'Profiles' },
    { path: '/memories', label: 'Memories' },
    { path: '/family-tree', label: 'Family Tree' },
    { path: '/contact', label: 'Contact' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <Heart className="h-8 w-8 text-primary-blue group-hover:text-primary-gold transition-colors duration-300" />
              <motion.div
                className="absolute -top-1 -right-1 h-3 w-3 bg-primary-gold rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <div>
              <h1 className="text-xl font-lora font-bold text-accent-gray group-hover:text-primary-blue transition-colors duration-300">
                Family Echo
              </h1>
              <p className="text-xs text-accent-gray opacity-75">Preserving Memories</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-accent-gray" />
              <input
                type="text"
                placeholder="Search family members..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent w-64"
              />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-accent-gray hover:text-primary-blue transition-colors duration-300"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-gray-200"
          >
            <div className="px-4 py-4 space-y-4">
              {/* Mobile Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-accent-gray" />
                <input
                  type="text"
                  placeholder="Search family members..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                />
              </div>

              {/* Mobile Navigation Links */}
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block py-2 px-4 rounded-lg transition-colors duration-300 ${
                    isActive(item.path)
                      ? 'bg-primary-blue text-white'
                      : 'text-accent-gray hover:bg-gray-100'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Breadcrumbs */}
      {location.pathname !== '/' && (
        <div className="bg-gray-50 border-t border-gray-200">
          <div className="max-w-7xl mx-auto container-padding py-2">
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2">
                <li>
                  <Link to="/" className="text-primary-blue hover:text-blue-600 transition-colors duration-300">
                    Home
                  </Link>
                </li>
                {location.pathname.split('/').filter(Boolean).map((segment, index, array) => (
                  <li key={segment} className="flex items-center">
                    <span className="text-accent-gray mx-2">/</span>
                    <span className="text-accent-gray capitalize">
                      {segment === 'profiles' ? 'Profiles' : 
                       segment === 'family-tree' ? 'Family Tree' : 
                       segment}
                    </span>
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 