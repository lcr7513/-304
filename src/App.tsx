/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { EBook, BookPage, Bookmark, Note, UserPreferences, ReadingMode, FontSize } from './types';
import {
  loadBookData,
  saveBookData,
  resetBookData,
  loadBookmarks,
  saveBookmarks,
  loadNotes,
  saveNotes,
  loadPreferences,
  savePreferences,
  loadLastReadPage,
  saveLastReadPage,
} from './utils/storage';
import { BookViewer } from './components/BookViewer';
import { ReadingToolbar } from './components/ReadingToolbar';
import { ChapterQuickBar } from './components/ChapterQuickBar';
import { TableOfContents } from './components/TableOfContents';
import { NotesDrawer } from './components/NotesDrawer';
import { PdfExportModal } from './components/PdfExportModal';
import { BookEditorModal } from './components/BookEditorModal';
import { PrintView } from './components/PrintView';
import { soundEngine } from './utils/audio';

export default function App() {
  // Core Book State
  const [book, setBook] = useState<EBook>(() => loadBookData());
  const [currentPage, setCurrentPage] = useState<number>(() => {
    const saved = loadLastReadPage();
    const data = loadBookData();
    return saved <= data.pages.length ? saved : 1;
  });

  // User Interactive States
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(() => loadBookmarks());
  const [notes, setNotes] = useState<Note[]>(() => loadNotes());
  const [preferences, setPreferences] = useState<UserPreferences>(() => loadPreferences());

  // Modals & Drawers
  const [isTocOpen, setIsTocOpen] = useState(false);
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  // Sync page changes with storage
  const handlePageChange = useCallback((newPage: number) => {
    setCurrentPage(newPage);
    saveLastReadPage(newPage);
  }, []);

  // Bookmark actions
  const handleToggleBookmark = useCallback((page: BookPage) => {
    setBookmarks((prev) => {
      const exists = prev.some((b) => b.pageId === page.id);
      let updated: Bookmark[];
      if (exists) {
        updated = prev.filter((b) => b.pageId !== page.id);
      } else {
        const newBookmark: Bookmark = {
          id: `bm-${Date.now()}`,
          pageId: page.id,
          pageNumber: page.pageNumber,
          chapterTitle: page.chapterTitle,
          pageTitle: page.pageTitle,
          createdAt: Date.now(),
        };
        updated = [newBookmark, ...prev];
      }
      saveBookmarks(updated);
      return updated;
    });
  }, []);

  const handleRemoveBookmark = useCallback((pageId: string) => {
    setBookmarks((prev) => {
      const updated = prev.filter((b) => b.pageId !== pageId);
      saveBookmarks(updated);
      return updated;
    });
  }, []);

  // Notes actions
  const handleAddNote = useCallback((text: string, pageId: string, pageNumber: number) => {
    setNotes((prev) => {
      const newNote: Note = {
        id: `note-${Date.now()}`,
        pageId,
        pageNumber,
        text,
        createdAt: Date.now(),
      };
      const updated = [newNote, ...prev];
      saveNotes(updated);
      return updated;
    });
  }, []);

  const handleDeleteNote = useCallback((noteId: string) => {
    setNotes((prev) => {
      const updated = prev.filter((n) => n.id !== noteId);
      saveNotes(updated);
      return updated;
    });
  }, []);

  // Preferences updates
  const handleChangeReadingMode = useCallback((readingMode: ReadingMode) => {
    setPreferences((prev) => {
      const updated = { ...prev, readingMode };
      savePreferences(updated);
      return updated;
    });
  }, []);

  const handleChangeFontSize = useCallback((fontSize: FontSize) => {
    setPreferences((prev) => {
      const updated = { ...prev, fontSize };
      savePreferences(updated);
      return updated;
    });
  }, []);

  const handleToggleSound = useCallback(() => {
    setPreferences((prev) => {
      const updated = { ...prev, soundEnabled: !prev.soundEnabled };
      savePreferences(updated);
      if (updated.soundEnabled) {
        soundEngine.playFlipSound(true);
      }
      return updated;
    });
  }, []);

  // Book editor & persist
  const handleSaveBook = useCallback((updatedBook: EBook) => {
    setBook(updatedBook);
    saveBookData(updatedBook);
  }, []);

  const handleResetBook = useCallback(() => {
    const original = resetBookData();
    setBook(original);
    setCurrentPage(1);
    saveLastReadPage(1);
  }, []);

  // Resolve current active page object
  const activePage = book.pages.find((p) => p.pageNumber === currentPage);

  // Background style based on readingMode
  const bgClass = {
    light: 'bg-[#f4f4f5]',
    sepia: 'bg-[#f3ede1]',
    dark: 'bg-[#09090b]',
  }[preferences.readingMode];

  return (
    <>
      <div className={`min-h-screen flex flex-col transition-colors duration-300 ${bgClass} print:hidden`}>
        {/* Top Reading Toolbar */}
      <ReadingToolbar
        book={book}
        currentPage={currentPage}
        readingMode={preferences.readingMode}
        fontSize={preferences.fontSize}
        viewMode={preferences.viewMode}
        soundEnabled={preferences.soundEnabled}
        notesCount={notes.length}
        bookmarksCount={bookmarks.length}
        onChangeReadingMode={handleChangeReadingMode}
        onChangeFontSize={handleChangeFontSize}
        onToggleSound={handleToggleSound}
        onOpenToc={() => setIsTocOpen(true)}
        onOpenNotes={() => setIsNotesOpen(true)}
        onOpenPdfExport={() => setIsPdfModalOpen(true)}
        onOpenEditor={() => setIsEditorOpen(true)}
        onNavigatePage={handlePageChange}
      />

      {/* Main Flipbook Viewer Canvas */}
      <main className="flex-1 flex flex-col justify-center items-center py-2 sm:py-4 px-2">
        <BookViewer
          book={book}
          currentPage={currentPage}
          readingMode={preferences.readingMode}
          fontSize={preferences.fontSize}
          viewMode={preferences.viewMode}
          soundEnabled={preferences.soundEnabled}
          bookmarks={bookmarks}
          notes={notes}
          onPageChange={handlePageChange}
          onToggleBookmark={handleToggleBookmark}
          onAddNote={() => setIsNotesOpen(true)}
          onOpenToc={() => setIsTocOpen(true)}
        />
      </main>

      {/* Bottom Chapter Quick Bar */}
      <ChapterQuickBar
        chapters={book.chapters}
        currentPage={currentPage}
        readingMode={preferences.readingMode}
        onSelectChapter={handlePageChange}
      />

      {/* Table of Contents Modal */}
      <TableOfContents
        isOpen={isTocOpen}
        onClose={() => setIsTocOpen(false)}
        book={book}
        currentPage={currentPage}
        readingMode={preferences.readingMode}
        onSelectPage={handlePageChange}
      />

      {/* Notes & Bookmarks Drawer */}
      <NotesDrawer
        isOpen={isNotesOpen}
        onClose={() => setIsNotesOpen(false)}
        currentPage={activePage}
        bookmarks={bookmarks}
        notes={notes}
        readingMode={preferences.readingMode}
        onNavigatePage={handlePageChange}
        onRemoveBookmark={handleRemoveBookmark}
        onAddNote={handleAddNote}
        onDeleteNote={handleDeleteNote}
      />

      {/* PDF Export & Print Modal */}
      <PdfExportModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        book={book}
        currentPage={activePage}
        readingMode={preferences.readingMode}
      />

      {/* Book & Card Content Editor */}
      <BookEditorModal
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        book={book}
        readingMode={preferences.readingMode}
        onSaveBook={handleSaveBook}
        onResetBook={handleResetBook}
      />
    </div>
    <PrintView book={book} />
    </>
  );
}
