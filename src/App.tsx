import React, { useState, useEffect } from 'react';
import { ARTICLES } from './data/articles';
import { Article } from './types/article';
import { Header } from './components/Header';
import { CatalogView } from './components/CatalogView';
import { ReaderView } from './components/ReaderView';
import { KeywordExplorer } from './components/KeywordExplorer';
import { SilencePracticeModal } from './components/SilencePracticeModal';
import { ReadingShelfDrawer } from './components/ReadingShelfDrawer';

export default function App() {
  const [activeView, setActiveView] = useState<'catalog' | 'reader' | 'keywords'>('catalog');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All Folios');
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('quietude_saved_folios');
      return stored ? JSON.parse(stored) : ['sedatephobia-clinical-panic', 'anechoic-chamber-madness'];
    } catch {
      return ['sedatephobia-clinical-panic', 'anechoic-chamber-madness'];
    }
  });
  const [isShelfOpen, setIsShelfOpen] = useState<boolean>(false);
  const [isSilencePracticeOpen, setIsSilencePracticeOpen] = useState<boolean>(false);

  // Sync saved IDs to local storage
  useEffect(() => {
    try {
      localStorage.setItem('quietude_saved_folios', JSON.stringify(savedIds));
    } catch {
      // Storage unavailable or blocked
    }
  }, [savedIds]);

  const handleToggleSave = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleOpenArticle = (article: Article) => {
    setSelectedArticle(article);
    setActiveView('reader');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToCatalog = () => {
    setActiveView('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (view: 'catalog' | 'reader' | 'keywords', filterCategory?: string) => {
    setActiveView(view);
    if (filterCategory) {
      setSelectedCategory(filterCategory);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const savedArticles = ARTICLES.filter((a) => savedIds.includes(a.id));

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#292524] flex flex-col font-sans selection:bg-[#E7DEC8] selection:text-[#1C1917]">
      {/* 3-Zone Top Navigation Bar */}
      <Header
        activeView={activeView}
        onNavigate={handleNavigate}
        savedCount={savedIds.length}
        onOpenShelf={() => setIsShelfOpen(true)}
        onOpenSilencePractice={() => setIsSilencePracticeOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {activeView === 'reader' && selectedArticle ? (
          <ReaderView
            article={selectedArticle}
            allArticles={ARTICLES}
            isSaved={savedIds.includes(selectedArticle.id)}
            onToggleSave={handleToggleSave}
            onBackToCatalog={handleBackToCatalog}
            onSelectArticle={handleOpenArticle}
            onOpenSilencePractice={() => setIsSilencePracticeOpen(true)}
          />
        ) : activeView === 'keywords' ? (
          <KeywordExplorer
            articles={ARTICLES}
            onSelectArticle={handleOpenArticle}
            onFilterByKeyword={(kw) => {
              setSelectedCategory('All Folios');
              setActiveView('catalog');
            }}
          />
        ) : (
          <CatalogView
            articles={ARTICLES}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            savedIds={savedIds}
            onToggleSave={handleToggleSave}
            onOpenArticle={handleOpenArticle}
            onOpenSilencePractice={() => setIsSilencePracticeOpen(true)}
            onOpenKeywords={() => setActiveView('keywords')}
          />
        )}
      </main>

      {/* Slide-over Reading Shelf Drawer */}
      <ReadingShelfDrawer
        isOpen={isShelfOpen}
        onClose={() => setIsShelfOpen(false)}
        savedArticles={savedArticles}
        onRemoveBookmark={(id) => handleToggleSave(id)}
        onSelectArticle={handleOpenArticle}
        onClearAll={() => setSavedIds([])}
      />

      {/* Interactive 60-Second Stillness Chamber Modal */}
      <SilencePracticeModal
        isOpen={isSilencePracticeOpen}
        onClose={() => setIsSilencePracticeOpen(false)}
        onGoToGuide={() => {
          const guide = ARTICLES.find((a) => a.id === 'befriending-the-void');
          if (guide) {
            handleOpenArticle(guide);
          }
        }}
      />
    </div>
  );
}
