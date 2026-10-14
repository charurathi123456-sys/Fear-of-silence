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

  // Update browser address bar and history with unique, clean URLs
  const updateBrowserUrl = useCallback((path: string, hash: string = '') => {
    const fullTarget = hash ? `${path}#${hash}` : path;
    try {
      if (window.location.pathname !== path || window.location.hash !== (hash ? `#${hash}` : '')) {
        window.history.pushState(null, '', fullTarget);
      }
    } catch {
      // Fallback if pushState is restricted in iframe environment
      if (hash) {
        window.location.hash = hash;
      }
    }
  }, []);

  // Parse current route from path and hash
  const parseCurrentRoute = useCallback(() => {
    const pathname = window.location.pathname.replace(/\/$/, '') || '/';
    const hash = window.location.hash.replace('#', '').replace(/^\//, '');

    // 1. Article / Folio route: /folio/:slug or #folio/:slug
    if (pathname.startsWith('/folio/') || hash.startsWith('folio/') || hash.startsWith('article/')) {
      const targetSlug = pathname.replace('/folio/', '') || hash.replace('folio/', '').replace('article/', '');
      const matched = ARTICLES.find((a) => a.slug === targetSlug || a.id === targetSlug);
      if (matched) {
        setSelectedArticle(matched);
        setActiveView('reader');
        updatePageSeo({
          title: `${matched.title} — Quietude`,
          description: matched.excerpt,
          path: `/folio/${matched.slug}`,
          type: 'article',
        });
        return;
      }
    }

    // 2. Clinical & Science: /clinical-science or #clinical-science
    if (
      pathname === '/clinical-science' ||
      pathname === '/clinical' ||
      hash === 'clinical-science' ||
      hash === 'clinical'
    ) {
      setActiveView('clinical');
      updatePageSeo({
        title: 'Clinical & Science of Silence — Quietude',
        description: 'Explore neuroscience, central auditory gain, the Default Mode Network, and acoustic deprivation research from Orfield Laboratories.',
        path: '/clinical-science',
      });
      return;
    }

    // 3. Acoustic Culture: /acoustic-culture or #acoustic-culture
    if (
      pathname === '/acoustic-culture' ||
      pathname === '/acoustic' ||
      hash === 'acoustic-culture' ||
      hash === 'acoustic'
    ) {
      setActiveView('acoustic');
      updatePageSeo({
        title: 'Acoustic Culture of Modern Life — Quietude',
        description: 'Cultural essays on 24/7 background audio, white noise addiction, awkward conversational pauses, and the smartphone reflex.',
        path: '/acoustic-culture',
      });
      return;
    }

    // 4. Search Matrix / Keywords: /search or #search
    if (
      pathname === '/search' ||
      pathname === '/keywords' ||
      hash === 'search' ||
      hash === 'keywords'
    ) {
      setActiveView('keywords');
      updatePageSeo({
        title: 'Search Matrix & Keywords — Quietude',
        description: 'Discover top searched questions, queries, and high-intent terminology regarding sedatephobia and the fear of silence.',
        path: '/search',
      });
      return;
    }

    // 5. Unique Landing Page / Homepage: /
    setActiveView('catalog');
    updatePageSeo({
      title: 'Quietude — Essays on Sedatephobia & The Fear of Silence',
      description: 'An editorial journal exploring sedatephobia, background noise addiction, conversational dread, and the psychological architecture behind the fear of silence.',
      path: '/',
    });
  }, []);

  // Synchronize on mount and listen to popstate / hashchange
  useEffect(() => {
    parseCurrentRoute();
    window.addEventListener('popstate', parseCurrentRoute);
    window.addEventListener('hashchange', parseCurrentRoute);
    return () => {
      window.removeEventListener('popstate', parseCurrentRoute);
      window.removeEventListener('hashchange', parseCurrentRoute);
    };
  }, [parseCurrentRoute]);

  const handleToggleSave = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleOpenArticle = (article: Article) => {
    setSelectedArticle(article);
    setActiveView('reader');
    updateBrowserUrl(`/folio/${article.slug}`, `folio/${article.slug}`);
    updatePageSeo({
      title: `${article.title} — Quietude`,
      description: article.excerpt,
      path: `/folio/${article.slug}`,
      type: 'article',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToCatalog = () => {
    setActiveView('catalog');
    updateBrowserUrl('/', '');
    updatePageSeo({
      title: 'Quietude — Essays on Sedatephobia & The Fear of Silence',
      description: 'An editorial journal exploring sedatephobia, background noise addiction, conversational dread, and the psychological architecture behind the fear of silence.',
      path: '/',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (view: ViewType, filterCategory?: string) => {
    setActiveView(view);
    if (filterCategory) {
      setSelectedCategory(filterCategory);
    }

    if (view === 'catalog') {
      // Clean, unique URL for Homepage
      updateBrowserUrl('/', '');
      updatePageSeo({
        title: 'Quietude — Essays on Sedatephobia & The Fear of Silence',
        description: 'An editorial journal exploring sedatephobia, background noise addiction, conversational dread, and the psychological architecture behind the fear of silence.',
        path: '/',
      });
    } else if (view === 'clinical') {
      // Unique URL for Clinical & Science
      updateBrowserUrl('/clinical-science', 'clinical-science');
      updatePageSeo({
        title: 'Clinical & Science of Silence — Quietude',
        description: 'Explore neuroscience, central auditory gain, the Default Mode Network, and acoustic deprivation research from Orfield Laboratories.',
        path: '/clinical-science',
      });
    } else if (view === 'acoustic') {
      // Unique URL for Acoustic Culture
      updateBrowserUrl('/acoustic-culture', 'acoustic-culture');
      updatePageSeo({
        title: 'Acoustic Culture of Modern Life — Quietude',
        description: 'Cultural essays on 24/7 background audio, white noise addiction, awkward conversational pauses, and the smartphone reflex.',
        path: '/acoustic-culture',
      });
    } else if (view === 'keywords') {
      // Unique URL for Search Matrix
      updateBrowserUrl('/search', 'search');
      updatePageSeo({
        title: 'Search Matrix & Keywords — Quietude',
        description: 'Discover top searched questions, queries, and high-intent terminology regarding sedatephobia and the fear of silence.',
        path: '/search',
      });
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
