import React, { useState, useEffect } from 'react';
import { ArrowLeft, SkipBack, SkipForward, List, Play } from 'lucide-react';
import { categories, type Series, type Episode } from '../data/content';

interface VideoPlayerPageProps {
  categoryId: string;
  seriesId: string;
  episodeId: string;
  onBack: () => void;
  onSeriesSelect: (categoryId: string, seriesId: string) => void;
}

export const VideoPlayerPage: React.FC<VideoPlayerPageProps> = ({
  categoryId,
  seriesId,
  episodeId,
  onBack,
  onSeriesSelect
}) => {
  const [series, setSeries] = useState<Series | null>(null);
  const [currentEpisode, setCurrentEpisode] = useState<Episode | null>(null);
  const [loading, setLoading] = useState(true);
  const [showEpisodeList, setShowEpisodeList] = useState(false);

  useEffect(() => {
    // Find the series and episode
    const category = categories.find(cat => cat.id === categoryId);
    const foundSeries = category?.series.find(s => s.id === seriesId);
    const foundEpisode = foundSeries?.episodes.find(ep => ep.id === episodeId);
    
    if (foundSeries && foundEpisode) {
      setSeries(foundSeries);
      setCurrentEpisode(foundEpisode);
    }
    
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [categoryId, seriesId, episodeId]);

  const getCurrentEpisodeIndex = () => {
    if (!series || !currentEpisode) return -1;
    return series.episodes.findIndex(ep => ep.id === currentEpisode.id);
  };

  const navigateEpisode = (direction: 'prev' | 'next') => {
    if (!series) return;
    
    const currentIndex = getCurrentEpisodeIndex();
    let newIndex = direction === 'prev' ? currentIndex - 1 : currentIndex + 1;
    
    if (newIndex >= 0 && newIndex < series.episodes.length) {
      setCurrentEpisode(series.episodes[newIndex]);
      // In a real app, you would update the URL here
    }
  };

  const selectEpisode = (episode: Episode) => {
    setCurrentEpisode(episode);
    setShowEpisodeList(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-[#e50914] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-white">Memuat video...</p>
        </div>
      </div>
    );
  }

  if (!series || !currentEpisode) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-white text-xl">Video tidak ditemukan</p>
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

  const currentIndex = getCurrentEpisodeIndex();

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
        {/* Video Player */}
        <section className="relative">
          <div className="aspect-video bg-black">
            <iframe
              src={currentEpisode.videoUrl}
              className="w-full h-full"
              allowFullScreen
              title={currentEpisode.title}
            />
          </div>
        </section>

        {/* Video Info & Controls */}
        <section className="px-4 md:px-8 py-6 space-y-6">
          {/* Episode Info */}
          <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              {series.title} - {currentEpisode.title}
            </h1>
            <p className="text-gray-300">
              {currentEpisode.description}
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => navigateEpisode('prev')}
              disabled={currentIndex <= 0}
              className="flex items-center space-x-2 bg-gray-700 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors"
            >
              <SkipBack size={16} />
              <span>Sebelumnya</span>
            </button>

            <button
              onClick={() => navigateEpisode('next')}
              disabled={currentIndex >= series.episodes.length - 1}
              className="flex items-center space-x-2 bg-gray-700 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors"
            >
              <span>Berikutnya</span>
              <SkipForward size={16} />
            </button>

            <button
              onClick={() => onSeriesSelect(categoryId, seriesId)}
              className="flex items-center space-x-2 bg-[#e50914] text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
            >
              <List size={16} />
              <span>Pilih Series</span>
            </button>
          </div>
        </section>

        {/* Episode List */}
        <section className="px-4 md:px-8 pb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-medium text-white">
              Episode ({series.episodes.length})
            </h2>
            <button
              onClick={() => setShowEpisodeList(!showEpisodeList)}
              className="text-[#e50914] hover:text-red-300 transition-colors"
            >
              {showEpisodeList ? 'Sembunyikan' : 'Tampilkan Semua'}
            </button>
          </div>

          <div className={`space-y-3 ${showEpisodeList ? '' : 'max-h-96 overflow-hidden'}`}>
            {series.episodes.map((episode, index) => (
              <EpisodeListItem
                key={episode.id}
                episode={episode}
                episodeNumber={index + 1}
                isActive={episode.id === currentEpisode.id}
                onSelect={() => selectEpisode(episode)}
              />
            ))}
          </div>

          {!showEpisodeList && series.episodes.length > 5 && (
            <div className="mt-4 text-center">
              <button
                onClick={() => setShowEpisodeList(true)}
                className="text-[#e50914] hover:text-red-300 transition-colors"
              >
                Lihat {series.episodes.length - 5} episode lainnya
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

interface EpisodeListItemProps {
  episode: Episode;
  episodeNumber: number;
  isActive: boolean;
  onSelect: () => void;
}

const EpisodeListItem: React.FC<EpisodeListItemProps> = ({
  episode,
  episodeNumber,
  isActive,
  onSelect
}) => {
  return (
    <div
      onClick={onSelect}
      className={`flex items-center space-x-4 p-4 rounded-lg cursor-pointer transition-all duration-300 ${
        isActive
          ? 'bg-[#e50914] bg-opacity-20 border border-[#e50914]'
          : 'bg-gray-900 hover:bg-gray-800'
      }`}
    >
      <div className="flex-none">
        <div className="relative">
          <img
            src={episode.thumbnail}
            alt={episode.title}
            className="w-20 h-12 object-cover rounded"
          />
          {!isActive && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded group-hover:bg-opacity-20 transition-all">
              <Play size={16} className="text-white" fill="currentColor" />
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2">
          <span className={`font-medium ${isActive ? 'text-[#e50914]' : 'text-white'}`}>
            {episodeNumber}. {episode.title}
          </span>
          {isActive && (
            <span className="text-xs bg-[#e50914] text-white px-2 py-1 rounded">
              Sedang Diputar
            </span>
          )}
        </div>
        <p className="text-gray-400 text-sm mt-1 line-clamp-1">
          {episode.description}
        </p>
      </div>

      <div className="flex-none text-sm text-gray-400">
        {episode.duration}
      </div>
    </div>
  );
};