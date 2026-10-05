export interface ArticleSection {
  heading: string;
  iconName?: string;
  paragraphs: string[];
  quote?: string;
  sideNote?: string;
}

export interface ArticleImage {
  url: string;
  alt: string;
  caption: string;
  seoTarget: string;
}

export interface Article {
  id: string;
  slug: string;
  folioNumber: number;
  chapterNumber: string;
  chapterCategory: string;
  title: string;
  subtitle: string;
  excerpt: string;
  readTime: string;
  wordCount: number;
  seoKeywords: string[];
  primarySearchQuery: string;
  publishedDate: string;
  image: ArticleImage;
  author: {
    name: string;
    role: string;
  };
  keyTakeaways: string[];
  sections: ArticleSection[];
  reflectionQuestion: string;
  relatedArticleIds: string[];
}

