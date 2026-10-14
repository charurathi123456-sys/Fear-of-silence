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
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <figure
      className={`relative overflow-hidden group/fig ${className}`}
      data-filename={fileName || 'plate.webp'}
    >
      {!hasError ? (
        <>
          <img
            src={src}
            alt={alt}
            title={fileName ? `${fileName} — ${alt}` : alt}
            data-filename={fileName || ''}
            referrerPolicy="no-referrer"
            loading="lazy"
            decoding="async"
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            className={`w-full h-full object-cover transition-all duration-500 max-w-full ${
              isLoaded ? 'opacity-100 filter-none' : 'opacity-0 scale-95 blur-xs'
            } ${imageClassName}`}
          />
          {/* Subtle loading placeholder */}
          {!isLoaded && (
            <div className="absolute inset-0 bg-[#EFE9DF] animate-pulse flex items-center justify-center">
              <span className="text-[11px] font-mono text-[#8C8275]">Loading imagery...</span>
            </div>
          )}

          {/* Micro file name badge overlay if requested or on hover */}
          {(showFileMeta || fileName) && (
            <div className="absolute top-2 right-2 opacity-0 group-hover/fig:opacity-95 transition-opacity duration-200 pointer-events-none">
              <span className="inline-block px-1.5 py-0.5 bg-[#1C1917]/85 text-[#FBF9F5] text-[10px] font-mono rounded backdrop-blur-xs shadow-xs border border-white/10">
                {fileName || 'plate.webp'}
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
                {fileName}
              </span>
              <span className="truncate max-w-xs text-[#9C9284]">alt: {alt}</span>
            </div>
          )}
        </figcaption>
      )}
    </figure>
  );
};
