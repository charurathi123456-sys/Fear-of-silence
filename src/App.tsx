import React, { useState, useEffect, useCallback } from 'react';
import { ARTICLES } from './data/articles';
import { Article } from './types/article';
import { Header, ViewType } from './components/Header';
import { CatalogView } from './components/CatalogView';
import { ClinicalScienceView } from './components/ClinicalScienceView';
import { AcousticCultureView } from './components/AcousticCultureView';
import { ReaderView } from './components/ReaderView';
import { KeywordExplorer } from './components/KeywordExplorer';
import { SilencePracticeModal } from './components/SilencePracticeModal';
import { ReadingShelfDrawer } from './components/ReadingShelfDrawer';
import { updatePageSeo } from './utils/seo';
import { resolveRoute, pushCleanUrl, ROUTE_PATHS } from './utils/routes';

export default function App() {
  const [activeView, setActiveView] = useState<ViewType>('catalog');
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

  // Synchronize route from browser location
  const syncRouteFromLocation = useCallback(() => {
    // If there is an old hash or raw path, inspect both
    const rawPath = window.location.pathname;
    const hash = window.location.hash.replace(/^#\/?/, '');
    
    // If hash was used in a previous session, normalize it to clean path
    const pathToResolve = hash ? `/${hash}` : rawPath;
    const resolution = resolveRoute(pathToResolve);

    setActiveView(resolution.view);
    setSelectedArticle(resolution.article);

    // Ensure browser URL is clean (no '#' symbol, unique /home for landing page)
    pushCleanUrl(resolution.path);

    // Update SEO tags
    updatePageSeo({
      title: resolution.title,
      description: resolution.description,
      path: resolution.path,
      type: resolution.view === 'reader' ? 'article' : 'website',
    });
  }, []);

  // Listen to popstate (browser back/forward navigation)
  useEffect(() => {
    syncRouteFromLocation();
    window.addEventListener('popstate', syncRouteFromLocation);
    return () => {
      window.removeEventListener('popstate', syncRouteFromLocation);
    };
  }, [syncRouteFromLocation]);

  const handleToggleSave = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Open an article with its own unique, clean URL (e.g. /fear-of-silence)
  const handleOpenArticle = (article: Article) => {
    setSelectedArticle(article);
    setActiveView('reader');
    const cleanPath = `/${article.slug}`;

    pushCleanUrl(cleanPath);

    updatePageSeo({
      title: `${article.title} — Quietude`,
      description: article.excerpt,
      path: cleanPath,
      type: 'article',
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Back to Homepage with unique /home URL
  const handleBackToCatalog = () => {
    setActiveView('catalog');
    pushCleanUrl(ROUTE_PATHS.HOME);

    updatePageSeo({
      title: 'Quietude — Essays on Sedatephobia & The Fear of Silence',
      description:
        'An editorial journal exploring sedatephobia, background noise addiction, conversational dread, and the psychological architecture behind the fear of silence.',
      path: ROUTE_PATHS.HOME,
      type: 'website',
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Navigate to any of the unique pages
  const handleNavigate = (view: ViewType, filterCategory?: string) => {
    setActiveView(view);
    if (filterCategory) {
      setSelectedCategory(filterCategory);
    }

    let targetPath: string = ROUTE_PATHS.HOME;
    let title = 'Quietude — Essays on Sedatephobia & The Fear of Silence';
    let description =
      'An editorial journal exploring sedatephobia, background noise addiction, conversational dread, and the psychological architecture behind the fear of silence.';

    if (view === 'catalog') {
      targetPath = ROUTE_PATHS.HOME;
      title = 'Quietude — Essays on Sedatephobia & The Fear of Silence';
      description =
        'An editorial journal exploring sedatephobia, background noise addiction, conversational dread, and the psychological architecture behind the fear of silence.';
    } else if (view === 'clinical') {
      targetPath = ROUTE_PATHS.CLINICAL_SCIENCE;
      title = 'Clinical & Science of Silence — Quietude';
      description =
        'Explore neuroscience, central auditory gain in tinnitus, the Default Mode Network, and acoustic deprivation research from Orfield Laboratories.';
    } else if (view === 'acoustic') {
      targetPath = ROUTE_PATHS.ACOUSTIC_CULTURE;
      title = 'Acoustic Culture of Modern Life — Quietude';
      description =
        'Cultural essays on 24/7 background audio, white noise addiction, awkward conversational pauses, and the smartphone reflex.';
    } else if (view === 'keywords') {
      targetPath = ROUTE_PATHS.SEARCH_KEYWORDS;
      title = 'Search Matrix & Keywords — Quietude';
      description =
        'Discover top searched questions, queries, and high-intent terminology regarding sedatephobia and the fear of silence.';
    }

    pushCleanUrl(targetPath);

    updatePageSeo({
      title,
      description,
      path: targetPath,
      type: 'website',
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const savedArticles = ARTICLES.filter((a) => savedIds.includes(a.id));

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#292524] flex flex-col font-sans selection:bg-[#E7DEC8] selection:text-[#1C1917]">
      {/* 3-Zone Top Navigation Bar with real clean URL links */}
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
        ) : activeView === 'clinical' ? (
          <ClinicalScienceView
            articles={ARTICLES}
            savedIds={savedIds}
            onToggleSave={handleToggleSave}
            onOpenArticle={handleOpenArticle}
            onOpenSilencePractice={() => setIsSilencePracticeOpen(true)}
          />
        ) : activeView === 'acoustic' ? (
          <AcousticCultureView
            articles={ARTICLES}
            savedIds={savedIds}
            onToggleSave={handleToggleSave}
            onOpenArticle={handleOpenArticle}
            onOpenSilencePractice={() => setIsSilencePracticeOpen(true)}
          />
        ) : activeView === 'keywords' ? (
          <KeywordExplorer
            articles={ARTICLES}
            onSelectArticle={handleOpenArticle}
            onFilterByKeyword={(kw) => {
              setSelectedCategory('All Folios');
              handleNavigate('catalog');
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
            onOpenKeywords={() => handleNavigate('keywords')}
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
