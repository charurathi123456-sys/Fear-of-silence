import React, { useState } from 'react';
import { FolioArtwork } from './FolioArtwork';

interface HumanImageProps {
  src: string;
  alt: string;
  fileName?: string;
  folioId: string;
  className?: string;
  imageClassName?: string;
  showCaption?: boolean;
  caption?: string;
  showFileMeta?: boolean;
  fileSizeKb?: number;
}

export const HumanImage: React.FC<HumanImageProps> = ({
  src,
  alt,
  fileName,
  folioId,
  className = '',
  imageClassName = '',
  showCaption = false,
  caption,
  showFileMeta = false,
  fileSizeKb,
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);

  // Keep currentSrc in sync if src prop changes
  React.useEffect(() => {
    setCurrentSrc(src);
    setHasError(false);
    setIsLoaded(false);
  }, [src]);

  const handleError = () => {
    if (currentSrc.startsWith('/images/')) {
      const fallbackMap: Record<string, string> = {
        'sedatephobia-quiet-room-anxiety.webp': 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=360&auto=format&fit=crop&q=48&fm=webp',
        'white-noise-nighttime-sleep-aid.webp': 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=480&auto=format&fit=crop&q=65&fm=webp',
        'awkward-silence-conversation-pause.webp': 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=480&auto=format&fit=crop&q=65&fm=webp',
        'orfield-anechoic-chamber-sound-wedges.webp': 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=480&auto=format&fit=crop&q=65&fm=webp',
        'tinnitus-internal-ear-ringing-relief.webp': 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=480&auto=format&fit=crop&q=65&fm=webp',
        'horror-vacui-empty-mind-restlessness.webp': 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=480&auto=format&fit=crop&q=65&fm=webp',
        'comfortable-silence-relationship-intimacy.webp': 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=480&auto=format&fit=crop&q=65&fm=webp',
        'smartphone-scrolling-digital-pacifier.webp': 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=480&auto=format&fit=crop&q=65&fm=webp',
        'bedtime-overthinking-default-mode-network.webp': 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=480&auto=format&fit=crop&q=65&fm=webp',
        'reclaiming-stillness-mindfulness-practice.webp': 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=480&auto=format&fit=crop&q=65&fm=webp',
      };
      if (fileName && fallbackMap[fileName]) {
        setCurrentSrc(fallbackMap[fileName]);
        return;
      }
    }
    setHasError(true);
  };

  const displaySize = fileSizeKb ? `${fileSizeKb} KB` : '< 100 KB';

  return (
    <figure
      className={`relative overflow-hidden group/fig ${className}`}
      data-filename={fileName || 'plate.webp'}
    >
      {!hasError ? (
        <>
          <img
            src={currentSrc}
            alt={alt}
            title={fileName ? `${fileName} (${displaySize}) — ${alt}` : alt}
            data-filename={fileName || ''}
            referrerPolicy="no-referrer"
            loading="lazy"
            decoding="async"
            onLoad={() => setIsLoaded(true)}
            onError={handleError}
            className={`w-full h-full object-cover transition-all duration-500 max-w-full ${
              isLoaded ? 'opacity-100 filter-none' : 'opacity-0 scale-95 blur-xs'
            } ${imageClassName}`}
          />
          {/* Subtle loading placeholder */}
          {!isLoaded && (
            <div className="absolute inset-0 bg-[#EFE9DF] animate-pulse flex items-center justify-center">
              <span className="text-[11px] font-mono text-[#8C8275]">Loading optimized image...</span>
            </div>
          )}

          {/* Micro file name badge overlay with size if requested or on hover */}
          {(showFileMeta || fileName) && (
            <div className="absolute top-2 right-2 opacity-0 group-hover/fig:opacity-95 transition-opacity duration-200 pointer-events-none">
              <span className="inline-block px-1.5 py-0.5 bg-[#1C1917]/85 text-[#FBF9F5] text-[10px] font-mono rounded backdrop-blur-xs shadow-xs border border-white/10">
                {fileName || 'plate.webp'} · {displaySize}
              </span>
            </div>
          )}
        </>
      ) : (
        /* Zero-broken-image fallback to styled vector artwork */
        <FolioArtwork folioId={folioId} className="w-full h-full" />
      )}

      {showCaption && (caption || fileName) && (
        <figcaption className="mt-2 text-xs text-[#7A7062] font-reading italic text-center px-4 space-y-1">
          {caption && <div>{caption}</div>}
          {fileName && (
            <div className="text-[10px] font-mono not-italic text-[#8C8275] flex items-center justify-center gap-2">
              <span className="px-1.5 py-0.2 bg-[#EFE9DF] rounded border border-[#DDD5C5]">
                {fileName} ({displaySize})
              </span>
              <span className="truncate max-w-xs text-[#9C9284]">alt: {alt}</span>
            </div>
          )}
        </figcaption>
      )}
    </figure>
  );
};
