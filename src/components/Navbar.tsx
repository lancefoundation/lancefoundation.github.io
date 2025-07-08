
import React, { useState } from 'react';
import { Menu, X, Heart } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Programs', path: '/programs' },
    { name: 'Projects', path: '/projects' },
    { name: 'Impact', path: '/impact' },
    { name: 'Leadership', path: '/leadership' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Careers', path: '/careers' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white/95 backdrop-blur-sm shadow-lg fixed w-full top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Improved Logo with better spacing */}
          <Link to="/" className="flex items-center space-x-4 group">
            <div className="relative flex-shrink-0">
              <img 
                src="/lovable-uploads/aec71801-e168-4793-8f77-73fefcc24598.png" 
                alt="The Lance Foundation" 
                className="h-14 w-auto transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute -top-1 -right-1 h-3 w-3 bg-gradient-to-r from-teal-500 to-green-500 rounded-full animate-pulse"></div>
            </div>
            <div className="flex flex-col min-w-0">
              <div className="text-xl font-bold bg-gradient-to-r from-teal-600 to-green-600 bg-clip-text text-transparent whitespace-nowrap">
                The Lance Foundation
              </div>
              <div className="text-xs text-gray-500 font-medium hidden sm:block">
                Service to Humanity is Service to God
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <Link
                key={item.name}
                to={item.path}
                className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                  isActive(item.path)
                    ? 'text-white bg-gradient-to-r from-teal-600 to-green-600 shadow-lg'
                    : 'text-gray-700 hover:text-teal-600 hover:bg-gradient-to-r hover:from-teal-50 hover:to-green-50'
                }`}
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                {item.name}
                {isActive(item.path) && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-yellow-400 rounded-full animate-bounce"></div>
                )}
              </Link>
            ))}
            
            {/* Donate Button */}
            <Button asChild className="ml-4 bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              <Link to="/donate" className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                Donate
              </Link>
            </Button>
            
            {/* Login Button */}
            <Button asChild variant="outline" className="ml-2">
              <Link to="/auth" className="flex items-center gap-2">
                Login
              </Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-teal-600 focus:outline-none focus:text-teal-600 p-2 rounded-lg hover:bg-teal-50 transition-all duration-300"
            >
              {isOpen ? (
                <X className="h-6 w-6 transform rotate-180 transition-transform duration-300" />
              ) : (
                <Menu className="h-6 w-6 transform transition-transform duration-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden animate-fade-in">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/95 backdrop-blur-sm border-t border-gray-100 rounded-b-2xl shadow-xl">
              {navItems.map((item, index) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 transform hover:scale-105 ${
                    isActive(item.path)
                      ? 'text-white bg-gradient-to-r from-teal-600 to-green-600 shadow-lg'
                      : 'text-gray-700 hover:text-teal-600 hover:bg-gradient-to-r hover:from-teal-50 hover:to-green-50'
                  }`}
                  onClick={() => setIsOpen(false)}
                  style={{
                    animationDelay: `${index * 50}ms`
                  }}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4">
                <Button asChild className="w-full bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  <Link to="/donate" onClick={() => setIsOpen(false)} className="flex items-center justify-center gap-2">
                    <Heart className="h-4 w-4" />
                    Donate Now
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full mt-2">
                  <Link to="/auth" onClick={() => setIsOpen(false)} className="flex items-center justify-center gap-2">
                    Login
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
