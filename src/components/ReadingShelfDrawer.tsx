import React from 'react';
import { X, BookOpen, Trash2, ArrowRight } from 'lucide-react';
import { Article } from '../types/article';

interface ReadingShelfDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedArticles: Article[];
  onRemoveBookmark: (id: string) => void;
  onSelectArticle: (article: Article) => void;
  onClearAll: () => void;
}

export const ReadingShelfDrawer: React.FC<ReadingShelfDrawerProps> = ({
  isOpen,
  onClose,
  savedArticles,
  onRemoveBookmark,
  onSelectArticle,
  onClearAll,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#1C1917]/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] border-l border-[#E7E0D3] shadow-2xl flex flex-col">
          {/* Drawer Header */}
          <div className="p-6 border-b border-[#EAE3D6] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#7A5C3E]" />
              <h3 className="font-editorial text-xl font-medium text-[#1C1917]">
                My Reading Shelf
              </h3>
              <span className="font-mono text-xs text-[#8C8275] bg-[#EFEAE0] px-2 py-0.5 rounded">
                {savedArticles.length}
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-[#7A7062] hover:text-[#1C1917] hover:bg-[#EFEAE0] rounded transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Drawer Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {savedArticles.length === 0 ? (
              <div className="text-center py-16 px-4">
                <div className="w-12 h-12 rounded-full bg-[#EFEAE0] flex items-center justify-center mx-auto mb-3 text-[#A39889]">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h4 className="font-editorial text-lg text-[#292524] mb-1">Your shelf is vacant</h4>
                <p className="font-reading text-xs text-[#7A7062] leading-relaxed max-w-xs mx-auto">
                  Click the bookmark ribbon on any folio in the journal to save it for quiet contemplation later.
                </p>
              </div>
            ) : (
              savedArticles.map((article) => (
                <div
                  key={article.id}
                  className="group relative bg-[#FCFAF6] border border-[#E7E0D3] hover:border-[#C4B7A2] rounded-lg p-4 transition-all book-shadow cursor-pointer flex flex-col justify-between"
                  onClick={() => {
                    onSelectArticle(article);
                    onClose();
                  }}
                >
                  {/* Left Spine Stitch */}
                  <div className="absolute top-0 bottom-0 left-0 w-1 bg-[#936B45] rounded-l" />

                  <div>
                    <div className="flex items-center justify-between text-[11px] font-mono uppercase text-[#8C8275] mb-1 pl-2">
                      <span>FOLIO {article.chapterNumber}</span>
                      <span>{article.readTime}</span>
                    </div>

                    <h4 className="font-editorial text-base text-[#1C1917] group-hover:text-[#7A5C3E] transition-colors leading-snug pl-2 mb-2">
                      {article.title}
                    </h4>
                  </div>

                  <div className="pt-3 border-t border-[#EAE3D6] flex items-center justify-between pl-2 text-xs">
                    <span className="text-[#7A7062]">{article.chapterCategory}</span>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onRemoveBookmark(article.id);
                        }}
                        className="p-1 text-[#A39889] hover:text-[#991B1B] transition-colors"
                        title="Remove from shelf"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <span className="flex items-center gap-1 font-medium text-[#292524] group-hover:text-[#7A5C3E]">
                        Read <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer */}
          {savedArticles.length > 0 && (
            <div className="p-4 border-t border-[#EAE3D6] bg-[#FAF8F5] flex items-center justify-between">
              <button
                onClick={onClearAll}
                className="text-xs text-[#8C8275] hover:text-[#991B1B] transition-colors cursor-pointer"
              >
                Clear all saved folios
              </button>
              <button
                onClick={() => {
                  if (savedArticles.length > 0) {
                    onSelectArticle(savedArticles[0]);
                    onClose();
                  }
                }}
                className="px-4 py-2 bg-[#292524] text-[#FBF9F5] text-xs font-medium rounded hover:bg-[#44403C] transition-colors cursor-pointer"
              >
                Read First Folio
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
