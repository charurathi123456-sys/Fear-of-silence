import React, { useState } from 'react';
import { FolioArtwork } from './FolioArtwork';

interface HumanImageProps {
  src: string;
  alt: string;
  folioId: string;
  className?: string;
  imageClassName?: string;
  showCaption?: boolean;
  caption?: string;
}

export const HumanImage: React.FC<HumanImageProps> = ({
  src,
  alt,
  folioId,
  className = '',
  imageClassName = '',
  showCaption = false,
  caption,
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <figure className={`relative overflow-hidden ${className}`}>
      {!hasError ? (
        <>
          <img
            src={src}
            alt={alt}
            referrerPolicy="no-referrer"
            loading="lazy"
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            className={`w-full h-full object-cover transition-all duration-700 ${
              isLoaded ? 'opacity-100 filter-none' : 'opacity-0 scale-95 blur-xs'
            } ${imageClassName}`}
          />
          {/* Subtle loading placeholder */}
          {!isLoaded && (
            <div className="absolute inset-0 bg-[#EFE9DF] animate-pulse flex items-center justify-center">
              <span className="text-[11px] font-mono text-[#8C8275]">Loading imagery...</span>
            </div>
          )}
        </>
      ) : (
        /* Zero-broken-image fallback to styled vector artwork */
        <FolioArtwork folioId={folioId} className="w-full h-full" />
      )}

      {showCaption && caption && (
        <figcaption className="mt-2.5 text-xs text-[#7A7062] font-reading italic text-center px-4">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};
