import { Article } from '../types/article';
import { ARTICLES } from '../data/articles';
import { ViewType } from '../components/Header';

export interface RouteResolution {
  view: ViewType;
  article: Article | null;
  path: string;
  title: string;
  description: string;
}

export const ROUTE_PATHS = {
  HOME: '/home',
  CLINICAL_SCIENCE: '/clinical-science',
  ACOUSTIC_CULTURE: '/acoustic-culture',
  SEARCH_KEYWORDS: '/search-keywords',
} as const;

/**
 * Resolves any browser path into the appropriate view, article, and clean canonical path.
 * Rules enforced:
 * - Clean, readable URLs
 * - Short and describes the page
 * - Lowercase words joined by hyphens
 * - No '#' symbols
 * - No random numbers or IDs
 */
export function resolveRoute(rawPath: string): RouteResolution {
  // Normalize path: lowercase, strip query/hash, strip trailing slash
  let clean = (rawPath || '')
    .split('#')[0]
    .split('?')[0]
    .toLowerCase()
    .replace(/\/+$/, '');

  // If clean is empty, treat as root
  if (!clean) {
    clean = '/';
  }

  // 1. Landing Page / Homepage: / or /home or /index.html
  if (clean === '/' || clean === '/home' || clean === '/index.html') {
    return {
      view: 'catalog',
      article: null,
      path: '/home',
      title: 'Quietude — Essays on Sedatephobia & The Fear of Silence',
      description:
        'Struggling with the fear of silence or sedatephobia? Discover the root causes of quiet anxiety, white noise reliance, and simple steps to find lasting calm now.',
    };
  }

  // 2. Clinical & Science: /clinical-science (also accepts /clinical)
  if (clean === '/clinical-science' || clean === '/clinical') {
    return {
      view: 'clinical',
      article: null,
      path: '/clinical-science',
      title: 'Clinical & Science of Silence — Quietude',
      description:
        'Explore the clinical neuroscience behind the fear of silence, central auditory gain, tinnitus, and anechoic chamber research. Uncover what happens to you today.',
    };
  }

  // 3. Acoustic Culture: /acoustic-culture (also accepts /acoustic)
  if (clean === '/acoustic-culture' || clean === '/acoustic') {
    return {
      view: 'acoustic',
      article: null,
      path: '/acoustic-culture',
      title: 'Acoustic Culture of Modern Life — Quietude',
      description:
        'Why is modern society addicted to background noise? Examine the cultural shift from quiet rooms to constant podcasts and box fans. Read our in-depth essay now.',
    };
  }

  // 4. Search Matrix / Keywords: /search-keywords (also accepts /keywords or /search)
  if (
    clean === '/search-keywords' ||
    clean === '/keywords' ||
    clean === '/search'
  ) {
    return {
      view: 'keywords',
      article: null,
      path: '/search-keywords',
      title: 'Search Matrix & Keywords — Quietude',
      description:
        'Explore the most searched queries and clinical terms on the fear of silence, sedatephobia, and noise addiction. Find answers to your pressing questions today.',
    };
  }

  // 5. Check if it matches any of the 10 articles by clean slug or id
  const targetSegment = clean
    .replace(/^\//, '')
    .replace(/^folio\//, '')
    .replace(/^article\//, '');

  const matchedArticle = ARTICLES.find(
    (a) => a.slug.toLowerCase() === targetSegment || a.id.toLowerCase() === targetSegment
  );

  if (matchedArticle) {
    return {
      view: 'reader',
      article: matchedArticle,
      path: `/${matchedArticle.slug}`,
      title: `${matchedArticle.title} — Quietude`,
      description: matchedArticle.metaDescription || matchedArticle.excerpt,
    };
  }

  // Default fallback to Homepage with unique /home URL
  return {
    view: 'catalog',
    article: null,
    path: '/home',
    title: 'Quietude — Essays on Sedatephobia & The Fear of Silence',
    description:
      'Struggling with the fear of silence or sedatephobia? Discover the root causes of quiet anxiety, white noise reliance, and simple steps to find lasting calm now.',
  };
}

/**
 * Pushes a clean URL to browser history with zero '#' symbols.
 */
export function pushCleanUrl(cleanPath: string) {
  try {
    if (window.location.pathname !== cleanPath || window.location.hash !== '') {
      window.history.pushState({}, '', cleanPath);
    }
  } catch (err) {
    // In restricted iframe environments, log warning
    console.warn('Could not pushState to history:', err);
  }
}
