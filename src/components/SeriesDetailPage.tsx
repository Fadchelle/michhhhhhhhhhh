import React, { useState, useEffect } from 'react';
import { ArrowLeft, Play, Star, Calendar, Monitor, Plus, ThumbsUp } from 'lucide-react';
import { 
  categories, 
  getSeriesWithValidEpisodes,
  getSeriesValidEpisodeCount,
  isValidVideoUrl,
  type Series, 
  type Episode 
} from '../data/content';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface SeriesDetailPageProps {
  categoryId: string;
  seriesId: string;
  onBack: () => void;
  onEpisodePlay: (categoryId: string, seriesId: string, episodeId: string) => void;
}

export const SeriesDetailPage: React.FC<SeriesDetailPageProps> = ({
  categoryId,
  seriesId,
  onBack,
  onEpisodePlay
}) => {
  const [series, setSeries] = useState<Series | null>(null);
  const [validEpisodes, setValidEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Find the series
    const category = categories.find(cat => cat.id === categoryId);
    const foundSeries = category?.series.find(s => s.id === seriesId);
    
    if (foundSeries) {
      setSeries(foundSeries);
      // Show ALL episodes, not just valid ones
      setValidEpisodes(foundSeries.episodes);
    }
    
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, [categoryId, seriesId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-[#e50914] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-white">Memuat series...</p>
        </div>
      </div>
    );
  }

  if (!series) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-white text-xl">Series tidak ditemukan</p>
          <button
            onClick={onBack}
            className="bg-[#e50914] text-white px-6 py-2 rounded hover:bg-red-700 transition-colors"
          >
            Kembali
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-90 backdrop-blur-sm">
        <div className="flex items-center justify-between px-4 md:px-8 py-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="text-white hover:text-gray-300 transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-xl md:text-2xl font-bold text-[#e50914]">
              MichieHots
            </h1>
          </div>
          <button className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm">U</span>
          </button>
        </div>
      </header>

      <div className="pt-20">
        {/* Hero Section */}
        <section className="relative h-[65vh] md:h-[75vh] overflow-hidden">
          <div className="absolute inset-0">
            <ImageWithFallback
              src={series.heroImage}
              alt={series.title}
              className="w-full h-full object-cover scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/20"></div>
          </div>

          <div className="relative z-10 h-full flex items-end px-4 md:px-8 pb-12">
            <div className="space-y-6 max-w-3xl">
              <div className="flex items-center space-x-3">
                <span className="text-sm text-[#e50914] font-bold uppercase tracking-wider bg-[#e50914]/10 px-3 py-1 rounded">
                  MichieHots Original
                </span>
                {series.mature && (
                  <span className="text-xs bg-yellow-600 text-white px-2 py-1 rounded font-medium">
                    18+
                  </span>
                )}
              </div>

              <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
                {series.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center space-x-1">
                  <Star className="text-yellow-400 fill-current" size={16} />
                  <span className="text-white font-medium">{series.rating}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar size={16} className="text-gray-400" />
                  <span className="text-gray-300">{series.year}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Monitor size={16} className="text-gray-400" />
                  <span className="bg-gray-700 text-white px-2 py-1 rounded text-xs font-medium">
                    {series.quality}
                  </span>
                </div>
                <span className="text-gray-300">
                  {validEpisodes.length} {validEpisodes.length > 0 ? 'Episode' : 'Coming Soon'}
                </span>
                <div className="flex space-x-2">
                  {series.genre.map((genre) => (
                    <span key={genre} className="bg-gray-800/80 text-white px-3 py-1 rounded-full text-xs">
                      {genre}
                    </span>
                  ))}
                </div>
              </div>

              <p className="text-lg text-gray-200 max-w-2xl leading-relaxed">
                {series.description}
              </p>

              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <button
                  onClick={() => {
                    const firstValidEpisode = validEpisodes.find(ep => isValidVideoUrl(ep.videoUrl));
                    if (firstValidEpisode) {
                      onEpisodePlay(categoryId, seriesId, firstValidEpisode.id);
                    }
                  }}
                  disabled={!validEpisodes.some(ep => isValidVideoUrl(ep.videoUrl))}
                  className={`flex items-center justify-center space-x-3 px-8 py-4 rounded-md font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg ${
                    validEpisodes.some(ep => isValidVideoUrl(ep.videoUrl))
                      ? 'bg-[#e50914] text-white hover:bg-red-700' 
                      : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <Play size={24} fill="currentColor" />
                  <span>{validEpisodes.some(ep => isValidVideoUrl(ep.videoUrl)) ? 'Mulai Menonton' : 'Coming Soon'}</span>
                </button>
                <button className="flex items-center justify-center space-x-3 bg-gray-600/80 backdrop-blur-sm text-white px-8 py-4 rounded-md font-bold text-lg hover:bg-gray-600 transition-all duration-300 border border-gray-500">
                  <Plus size={24} />
                  <span>Tambah ke Daftar</span>
                </button>
                <button className="flex items-center justify-center bg-transparent border-2 border-white/30 text-white p-4 rounded-full hover:border-white hover:bg-white/10 transition-all duration-300">
                  <ThumbsUp size={24} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Episodes Grid */}
        <section className="px-4 md:px-8 py-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-medium text-white">
              Episode ({validEpisodes.length})
            </h2>
            {getSeriesValidEpisodeCount(series) > 0 && (
              <div className="bg-green-600/20 border border-green-500/40 text-green-400 px-3 py-1.5 rounded-lg text-sm font-medium">
                ✓ {getSeriesValidEpisodeCount(series)}/{series.episodes.length} Ready to Stream
              </div>
            )}
          </div>
          
          {validEpisodes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {validEpisodes.map((episode, index) => (
                <EpisodeCard
                  key={episode.id}
                  episode={episode}
                  episodeNumber={index + 1}
                  isValid={isValidVideoUrl(episode.videoUrl)}
                  onPlay={() => onEpisodePlay(categoryId, seriesId, episode.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 text-lg mb-4">
                Episode segera hadir...
              </div>
              <div className="text-gray-500 text-sm">
                {series.episodes.length} episode dalam tahap produksi
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

interface EpisodeCardProps {
  episode: Episode;
  episodeNumber: number;
  isValid: boolean;
  onPlay: () => void;
}

const EpisodeCard: React.FC<EpisodeCardProps> = ({ episode, episodeNumber, isValid, onPlay }) => {
  return (
    <div
      onClick={isValid ? onPlay : undefined}
      className={`bg-gray-900/80 backdrop-blur-sm rounded-xl overflow-hidden transition-all duration-500 border ${
        isValid 
          ? 'cursor-pointer group hover:bg-gray-800 hover:scale-105 hover:shadow-2xl border-gray-800 hover:border-gray-600' 
          : 'cursor-not-allowed border-gray-700'
      }`}
    >
      <div className="relative">
        <ImageWithFallback
          src={episode.thumbnail}
          alt={episode.title}
          className="w-full h-36 object-cover"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        
        {/* Play Button - Only show for valid episodes */}
        {isValid && (
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
              <div className="w-16 h-16 bg-[#e50914] rounded-full flex items-center justify-center shadow-lg">
                <Play size={24} className="text-white ml-1" fill="currentColor" />
              </div>
            </div>
          </div>
        )}
        
        {/* Coming Soon Overlay for invalid episodes */}
        {!isValid && (
          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
            <div className="bg-gray-800/90 backdrop-blur-sm text-white px-4 py-2 rounded-lg border border-gray-600">
              <div className="text-sm font-medium">Coming Soon</div>
            </div>
          </div>
        )}
        
        {/* Duration & Episode Number */}
        <div className="absolute bottom-2 left-2 bg-black/80 backdrop-blur-sm text-white text-xs px-2 py-1 rounded font-medium">
          Ep {episodeNumber}
        </div>
        <div className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-sm text-white text-xs px-2 py-1 rounded">
          {isValid ? episode.duration : 'Soon'}
        </div>

        {/* Status Badge */}
        {isValid ? (
          <div className="absolute top-2 left-2 bg-green-600/90 backdrop-blur-sm text-white text-xs px-2 py-1 rounded font-medium">
            ✓ Ready
          </div>
        ) : (
          <div className="absolute top-2 left-2 bg-yellow-600/90 backdrop-blur-sm text-white text-xs px-2 py-1 rounded font-medium">
            ⏳ Coming Soon
          </div>
        )}
        
        {/* Rating */}
        {episode.rating && (
          <div className="absolute top-2 right-2 flex items-center space-x-1 bg-black/80 backdrop-blur-sm px-2 py-1 rounded">
            <Star className="text-yellow-400 fill-current" size={12} />
            <span className="text-white text-xs font-medium">{episode.rating}</span>
          </div>
        )}

        {/* Views - Only show for valid episodes */}
        {episode.views && isValid && (
          <div className="absolute top-2 right-2 bg-gray-800/80 backdrop-blur-sm text-white text-xs px-2 py-1 rounded">
            {episode.views} views
          </div>
        )}
      </div>
      
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <h3 className={`font-bold text-lg transition-colors ${
            isValid 
              ? 'text-white group-hover:text-[#e50914]' 
              : 'text-gray-400'
          }`}>
            {episode.title}
          </h3>
        </div>
        <p className={`text-sm line-clamp-3 leading-relaxed ${
          isValid ? 'text-gray-400' : 'text-gray-500'
        }`}>
          {isValid ? episode.description : 'Episode ini sedang dalam tahap produksi dan akan segera tersedia.'}
        </p>
      </div>
    </div>
  );
};