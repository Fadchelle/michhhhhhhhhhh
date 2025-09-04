import React, { useState, useEffect } from 'react';
import { Play, Clock, TrendingUp, Star } from 'lucide-react';
import { categories, getAllContent, getTrendingContent, isValidVideoUrl } from '../data/content';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ContentPageProps {
  onSeriesSelect: (categoryId: string, seriesId: string) => void;
  onEpisodePlay: (categoryId: string, seriesId: string, episodeId: string) => void;
}

export const TrendingPage: React.FC<ContentPageProps> = ({ onSeriesSelect, onEpisodePlay }) => {
  const [trendingItems, setTrendingItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Generate trending content from ALL episodes (including invalid ones)
    const trending = Array.from({ length: 20 }, () => {
      // Get random category
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];
      const randomSeries = randomCategory.series[0];
      const randomEpisode = randomSeries.episodes[Math.floor(Math.random() * randomSeries.episodes.length)];
      
      return {
        ...randomEpisode,
        seriesTitle: randomSeries.title,
        categoryName: randomCategory.name,
        categoryId: randomCategory.id,
        seriesId: randomSeries.id,
        seriesThumbnail: randomSeries.thumbnail,
        isValid: isValidVideoUrl(randomEpisode.videoUrl)
      };
    });

    setTrendingItems(trending);
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingScreen message="Memuat trending..." />;
  }

  return (
    <div className="min-h-screen bg-black pt-20 pb-20 md:pb-8">
      <div className="px-4 md:px-8">
        <div className="flex items-center space-x-2 mb-8">
          <TrendingUp className="text-[#e50914]" size={28} />
          <h1 className="text-3xl font-bold text-white">Trending Sekarang</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {trendingItems.map((item, index) => (
            <ContentCard
              key={`${item.categoryId}-${item.seriesId}-${item.id}-${index}`}
              item={item}
              rank={index + 1}
              onSeriesSelect={onSeriesSelect}
              onEpisodePlay={onEpisodePlay}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export const LatestPage: React.FC<ContentPageProps> = ({ onSeriesSelect, onEpisodePlay }) => {
  const [latestItems, setLatestItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get latest episodes from ALL episodes (including coming soon ones)
    const latest = categories.flatMap(category => {
      const series = category.series[0];
      // Get last 2 episodes from each series
      const recentEpisodes = series.episodes.slice(-2);
      return recentEpisodes.map(episode => ({
        ...episode,
        seriesTitle: series.title,
        categoryName: category.name,
        categoryId: category.id,
        seriesId: series.id,
        seriesThumbnail: series.thumbnail,
        isValid: isValidVideoUrl(episode.videoUrl)
      }));
    });

    // Sort by episode number (simulate latest)
    latest.sort(() => Math.random() - 0.5);
    setLatestItems(latest);
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingScreen message="Memuat konten terbaru..." />;
  }

  return (
    <div className="min-h-screen bg-black pt-20 pb-20 md:pb-8">
      <div className="px-4 md:px-8">
        <div className="flex items-center space-x-2 mb-8">
          <Clock className="text-[#e50914]" size={28} />
          <h1 className="text-3xl font-bold text-white">Konten Terbaru</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {latestItems.map((item, index) => (
            <ContentCard
              key={`${item.categoryId}-${item.seriesId}-${item.id}`}
              item={item}
              onSeriesSelect={onSeriesSelect}
              onEpisodePlay={onEpisodePlay}
              showNew={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
};



interface ContentCardProps {
  item: any;
  rank?: number;
  showNew?: boolean;
  onSeriesSelect: (categoryId: string, seriesId: string) => void;
  onEpisodePlay: (categoryId: string, seriesId: string, episodeId: string) => void;
}

const ContentCard: React.FC<ContentCardProps> = ({ 
  item, 
  rank, 
  showNew, 
  onSeriesSelect, 
  onEpisodePlay 
}) => {
  const isValid = item.isValid !== undefined ? item.isValid : isValidVideoUrl(item.videoUrl);
  
  return (
    <div className="group cursor-pointer">
      <div
        onClick={() => {
          if (isValid) {
            onEpisodePlay(item.categoryId, item.seriesId, item.id);
          } else {
            onSeriesSelect(item.categoryId, item.seriesId);
          }
        }}
        className={`relative overflow-hidden rounded-xl transition-all duration-500 shadow-lg ${
          isValid 
            ? 'group-hover:scale-110 group-hover:shadow-2xl' 
            : 'group-hover:scale-105 group-hover:shadow-xl'
        }`}
      >
        <ImageWithFallback
          src={item.thumbnail}
          alt={item.title}
          className="w-full h-72 md:h-80 object-cover"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>
        
        {rank && (
          <div className="absolute top-3 left-3 bg-[#e50914] text-white px-3 py-2 rounded-lg font-black text-lg shadow-lg">
            #{rank}
          </div>
        )}
        
        {showNew && !rank && (
          <div className="absolute top-3 right-3 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow-lg">
            Baru
          </div>
        )}

        {/* Status Badge */}
        {!rank && !showNew && (
          isValid ? (
            <div className="absolute top-3 right-3 bg-green-600/90 backdrop-blur-sm text-white text-xs px-2 py-1 rounded font-medium">
              ✓ Ready
            </div>
          ) : (
            <div className="absolute top-3 right-3 bg-yellow-600/90 backdrop-blur-sm text-white text-xs px-2 py-1 rounded font-medium">
              ⏳ Coming Soon
            </div>
          )
        )}

        {/* Play Button or Coming Soon */}
        {isValid ? (
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
              <div className="w-20 h-20 bg-[#e50914] rounded-full flex items-center justify-center shadow-2xl">
                <Play size={32} className="text-white ml-1" fill="currentColor" />
              </div>
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
            <div className="bg-gray-800/90 backdrop-blur-sm text-white px-4 py-2 rounded-lg border border-gray-600">
              <div className="text-sm font-medium">Coming Soon</div>
              <div className="text-xs text-gray-400 mt-1">Klik untuk lihat series</div>
            </div>
          </div>
        )}

        {/* Content Info */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className={`font-bold text-xl mb-2 transition-colors ${
            isValid 
              ? 'text-white group-hover:text-[#e50914]' 
              : 'text-gray-300'
          }`}>
            {item.title}
          </h3>
          <p className={`font-medium mb-1 ${
            isValid ? 'text-gray-200' : 'text-gray-400'
          }`}>{item.seriesTitle}</p>
          <div className="flex items-center justify-between">
            <p className="text-gray-400 text-sm">{item.categoryName}</p>
            {item.duration && (
              <span className="bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded">
                {isValid ? item.duration : 'Soon'}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};



const LoadingScreen: React.FC<{ message: string }> = ({ message }) => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-12 h-12 border-4 border-[#e50914] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-white">{message}</p>
      </div>
    </div>
  );
};