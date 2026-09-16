export type ReadingMode = 'light' | 'sepia' | 'dark';
export type FontSize = 'sm' | 'base' | 'lg';
export type ViewMode = 'auto' | 'single' | 'spread';

export interface ChartData {
  type: 'bar' | 'line' | 'pie' | 'composed';
  data: any[];
  xAxisKey?: string;
  series: {
    key: string;
    name: string;
    color?: string;
    colors?: string[]; // for pie
    type?: 'bar' | 'line';
  }[];
}

export interface TableData {
  headers: string[];
  rows: (string | number)[][];
}

export interface CardItem {
  id: string;
  title: string;
  subtitle?: string;
  category?: string;
  badge?: string;
  badgeColor?: string;
  content: string[];
  stat?: {
    value: string;
    label: string;
    change?: string;
    source?: string;
  };
  quote?: string;
  imageUrl?: string;
  imageAlt?: string;
  chart?: ChartData;
  table?: TableData;
  listType?: 'bullet' | 'number' | 'checklist';
  styleVariant?: 'default' | 'accent' | 'highlight' | 'contrast' | 'quote' | 'metric';
}

export interface BookPage {
  id: string;
  pageNumber: number;
  chapterId: string;
  chapterTitle: string;
  pageTitle: string;
  subtitle?: string;
  layout: 'cover' | 'toc' | 'two-column' | 'three-column' | 'four-grid' | 'hero-split' | 'comparison' | 'timeline' | 'conclusion';
  headerTag?: string;
  cards: CardItem[];
  footerNote?: string;
  backgroundTheme?: string;
}

export interface Chapter {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  pageCount: number;
  color: string;
  startPage: number;
}

export interface EBook {
  id: string;
  title: string;
  subtitle: string;
  edition: string;
  publishedDate: string;
  chapters: Chapter[];
  pages: BookPage[];
  lastModified: number;
}

export interface Bookmark {
  id: string;
  pageId: string;
  pageNumber: number;
  chapterTitle: string;
  pageTitle: string;
  createdAt: number;
}

export interface Note {
  id: string;
  pageId: string;
  pageNumber: number;
  text: string;
  createdAt: number;
  color?: string;
}

export interface UserPreferences {
  readingMode: ReadingMode;
  fontSize: FontSize;
  soundEnabled: boolean;
  viewMode: ViewMode;
  autoPlay: boolean;
}
