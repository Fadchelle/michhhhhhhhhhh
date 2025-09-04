import React, { useState, useEffect } from 'react';
import { Play, Info, ChevronLeft, ChevronRight, Star, Plus, ThumbsUp } from 'lucide-react';
import { 
  categories, 
  getTrendingContent, 
  getFeaturedRotation,
  getCategoriesWithValidEpisodes,
  getSeriesValidEpisodeCount,
  getEpisodeStatistics,
  type Category, 
  type Series, 
  type Episode 
} from '../data/content';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HomePageProps {
  onSeriesSelect: (categoryId: string, seriesId: string) => void;
  onEpisodePlay: (categoryId: string, seriesId: string, episodeId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onSeriesSelect, onEpisodePlay }) => {
  const [trendingContent, setTrendingContent] = useState(getTrendingContent());
  const [loading, setLoading] = useState(true);
  const [rotationCount, setRotationCount] = useState(0);

  // Use categories with valid episodes or fallback to all categories
  const displayCategories = getCategoriesWithValidEpisodes().filter(
    category => category.series.some(series => series.episodes.length > 0)
  );
  
  const categoriesToShow = displayCategories.length > 0 ? displayCategories : categories;
  
  // Get episode statistics untuk monitoring
  const episodeStats = getEpisodeStatistics();

  useEffect(() => {
    // Debug info (remove in production)
    console.log('📊 Episode Statistics:', episodeStats);
    
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 1500);
    
    // Enhanced rotation with variable timing for more dynamic experience
    const createRotationInterval = () => {
      const getVariableInterval = () => {
        // Vary interval between 7-15 seconds for more natural feel
        const baseInterval = 8000; // 8 seconds base
        const variance = Math.random() * 6000; // +0 to +6 seconds
        return baseInterval + variance;
      };
      
      const rotateContent = () => {
        const newContent = getTrendingContent();
        setTrendingContent(newContent);
        setRotationCount(prev => prev + 1);
        
        // Schedule next rotation with variable timing
        setTimeout(rotateContent, getVariableInterval());
      };
      
      // Start first rotation after initial delay
      const initialDelay = 12000; // 12 seconds initial delay
      setTimeout(rotateContent, initialDelay);
    };
    
    createRotationInterval();

    return () => {
      clearTimeout(timer);
    };
  }, [episodeStats.validEpisodes]);

  // Additional effect for content refresh based on rotation count
  useEffect(() => {
    if (rotationCount > 0 && rotationCount % 5 === 0) {
      // Every 5 rotations, add a small visual feedback
      console.log(`🔄 Hero rotated ${rotationCount} times - showing variety!`);
    }
  }, [rotationCount]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-[#e50914] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-white">Memuat konten...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-20 pb-20 md:pb-8">
      {/* Hero Section */}
      <section className="relative h-[75vh] md:h-[85vh] overflow-hidden">
        {/* Background Video/Image */}
        <div className="absolute inset-0">
          <ImageWithFallback
            src={trendingContent.series.heroImage}
            alt={trendingContent.series.title}
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center px-4 md:px-8">
          <div className="max-w-3xl space-y-6">
            <div className="flex items-center space-x-3 flex-wrap">
              <span className="text-sm text-[#e50914] font-bold uppercase tracking-wider bg-[#e50914]/10 px-3 py-1 rounded">
                MichieHots Original
              </span>
              <span className="text-sm bg-white/10 backdrop-blur-sm text-white px-3 py-1 rounded border border-white/20 font-medium">
                {trendingContent.episode.title}
              </span>
              {trendingContent.series.mature && (
                <span className="text-xs bg-yellow-600 text-white px-2 py-1 rounded font-medium">
                  18+
                </span>
              )}
              {rotationCount > 0 && (
                <span className="text-xs bg-green-500/20 border border-green-400/30 text-green-300 px-2 py-1 rounded font-medium animate-pulse">
                  ✨ Auto-Pick #{rotationCount}
                </span>
              )}
            </div>
            
            <h1 className="text-4xl md:text-7xl font-black text-white leading-tight">
              {trendingContent.series.title}
            </h1>
            
            <div className="flex items-center space-x-4 text-sm flex-wrap">
              <div className="flex items-center space-x-1">
                <Star className="text-yellow-400 fill-current" size={16} />
                <span className="text-white font-medium">{trendingContent.series.rating}</span>
              </div>
              <span className="text-gray-300">{trendingContent.series.year}</span>
              <span className="bg-gray-700 text-white px-2 py-1 rounded text-xs font-medium">
                {trendingContent.series.quality}
              </span>
              <span className="text-gray-300 text-xs">
                {trendingContent.episode.duration}
              </span>
              <div className="flex space-x-2">
                {trendingContent.series.genre.slice(0, 2).map((genre) => (
                  <span key={genre} className="text-gray-300 text-xs">
                    {genre}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="space-y-3">
              <p className="text-lg md:text-xl text-gray-200 max-w-2xl leading-relaxed">
                {trendingContent.series.description}
              </p>
              <p className="text-gray-300 max-w-2xl leading-relaxed">
                <span className="font-medium text-white">{trendingContent.episode.title}:</span> {trendingContent.episode.description}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => onEpisodePlay(
                  trendingContent.category.id,
                  trendingContent.series.id,
                  trendingContent.episode.id
                )}
                className="flex items-center justify-center space-x-3 bg-white text-black px-6 sm:px-8 py-3 sm:py-4 rounded-md font-bold text-base sm:text-lg hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <Play size={20} className="sm:hidden" fill="currentColor" />
                <Play size={24} className="hidden sm:block" fill="currentColor" />
                <div className="flex flex-col items-start">
                  <span>Mulai Menonton</span>
                  <span className="text-xs sm:text-sm font-normal text-gray-600">{trendingContent.episode.title}</span>
                </div>
              </button>
              <button
                onClick={() => onSeriesSelect(trendingContent.category.id, trendingContent.series.id)}
                className="flex items-center justify-center space-x-3 bg-gray-600/80 backdrop-blur-sm text-white px-8 py-4 rounded-md font-bold text-lg hover:bg-gray-600 transition-all duration-300 border border-gray-500"
              >
                <Info size={24} />
                <span>Info Selengkapnya</span>
              </button>
              <button className="flex items-center justify-center bg-transparent border-2 border-white/30 text-white p-4 rounded-full hover:border-white hover:bg-white/10 transition-all duration-300">
                <Plus size={24} />
              </button>
              <button className="flex items-center justify-center bg-transparent border-2 border-white/30 text-white p-4 rounded-full hover:border-white hover:bg-white/10 transition-all duration-300">
                <ThumbsUp size={24} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Content Categories */}
      <section className="px-4 md:px-8 space-y-12 pb-8">
        {/* Statistics Info (dev mode) */}
        {episodeStats.validEpisodes > 0 && (
          <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4 mb-8">
            <p className="text-green-400 text-sm">
              ✅ {episodeStats.validEpisodes}/{episodeStats.totalEpisodes} episode dengan video valid 
              ({episodeStats.validPercentage}%)
            </p>
          </div>
        )}
        
        {categoriesToShow.map((category) => (
          <CategoryRow
            key={category.id}
            category={category}
            onSeriesSelect={onSeriesSelect}
          />
        ))}
      </section>
    </div>
  );
};

interface CategoryRowProps {
  category: Category;
  onSeriesSelect: (categoryId: string, seriesId: string) => void;
}

const CategoryRow: React.FC<CategoryRowProps> = ({ category, onSeriesSelect }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    
    // Responsive scroll amount based on larger card sizes
    const isMobile = window.innerWidth < 640;
    const isTablet = window.innerWidth < 1024;
    const isDesktop = window.innerWidth < 1536;
    const scrollAmount = isMobile ? 320 : isTablet ? 420 : isDesktop ? 520 : 580;
    
    const newPosition = direction === 'left' 
      ? Math.max(0, scrollPosition - scrollAmount)
      : scrollPosition + scrollAmount;
    
    scrollContainerRef.current.scrollTo({
      left: newPosition,
      behavior: 'smooth'
    });
    setScrollPosition(newPosition);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl md:text-3xl font-black text-white">
          {category.name}
        </h2>
        <span className="text-gray-400 hidden lg:block max-w-md text-right">
          {category.description}
        </span>
      </div>
      
      <div className="relative group">
        {/* Scroll Buttons */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-black/80 backdrop-blur-sm text-white p-2 sm:p-3 rounded-r-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black"
        >
          <ChevronLeft size={24} className="sm:hidden" />
          <ChevronLeft size={28} className="hidden sm:block" />
        </button>
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-black/80 backdrop-blur-sm text-white p-2 sm:p-3 rounded-l-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black"
        >
          <ChevronRight size={24} className="sm:hidden" />
          <ChevronRight size={28} className="hidden sm:block" />
        </button>

        {/* Content Grid */}
        <div
          ref={scrollContainerRef}
          className="flex space-x-4 sm:space-x-5 md:space-x-6 lg:space-x-7 xl:space-x-8 overflow-x-auto scrollbar-hide pb-6 sm:pb-7 md:pb-8"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {category.series.map((series) => {
            const validEpisodeCount = getSeriesValidEpisodeCount(series);
            const totalEpisodeCount = series.episodes.length;
            
            return (
            <div
              key={series.id}
              onClick={() => onSeriesSelect(category.id, series.id)}
              className="flex-none w-72 sm:w-80 md:w-96 lg:w-[420px] xl:w-[480px] 2xl:w-[520px] cursor-pointer group/card"
            >
              <div className="relative overflow-hidden rounded-lg md:rounded-xl transition-all duration-500 group-hover/card:scale-105 group-hover/card:z-10 shadow-xl group-hover/card:shadow-2xl">
                <ImageWithFallback
                  src={series.thumbnail}
                  alt={series.title}
                  className="w-full h-40 sm:h-48 md:h-56 lg:h-64 xl:h-72 2xl:h-80 object-cover"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-all duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-5 lg:p-6">
                    <div className="flex items-center space-x-2 sm:space-x-3 mb-2 sm:mb-3">
                      <Star className="text-yellow-400 fill-current" size={14} />
                      <span className="text-white font-bold text-sm sm:text-base">{series.rating}</span>
                      <span className="text-gray-300 text-xs sm:text-sm">{series.year}</span>
                      <span className="bg-[#e50914] text-white px-2 py-1 sm:px-3 sm:py-1.5 rounded-full font-bold text-xs sm:text-sm">
                        {series.quality}
                      </span>
                    </div>
                    <div className="flex space-x-1 sm:space-x-2 mb-2 sm:mb-3 flex-wrap">
                      {series.genre.slice(0, 2).map((genre) => (
                        <span key={genre} className="bg-gray-800/80 text-white px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs sm:text-sm">
                          {genre}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-all duration-300">
                  <div className="bg-black/60 backdrop-blur-sm rounded-full p-3 sm:p-4 md:p-5 border-2 border-white/50 hover:border-white hover:bg-black/80 transition-all duration-300">
                    <Play size={24} className="text-white ml-1 sm:hidden" fill="currentColor" />
                    <Play size={28} className="text-white ml-1 hidden sm:block md:hidden" fill="currentColor" />
                    <Play size={32} className="text-white ml-1 hidden md:block" fill="currentColor" />
                  </div>
                </div>

                {/* Episode Count Badge */}
                <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-[#e50914]/90 backdrop-blur-sm text-white px-2 py-1 sm:px-3 sm:py-1.5 rounded-md sm:rounded-lg font-bold text-xs sm:text-sm">
                  {validEpisodeCount > 0 ? (
                    <span>{validEpisodeCount} Episode{validEpisodeCount > 1 ? 's' : ''}</span>
                  ) : (
                    <span className="text-yellow-200">{totalEpisodeCount} Coming Soon</span>
                  )}
                </div>

                {/* Mature Content Badge */}
                {series.mature && (
                  <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-yellow-600 text-white px-2 py-1 sm:px-3 sm:py-1.5 rounded-md sm:rounded-lg font-bold text-xs sm:text-sm">
                    18+
                  </div>
                )}
              </div>
              
              <div className="mt-3 sm:mt-4 space-y-1 sm:space-y-2">
                <div className="flex items-start justify-between">
                  <h3 className="text-white font-bold text-base sm:text-lg lg:text-xl truncate group-hover/card:text-[#e50914] transition-colors flex-1 pr-2">
                    {series.title}
                  </h3>
                  {validEpisodeCount > 0 && (
                    <div className="bg-green-600/20 border border-green-500/40 text-green-400 px-2 py-1 rounded text-xs font-medium">
                      ✓ Ready
                    </div>
                  )}
                </div>
                <p className="text-gray-400 text-sm sm:text-base line-clamp-2 leading-relaxed">
                  {series.description}
                </p>
                {validEpisodeCount > 0 && (
                  <p className="text-green-400 text-xs">
                    {validEpisodeCount}/{totalEpisodeCount} episode tersedia untuk streaming
                  </p>
                )}
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};