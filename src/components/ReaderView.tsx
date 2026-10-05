import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  Volume2,
  VolumeX,
  Type,
  Columns,
  Square,
  Share2,
  Check,
  Headphones,
  Compass
} from 'lucide-react';
import { Article } from '../types/article';
import { ambientAudio } from '../utils/audioSynth';
import { FolioArtwork } from './FolioArtwork';
import { HumanImage } from './HumanImage';
import { SectionIcon } from './SectionIcon';

interface ReaderViewProps {
  article: Article;
  allArticles: Article[];
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onBackToCatalog: () => void;
  onSelectArticle: (article: Article) => void;
  onOpenSilencePractice: () => void;
}

export const ReaderView: React.FC<ReaderViewProps> = ({
  article,
  allArticles,
  isSaved,
  onToggleSave,
  onBackToCatalog,
  onSelectArticle,
  onOpenSilencePractice,
}) => {
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [spreadMode, setSpreadMode] = useState<boolean>(false);
  const [soundMode, setSoundMode] = useState<'silence' | 'rain' | 'vinyl' | 'brown'>('silence');
  const [soundVolume, setSoundVolume] = useState<number>(0.35);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  // Track reading scroll depth
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top on article change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [article.id]);

  // Audio control handler
  const handleSoundChange = (newMode: 'silence' | 'rain' | 'vinyl' | 'brown') => {
    setSoundMode(newMode);
    ambientAudio.setMode(newMode, soundVolume);
  };

  const handleVolumeChange = (newVol: number) => {
    setSoundVolume(newVol);
    ambientAudio.setVolume(newVol);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const currentIndex = allArticles.findIndex((a) => a.id === article.id);
  const prevArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : null;
  const nextArticle = currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null;

  const fontClasses = {
    normal: 'text-base sm:text-lg leading-relaxed sm:leading-loose',
    large: 'text-lg sm:text-xl leading-relaxed sm:leading-loose',
    xlarge: 'text-xl sm:text-2xl leading-relaxed sm:leading-loose',
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#292524] pb-24">
      {/* Top Reading Progress Bar */}
      <div
        className="fixed top-0 left-0 right-0 h-1 bg-[#D8CEBD] z-50 transition-all"
        style={{ width: `${scrollProgress}%`, backgroundColor: '#936B45' }}
      />

      {/* Reader Utility Toolbar (Sticky sub-header) */}
      <div className="sticky top-18 z-30 bg-[#F7F4EC]/95 backdrop-blur-md border-b border-[#E7E0D3] py-2 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Back button */}
          <button
            onClick={onBackToCatalog}
            className="flex items-center gap-1.5 text-[#5C5346] hover:text-[#1C1917] font-medium transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Volume Index</span>
          </button>

          {/* Chapter & Folio Position */}
          <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] text-[#7A7062]">
            <span>FOLIO {article.chapterNumber} OF {allArticles.length.toString().padStart(2, '0')}</span>
            <span aria-hidden="true">·</span>
            <span className="font-sans uppercase tracking-wider">{article.chapterCategory}</span>
          </div>

          {/* Reader Ergonomics Controls */}
          <div className="flex items-center gap-3">
            {/* Ambient Sound Sanctuary */}
            <div className="flex items-center gap-1 bg-[#EFEAE0] p-1 rounded border border-[#DDD5C5]">
              <Headphones className="w-3 h-3 text-[#736A5E] ml-1 mr-0.5" />
              <button
                onClick={() => handleSoundChange('silence')}
                className={`px-2 py-0.5 rounded text-[11px] transition-colors cursor-pointer ${
                  soundMode === 'silence'
                    ? 'bg-[#292524] text-[#FBF9F5]'
                    : 'text-[#61574A] hover:text-[#1C1917]'
                }`}
                title="Pure Stillness (Muted)"
              >
                Stillness
              </button>
              <button
                onClick={() => handleSoundChange('brown')}
                className={`px-2 py-0.5 rounded text-[11px] transition-colors cursor-pointer ${
                  soundMode === 'brown'
                    ? 'bg-[#936B45] text-white'
                    : 'text-[#61574A] hover:text-[#1C1917]'
                }`}
                title="Deep Brown Noise Drone"
              >
                Brown Noise
              </button>
              <button
                onClick={() => handleSoundChange('rain')}
                className={`px-2 py-0.5 rounded text-[11px] transition-colors cursor-pointer ${
                  soundMode === 'rain'
                    ? 'bg-[#936B45] text-white'
                    : 'text-[#61574A] hover:text-[#1C1917]'
                }`}
                title="Parchment Rain"
              >
                Rain
              </button>
              <button
                onClick={() => handleSoundChange('vinyl')}
                className={`hidden md:inline-block px-2 py-0.5 rounded text-[11px] transition-colors cursor-pointer ${
                  soundMode === 'vinyl'
                    ? 'bg-[#936B45] text-white'
                    : 'text-[#61574A] hover:text-[#1C1917]'
                }`}
                title="Warm Vinyl Dust"
              >
                Vinyl
              </button>
            </div>

            {/* Font scaling */}
            <div className="hidden lg:flex items-center gap-1 border border-[#E7E0D3] rounded px-1.5 py-0.5 bg-[#FAF7F0]">
              <span className="text-[10px] text-[#8C8275] mr-1">Type:</span>
              <button
                onClick={() => setFontSize('normal')}
                className={`px-1.5 py-0.5 rounded font-serif text-xs ${fontSize === 'normal' ? 'font-bold text-[#1C1917] bg-[#E7DEC8]' : 'text-[#7A7062]'}`}
              >
                A
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-1.5 py-0.5 rounded font-serif text-sm ${fontSize === 'large' ? 'font-bold text-[#1C1917] bg-[#E7DEC8]' : 'text-[#7A7062]'}`}
              >
                A+
              </button>
            </div>

            {/* Bookmark */}
            <button
              onClick={() => onToggleSave(article.id)}
              className={`p-1.5 rounded transition-colors border border-[#E7E0D3] cursor-pointer ${
                isSaved ? 'text-[#936B45] bg-[#F3EDE2]' : 'text-[#7A7062] hover:bg-[#EFEAE0]'
              }`}
              title={isSaved ? 'Bookmarked' : 'Add bookmark'}
            >
              <Bookmark className="w-3.5 h-3.5" fill={isSaved ? 'currentColor' : 'none'} />
            </button>

            {/* Share */}
            <button
              onClick={handleShare}
              className="p-1.5 rounded text-[#7A7062] hover:bg-[#EFEAE0] transition-colors border border-[#E7E0D3] cursor-pointer"
              title="Copy folio link"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-[#14532D]" /> : <Share2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Main Book Surface Container */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14">
        {/* Tactile Book Page Canvas */}
        <div className="relative bg-[#FCFAF6] border border-[#E7E0D3] rounded-xl p-6 sm:p-12 lg:p-16 book-shadow">
          {/* Subtle Left Book Spine Stitch Accent */}
          <div className="absolute top-0 bottom-0 left-0 w-2 sm:w-3 bg-gradient-to-r from-[#D6CCB9] via-[#EAE2D3] to-transparent rounded-l-xl opacity-75" />

          {/* Ribbon Bookmark visual if saved */}
          {isSaved && (
            <div className="absolute top-0 right-8 sm:right-16 w-6 h-14 bg-[#936B45] shadow-md flex items-end justify-center pb-1">
              <div className="w-0 h-0 border-x-3 border-x-transparent border-t-4 border-t-[#FCFAF6]" />
            </div>
          )}

          {/* Book Header Matter */}
          <header className="border-b border-[#EAE3D6] pb-8 mb-10">
            {/* Real Humanized Hero Plate */}
            <div className="relative mb-6 rounded-xl overflow-hidden border border-[#E7E0D3] shadow-md bg-[#EDE5D5]">
              <div className="h-64 sm:h-80 lg:h-96 w-full">
                <HumanImage
                  src={article.image.url}
                  alt={article.image.alt}
                  folioId={article.id}
                  className="w-full h-full"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-[#FBF9F5] drop-shadow-md">
                <span>FOLIO {article.chapterNumber} · PHOTO ESSAY</span>
                <span className="hidden sm:inline">SEO TARGET: {article.seoKeywords[0]}</span>
              </div>
            </div>
            <p className="text-xs text-[#7A7062] font-reading italic text-center mb-6">
              {article.image.caption}
            </p>

            <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-widest text-[#8C8275] mb-4 font-mono">
              <span>FOLIO {article.chapterNumber}</span>
              <span aria-hidden="true" className="text-[#BFAF98]">·</span>
              <span>{article.chapterCategory}</span>
              <span aria-hidden="true" className="text-[#BFAF98]">·</span>
              <span>{article.publishedDate}</span>
              <span aria-hidden="true" className="text-[#BFAF98]">·</span>
              <span>{article.readTime}</span>
            </div>

            <h1
              className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1C1917] leading-[1.15] mb-5"
              style={{ textWrap: 'balance' }}
            >
              {article.title}
            </h1>

            <p className="font-reading text-lg sm:text-xl text-[#524B40] leading-relaxed italic max-w-3xl mb-6">
              {article.subtitle}
            </p>

            <div className="flex items-center gap-3 text-xs text-[#7A7062]">
              <div className="w-8 h-8 rounded-full bg-[#EAE2D3] flex items-center justify-center font-editorial text-sm font-semibold text-[#524B40]">
                {article.author.name.charAt(0)}
              </div>
              <div>
                <p className="font-medium text-[#292524]">{article.author.name}</p>
                <p className="text-[11px] text-[#8C8275]">{article.author.role}</p>
              </div>
            </div>
          </header>

          {/* Key Takeaways Box - Editorial Callout */}
          <div className="mb-10 p-6 bg-[#F6F2E9] border-l-3 border-[#936B45] rounded-r-lg">
            <h4 className="font-editorial text-base font-semibold text-[#292524] uppercase tracking-wider mb-3">
              Quick Takeaways (What You Need to Know)
            </h4>
            <ul className="space-y-2 text-sm text-[#443F37]">
              {article.keyTakeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="font-mono text-xs text-[#936B45] mt-0.5">0{idx + 1}.</span>
                  <span className="font-reading leading-relaxed">{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Article Sections (The Body Text) with Subheading Icons */}
          <div className={`space-y-12 ${fontClasses[fontSize]}`}>
            {article.sections.map((section, sIndex) => (
              <section key={sIndex} className="relative">
                <div className="flex items-center gap-3 mt-8 mb-5 pb-2 border-b border-[#EAE3D6]">
                  <div className="w-8 h-8 rounded-lg bg-[#F2ECE1] border border-[#DDD5C5] flex items-center justify-center shrink-0">
                    <SectionIcon name={section.iconName} className="w-4 h-4 text-[#7A5C3E]" />
                  </div>
                  <h2 className="font-editorial text-2xl sm:text-3xl font-medium text-[#1C1917] tracking-tight">
                    {section.heading}
                  </h2>
                </div>

                <div className="space-y-6 font-reading text-[#332E27]">
                  {section.paragraphs.map((p, pIndex) => (
                    <p
                      key={pIndex}
                      className={
                        sIndex === 0 && pIndex === 0
                          ? 'first-letter:text-5xl first-letter:font-editorial first-letter:font-normal first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-[#7A5C3E]'
                          : ''
                      }
                    >
                      {p}
                    </p>
                  ))}
                </div>

                {/* Editorial Pull Quote */}
                {section.quote && (
                  <figure className="my-10 py-6 px-6 sm:px-8 border-y border-[#E7E0D3] bg-[#FAF7F0] text-center">
                    <blockquote className="font-editorial text-xl sm:text-2xl lg:text-3xl italic text-[#292524] leading-snug">
                      "{section.quote}"
                    </blockquote>
                  </figure>
                )}

                {/* Marginalia / Scholarly Side Note */}
                {section.sideNote && (
                  <aside className="my-6 p-4 bg-[#F2ECE1] border-l-2 border-[#BFAF98] rounded-r text-xs text-[#5C5346] font-sans">
                    <span className="font-semibold uppercase tracking-wider text-[10px] text-[#7A7062] block mb-1">
                      Archival Note
                    </span>
                    <p className="leading-relaxed">{section.sideNote}</p>
                  </aside>
                )}
              </section>
            ))}
          </div>

          {/* Reflection Question Box (Book Monograph style) */}
          <div className="mt-14 pt-8 border-t border-[#EAE3D6] p-6 bg-[#F4EFE6] rounded-lg">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#7A5C3E] font-medium mb-2 font-mono">
              <Compass className="w-4 h-4" />
              <span>Contemplative Pause</span>
            </div>
            <p className="font-editorial text-xl sm:text-2xl text-[#1C1917] italic leading-snug mb-4">
              "{article.reflectionQuestion}"
            </p>
            <p className="text-xs text-[#7A7062]">
              Spend a quiet breath holding this inquiry before turning to the next folio.
            </p>
          </div>

          {/* SEO Search Intent & Metadata Indexing Section */}
          <section className="mt-12 pt-8 border-t border-[#EAE3D6]">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#8C8275] mb-3">
              Search Index & Core Terminology
            </h4>
            <div className="flex flex-wrap items-center gap-2">
              {article.seoKeywords.map((keyword) => (
                <span
                  key={keyword}
                  className="font-sans text-xs text-[#524B40] bg-[#EFEAE0] px-2.5 py-1 rounded"
                >
                  #{keyword}
                </span>
              ))}
            </div>
            <p className="text-[11px] text-[#8C8275] mt-2 italic">
              Indexed for inquiries relating to: "{article.primarySearchQuery}"
            </p>
          </section>

          {/* Stillness Chamber Invitation */}
          <div className="mt-10 p-6 border border-[#DDD5C5] bg-gradient-to-r from-[#F6F2E9] to-[#F1ECE1] rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h5 className="font-editorial text-lg text-[#1C1917]">Feeling Restless or Overstimulated?</h5>
              <p className="font-reading text-sm text-[#5C5346]">
                Test your tolerance with our guided 60-Second Stillness Chamber.
              </p>
            </div>
            <button
              onClick={onOpenSilencePractice}
              className="px-4 py-2.5 bg-[#292524] text-[#FBF9F5] text-xs font-medium rounded hover:bg-[#44403C] transition-colors whitespace-nowrap cursor-pointer"
            >
              Enter Stillness Chamber
            </button>
          </div>

          {/* Book Folio Navigation (Previous / Next Pages) */}
          <nav className="mt-14 pt-8 border-t border-[#EAE3D6] grid grid-cols-1 sm:grid-cols-2 gap-4">
            {prevArticle ? (
              <button
                onClick={() => onSelectArticle(prevArticle)}
                className="group flex flex-col p-4 bg-[#FAF7F0] hover:bg-[#F4EFE6] border border-[#E7E0D3] rounded text-left transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-1.5 text-xs text-[#8C8275] uppercase font-mono mb-1">
                  <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                  <span>Previous Folio {prevArticle.chapterNumber}</span>
                </div>
                <span className="font-editorial text-base text-[#1C1917] group-hover:text-[#936B45] transition-colors line-clamp-1">
                  {prevArticle.title}
                </span>
              </button>
            ) : (
              <div />
            )}

            {nextArticle && (
              <button
                onClick={() => onSelectArticle(nextArticle)}
                className="group flex flex-col p-4 bg-[#FAF7F0] hover:bg-[#F4EFE6] border border-[#E7E0D3] rounded text-right transition-colors cursor-pointer sm:ml-auto w-full"
              >
                <div className="flex items-center justify-end gap-1.5 text-xs text-[#8C8275] uppercase font-mono mb-1">
                  <span>Next Folio {nextArticle.chapterNumber}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
                <span className="font-editorial text-base text-[#1C1917] group-hover:text-[#936B45] transition-colors line-clamp-1">
                  {nextArticle.title}
                </span>
              </button>
            )}
          </nav>
        </div>
      </main>
    </div>
  );
};
