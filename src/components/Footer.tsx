
import React from 'react';
import { Heart, Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Youtube, ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      {/* Elegant background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-teal-600/20 to-green-600/20"></div>
        <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polygon fill="rgba(255,255,255,0.02)" points="0,0 100,0 100,20 0,40"/>
          <polygon fill="rgba(255,255,255,0.01)" points="0,40 100,20 100,60 0,80"/>
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top section with better spacing */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand - Enhanced */}
          <div className="space-y-6 lg:col-span-1">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="bg-gradient-to-r from-teal-500 to-green-500 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Heart className="h-7 w-7 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-green-400 bg-clip-text text-transparent">
                The Lance Foundation
              </span>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed max-w-sm">
              Building hope and changing lives through sustainable community development programs worldwide. Creating lasting impact for future generations.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 transition-all duration-300 hover:scale-110">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-pink-400 hover:bg-pink-500/10 transition-all duration-300 hover:scale-110">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 transition-all duration-300 hover:scale-110">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-300 hover:scale-110">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links - Enhanced */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white relative">
              Quick Links
              <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-teal-400 to-green-400 mt-2"></div>
            </h3>
            <ul className="space-y-3">
              {[
                { name: 'About Us', path: '/about' },
                { name: 'Our Projects', path: '/projects' },
                { name: 'Leadership', path: '/leadership' },
                { name: 'Contact', path: '/contact' }
              ].map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path} 
                    className="text-gray-300 hover:text-white transition-all duration-300 flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-teal-400 transition-all duration-300 mr-0 group-hover:mr-3"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs - Enhanced */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white relative">
              Our Programs
              <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-teal-400 to-green-400 mt-2"></div>
            </h3>
            <ul className="space-y-3">
              {[
                'Education & Skills',
                'Healthcare Access',
                'Clean Water & Sanitation',
                'Environmental Conservation',
                'Emergency Relief'
              ].map((program, index) => (
                <li key={index}>
                  <Link 
                    to="/programs" 
                    className="text-gray-300 hover:text-white transition-all duration-300 flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-green-400 transition-all duration-300 mr-0 group-hover:mr-3"></span>
                    {program}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info - Enhanced */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white relative">
              Get In Touch
              <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-teal-400 to-green-400 mt-2"></div>
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 bg-teal-500/10 rounded-lg flex items-center justify-center group-hover:bg-teal-500/20 transition-colors duration-300">
                  <MapPin className="h-5 w-5 text-teal-400" />
                </div>
                <div className="text-gray-300 text-sm leading-relaxed">
                  123 Hope Street<br />
                  New York, NY 10001<br />
                  United States
                </div>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center group-hover:bg-green-500/20 transition-colors duration-300">
                  <Phone className="h-5 w-5 text-green-400" />
                </div>
                <a href="tel:+1234567890" className="text-gray-300 hover:text-white transition-colors text-sm">
                  +1 (234) 567-8900
                </a>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center group-hover:bg-blue-500/20 transition-colors duration-300">
                  <Mail className="h-5 w-5 text-blue-400" />
                </div>
                <a href="mailto:info@thelancefoundation.org" className="text-gray-300 hover:text-white transition-colors text-sm">
                  info@thelancefoundation.org
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section with enhanced design */}
        <div className="border-t border-gray-700/50 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <p className="text-gray-400 text-sm">
                © 2024 The Lance Foundation. All rights reserved.
              </p>
              <div className="flex space-x-1 text-xs text-gray-500">
                <span>Reg. #12345678</span>
                <span>•</span>
                <span>EIN: 12-3456789</span>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex space-x-6">
                <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Terms of Service
                </Link>
              </div>
              <button
                onClick={scrollToTop}
                className="w-10 h-10 bg-gradient-to-r from-teal-500 to-green-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl"
                aria-label="Scroll to top"
              >
                <ArrowUp className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
