import { EBook, Bookmark, Note, UserPreferences } from '../types';
import { initialBookData } from '../data/initialBookData';

const STORAGE_KEYS = {
  BOOK_DATA: 'ebook_app_data_v1',
  BOOKMARKS: 'ebook_app_bookmarks_v1',
  NOTES: 'ebook_app_notes_v1',
  PREFERENCES: 'ebook_app_preferences_v1',
  LAST_READ_PAGE: 'ebook_app_last_read_page_v1',
};

export const defaultPreferences: UserPreferences = {
  readingMode: 'light',
  fontSize: 'base',
  soundEnabled: true,
  viewMode: 'auto',
  autoPlay: false,
};

export function loadBookData(): EBook {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.BOOK_DATA);
    if (!raw) return initialBookData;
    const parsed = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.pages) || parsed.pages.length === 0) {
      return initialBookData;
    }
    return parsed;
  } catch {
    return initialBookData;
  }
}

export function saveBookData(data: EBook): void {
  try {
    const updated = { ...data, lastModified: Date.now() };
    localStorage.setItem(STORAGE_KEYS.BOOK_DATA, JSON.stringify(updated));
  } catch (err) {
    console.warn('Failed to persist book data to localStorage:', err);
  }
}

export function resetBookData(): EBook {
  try {
    localStorage.removeItem(STORAGE_KEYS.BOOK_DATA);
  } catch (err) {
    console.warn('Failed to clear book data:', err);
  }
  return initialBookData;
}

export function loadBookmarks(): Bookmark[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveBookmarks(bookmarks: Bookmark[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarks));
  } catch (err) {
    console.warn('Failed to save bookmarks:', err);
  }
}

export function loadNotes(): Note[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.NOTES);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveNotes(notes: Note[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(notes));
  } catch (err) {
    console.warn('Failed to save notes:', err);
  }
}

export function loadPreferences(): UserPreferences {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PREFERENCES);
    return raw ? { ...defaultPreferences, ...JSON.parse(raw) } : defaultPreferences;
  } catch {
    return defaultPreferences;
  }
}

export function savePreferences(prefs: UserPreferences): void {
  try {
    localStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(prefs));
  } catch (err) {
    console.warn('Failed to save preferences:', err);
  }
}

export function loadLastReadPage(): number {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.LAST_READ_PAGE);
    const num = raw ? parseInt(raw, 10) : 1;
    return Number.isFinite(num) && num >= 1 ? num : 1;
  } catch {
    return 1;
  }
}

export function saveLastReadPage(pageNumber: number): void {
  try {
    localStorage.setItem(STORAGE_KEYS.LAST_READ_PAGE, pageNumber.toString());
  } catch (err) {
    console.warn('Failed to save last read page:', err);
  }
}
