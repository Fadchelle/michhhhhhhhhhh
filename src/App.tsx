import React, { useState, useEffect } from 'react';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Navigation } from './components/Navigation';
import { HomePage } from './components/HomePage';
import { SeriesDetailPage } from './components/SeriesDetailPage';
import { VideoPlayerPage } from './components/VideoPlayerPage';
import { TrendingPage, LatestPage } from './components/ContentPages';
import { SearchModal } from './components/SearchModal';

type Page = 'home' | 'trending' | 'latest' | 'series' | 'player';

interface AppState {
  currentPage: Page;
  currentCategory?: string;
  currentSeries?: string;
  currentEpisode?: string;
  showSearch: boolean;
}

export default function App() {
  const [state, setState] = useState<AppState>({
    currentPage: 'home',
    showSearch: false
  });

  const handleNavigate = (page: Page) => {
    setState(prev => ({ ...prev, currentPage: page }));
  };

  const handleSeriesSelect = (categoryId: string, seriesId: string) => {
    setState(prev => ({
      ...prev,
      currentPage: 'series',
      currentCategory: categoryId,
      currentSeries: seriesId
    }));
  };

  const handleEpisodePlay = (categoryId: string, seriesId: string, episodeId: string) => {
    setState(prev => ({
      ...prev,
      currentPage: 'player',
      currentCategory: categoryId,
      currentSeries: seriesId,
      currentEpisode: episodeId
    }));
  };

  const handleBack = () => {
    if (state.currentPage === 'player') {
      setState(prev => ({ ...prev, currentPage: 'series' }));
    } else {
      setState(prev => ({ ...prev, currentPage: 'home' }));
    }
  };

  const handleSearch = () => {
    setState(prev => ({ ...prev, showSearch: true }));
  };

  const closeSearch = () => {
    setState(prev => ({ ...prev, showSearch: false }));
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-black text-white">
        {/* Navigation */}
        {state.currentPage !== 'player' && state.currentPage !== 'series' && (
          <Navigation
            currentPage={state.currentPage as 'home' | 'trending' | 'latest'}
            onNavigate={handleNavigate}
            onSearch={handleSearch}
          />
        )}

        {/* Pages */}
        {state.currentPage === 'home' && (
          <HomePage
            onSeriesSelect={handleSeriesSelect}
            onEpisodePlay={handleEpisodePlay}
          />
        )}

        {state.currentPage === 'trending' && (
          <TrendingPage
            onSeriesSelect={handleSeriesSelect}
            onEpisodePlay={handleEpisodePlay}
          />
        )}

        {state.currentPage === 'latest' && (
          <LatestPage
            onSeriesSelect={handleSeriesSelect}
            onEpisodePlay={handleEpisodePlay}
          />
        )}

        {state.currentPage === 'series' && state.currentCategory && state.currentSeries && (
          <SeriesDetailPage
            categoryId={state.currentCategory}
            seriesId={state.currentSeries}
            onBack={handleBack}
            onEpisodePlay={handleEpisodePlay}
          />
        )}

        {state.currentPage === 'player' && state.currentCategory && state.currentSeries && state.currentEpisode && (
          <VideoPlayerPage
            categoryId={state.currentCategory}
            seriesId={state.currentSeries}
            episodeId={state.currentEpisode}
            onBack={handleBack}
            onSeriesSelect={handleSeriesSelect}
          />
        )}

        {/* Search Modal */}
        <SearchModal
          isOpen={state.showSearch}
          onClose={closeSearch}
          onEpisodePlay={handleEpisodePlay}
          onSeriesSelect={handleSeriesSelect}
        />
      </div>
    </ErrorBoundary>
  );
}