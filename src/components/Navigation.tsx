import React from 'react';
import { Search, User, Home, TrendingUp, Clock } from 'lucide-react';

interface NavigationProps {
  currentPage: 'home' | 'trending' | 'latest';
  onNavigate: (page: 'home' | 'trending' | 'latest') => void;
  onSearch: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentPage, onNavigate, onSearch }) => {
  return (
    <>
      {/* Desktop Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-lg border-b border-gray-800/50">
        <div className="flex items-center justify-between px-4 md:px-8 py-4">
          {/* Logo */}
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl md:text-3xl font-black text-[#e50914] tracking-tight">
              MichieHots
            </h1>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <button
                onClick={() => onNavigate('home')}
                className={`font-medium transition-all duration-300 relative group ${
                  currentPage === 'home' 
                    ? 'text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Beranda
                {currentPage === 'home' && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#e50914] rounded-full"></div>
                )}
                <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#e50914] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </button>
              <button
                onClick={() => onNavigate('trending')}
                className={`font-medium transition-all duration-300 relative group ${
                  currentPage === 'trending' 
                    ? 'text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Trending
                {currentPage === 'trending' && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#e50914] rounded-full"></div>
                )}
                <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#e50914] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </button>
              <button
                onClick={() => onNavigate('latest')}
                className={`font-medium transition-all duration-300 relative group ${
                  currentPage === 'latest' 
                    ? 'text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Terbaru
                {currentPage === 'latest' && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#e50914] rounded-full"></div>
                )}
                <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#e50914] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </button>

            </nav>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onSearch}
              className="text-white hover:text-[#e50914] transition-colors duration-300 p-2 hover:bg-white/10 rounded-full"
            >
              <Search size={20} />
            </button>
            <div className="w-8 h-8 bg-gradient-to-r from-[#e50914] to-red-700 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-300 shadow-lg">
              <User size={16} className="text-white" />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-lg border-t border-gray-800/50 z-50">
        <div className="flex items-center justify-around py-3">
          <button
            onClick={() => onNavigate('home')}
            className={`flex flex-col items-center py-2 px-4 transition-all duration-300 rounded-lg ${
              currentPage === 'home' 
                ? 'text-[#e50914] bg-[#e50914]/10' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Home size={20} />
            <span className="text-xs mt-1 font-medium">Beranda</span>
          </button>
          <button
            onClick={() => onNavigate('trending')}
            className={`flex flex-col items-center py-2 px-4 transition-all duration-300 rounded-lg ${
              currentPage === 'trending' 
                ? 'text-[#e50914] bg-[#e50914]/10' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <TrendingUp size={20} />
            <span className="text-xs mt-1 font-medium">Trending</span>
          </button>
          <button
            onClick={() => onNavigate('latest')}
            className={`flex flex-col items-center py-2 px-4 transition-all duration-300 rounded-lg ${
              currentPage === 'latest' 
                ? 'text-[#e50914] bg-[#e50914]/10' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Clock size={20} />
            <span className="text-xs mt-1 font-medium">Terbaru</span>
          </button>

        </div>
      </nav>
    </>
  );
};