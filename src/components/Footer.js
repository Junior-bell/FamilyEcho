import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-accent-gray text-white">
      <div className="max-w-7xl mx-auto section-padding">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Heart className="h-6 w-6 text-primary-gold" />
              <h3 className="text-xl font-lora font-bold">Family Echo</h3>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              A digital archive to celebrate and preserve family memories, profiles, and voices. 
              Make your family alive online with interactive, emotional, and accessible content.
            </p>
            <div className="flex space-x-4">
              <button
                className="text-gray-300 hover:text-primary-gold transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </button>
              <button
                className="text-gray-300 hover:text-primary-gold transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </button>
              <button
                className="text-gray-300 hover:text-primary-gold transition-colors duration-300"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-lora font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-primary-gold transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/profiles" className="text-gray-300 hover:text-primary-gold transition-colors duration-300">
                  Family Profiles
                </Link>
              </li>
              <li>
                <Link to="/memories" className="text-gray-300 hover:text-primary-gold transition-colors duration-300">
                  Memories
                </Link>
              </li>
              <li>
                <Link to="/family-tree" className="text-gray-300 hover:text-primary-gold transition-colors duration-300">
                  Family Tree
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-primary-gold transition-colors duration-300">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-lg font-lora font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-primary-gold" />
                <a
                  href="mailto:family@familyecho.com"
                  className="text-gray-300 hover:text-primary-gold transition-colors duration-300"
                >
                  family@familyecho.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-primary-gold" />
                <a
                  href="tel:+1-555-123-4567"
                  className="text-gray-300 hover:text-primary-gold transition-colors duration-300"
                >
                  (555) 123-4567
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-primary-gold mt-1" />
                <span className="text-gray-300">
                  123 Family Street<br />
                  Memory Lane, ML 12345
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-600 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm">
              © {currentYear} Family Echo. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <button
                className="text-gray-300 hover:text-primary-gold transition-colors duration-300 text-sm"
              >
                Privacy Policy
              </button>
              <button
                className="text-gray-300 hover:text-primary-gold transition-colors duration-300 text-sm"
              >
                Terms of Service
              </button>
              <button
                className="text-gray-300 hover:text-primary-gold transition-colors duration-300 text-sm"
              >
                Accessibility
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Accessibility Note */}
      <div className="bg-gray-800 py-2">
        <div className="max-w-7xl mx-auto container-padding">
          <p className="text-xs text-gray-400 text-center">
            This website is designed with accessibility in mind. For the best experience, 
            please ensure JavaScript is enabled and consider using a modern web browser.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 