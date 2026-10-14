// Dynamic SEO updater for unique URLs, titles, and social cards

interface PageSeoConfig {
  title: string;
  description: string;
  path: string;
  type?: 'website' | 'article';
}

export function updatePageSeo(config: PageSeoConfig) {
  try {
    // 1. Update Title
    document.title = config.title;

    // 2. Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', config.description);

    // 3. Update Canonical Link
    const origin =
      typeof window !== 'undefined' && window.location && window.location.origin
        ? window.location.origin
        : '';
    const fullUrl = origin ? `${origin}${config.path}` : config.path;

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', fullUrl);

    // 4. Update OpenGraph Tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', config.title);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', config.description);

    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute('content', fullUrl);
    } else {
      ogUrl = document.createElement('meta');
      ogUrl.setAttribute('property', 'og:url');
      ogUrl.setAttribute('content', fullUrl);
      document.head.appendChild(ogUrl);
    }

    const ogType = document.querySelector('meta[property="og:type"]');
    if (ogType) ogType.setAttribute('content', config.type || 'website');

    // 5. Update Twitter Cards
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) twitterTitle.setAttribute('content', config.title);

    const twitterDesc = document.querySelector('meta[name="twitter:description"]');
    if (twitterDesc) twitterDesc.setAttribute('content', config.description);
  } catch (err) {
    console.warn('Could not update SEO meta tags:', err);
  }
}
