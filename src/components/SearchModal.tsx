import React, { useState, useEffect } from 'react';
import { Search, X, Play } from 'lucide-react';
import { getAllContent } from '../data/content';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEpisodePlay: (categoryId: string, seriesId: string, episodeId: string) => void;
  onSeriesSelect: (categoryId: string, seriesId: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onEpisodePlay,
  onSeriesSelect
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    const timer = setTimeout(() => {
      const allContent = getAllContent();
      const filtered = allContent.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.seriesTitle.toLowerCase().includes(query.toLowerCase()) ||
        item.categoryName.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered.slice(0, 20)); // Limit to 20 results
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-lg flex items-start justify-center pt-24 animate-in fade-in duration-300">
      <div className="w-full max-w-3xl mx-4">
        {/* Search Input */}
        <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-gray-800">
          <div className="flex items-center space-x-4">
            <Search size={24} className="text-[#e50914]" />
            <input
              type="text"
              placeholder="Cari series, episode, kategori..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none text-lg"
              autoFocus
            />
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Search Results */}
        <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl max-h-[60vh] overflow-y-auto border border-gray-800">
          {loading ? (
            <div className="p-12 text-center">
              <div className="w-10 h-10 border-3 border-[#e50914] border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="text-gray-300 mt-4 text-lg">Mencari konten...</p>
            </div>
          ) : results.length > 0 ? (
            <div className="p-4">
              {results.map((item) => (
                <div
                  key={`${item.categoryId}-${item.seriesId}-${item.id}`}
                  className="flex items-center space-x-4 p-4 rounded-xl hover:bg-gray-800/80 cursor-pointer transition-all duration-300 hover:scale-[1.02] group"
                  onClick={() => {
                    onEpisodePlay(item.categoryId, item.seriesId, item.id);
                    onClose();
                  }}
                >
                  <div className="relative">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-20 h-12 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                      <Play size={16} className="text-white" fill="currentColor" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-bold text-lg group-hover:text-[#e50914] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-400">
                      {item.seriesTitle} • <span className="text-gray-500">{item.categoryName}</span>
                    </p>
                  </div>
                  <div className="text-gray-400 text-sm bg-gray-800 px-3 py-1 rounded-full">
                    {item.duration}
                  </div>
                  <div className="p-2 rounded-full bg-[#e50914]/20 group-hover:bg-[#e50914] transition-colors duration-300">
                    <Play size={16} className="text-[#e50914] group-hover:text-white" fill="currentColor" />
                  </div>
                </div>
              ))}
            </div>
          ) : query ? (
            <div className="p-12 text-center">
              <Search size={48} className="text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">Tidak ada hasil untuk "<span className="text-white font-medium">{query}</span>"</p>
              <p className="text-gray-500 text-sm mt-2">Coba kata kunci lain atau periksa ejaan Anda</p>
            </div>
          ) : (
            <div className="p-12 text-center">
              <Search size={48} className="text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">Mulai ketik untuk mencari konten</p>
              <p className="text-gray-500 text-sm mt-2">Cari series, episode, atau kategori favorit Anda</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};