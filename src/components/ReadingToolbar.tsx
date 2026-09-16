import React from 'react';
import { EBook, ReadingMode, FontSize, ViewMode } from '../types';
import {
  BookOpen,
  List,
  Sun,
  Moon,
  Coffee,
  Type,
  Volume2,
  VolumeX,
  FileDown,
  Edit3,
  StickyNote,
  Columns,
  Square,
  Home,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface ReadingToolbarProps {
  book: EBook;
  currentPage: number;
  readingMode: ReadingMode;
  fontSize: FontSize;
  viewMode: ViewMode;
  soundEnabled: boolean;
  notesCount: number;
  bookmarksCount: number;
  onChangeReadingMode: (mode: ReadingMode) => void;
  onChangeFontSize: (size: FontSize) => void;
  onToggleSound: () => void;
  onOpenToc: () => void;
  onOpenNotes: () => void;
  onOpenPdfExport: () => void;
  onOpenEditor: () => void;
  onNavigatePage: (page: number) => void;
}

export const ReadingToolbar: React.FC<ReadingToolbarProps> = ({
  book,
  currentPage,
  readingMode,
  fontSize,
  soundEnabled,
  notesCount,
  bookmarksCount,
  onChangeReadingMode,
  onChangeFontSize,
  onToggleSound,
  onOpenToc,
  onOpenNotes,
  onOpenPdfExport,
  onOpenEditor,
  onNavigatePage,
}) => {
  const isDark = readingMode === 'dark';
  const isSepia = readingMode === 'sepia';

  const totalPages = book.pages.length;

  return (
    <header
      id="reading-toolbar-header"
      className={`sticky top-0 z-40 w-full backdrop-blur-md transition-colors border-b select-none ${
        isDark
          ? 'bg-neutral-950/85 border-neutral-800/80 text-neutral-100'
          : isSepia
          ? 'bg-[#f7f1e5]/90 border-[#e3d3bd] text-[#2e261d]'
          : 'bg-white/90 border-neutral-200/80 text-neutral-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-2">
        {/* Left Section: Book Brand & Cover shortcut */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={() => onNavigatePage(1)}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            title="표지로 이동"
          >
            <div className="w-8 h-8 rounded-xl bg-emerald-500 flex items-center justify-center text-neutral-950 font-bold shadow-xs">
              <BookOpen className="w-4 h-4" />
            </div>
            <div className="hidden sm:block text-left">
              <h1 className="text-sm font-serif font-bold tracking-tight leading-tight">
                인사이트 리포트
              </h1>
              <p className="text-[10px] text-neutral-400 font-mono">
                INTERACTIVE E-BOOK
              </p>
            </div>
          </button>

          {/* Table of Contents Button */}
          <button
            id="btn-toolbar-toc"
            onClick={onOpenToc}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold hover:bg-neutral-200/60 dark:hover:bg-neutral-800 transition-colors"
            title="목차 열기"
          >
            <List className="w-4 h-4 text-emerald-500" />
            <span className="hidden md:inline">목차</span>
          </button>
        </div>

        {/* Center Section: Quick Page Indicator */}
        <div className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => onNavigatePage(Math.max(1, currentPage - 1))}
            disabled={currentPage <= 1}
            className="p-1 rounded text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 disabled:opacity-25"
            title="이전 페이지"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-baseline gap-1 text-xs font-mono font-semibold px-2 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-800/80">
            <span className="text-emerald-600 dark:text-emerald-400">
              {currentPage}
            </span>
            <span className="text-neutral-400">/</span>
            <span className="text-neutral-500 dark:text-neutral-400">
              {totalPages}
            </span>
          </div>

          <button
            onClick={() => onNavigatePage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage >= totalPages}
            className="p-1 rounded text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 disabled:opacity-25"
            title="다음 페이지"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Right Section: Tools (Theme, Font, Notes, PDF, Edit) */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          {/* Reading Theme Toggle: Light, Sepia, Dark */}
          <div className="flex items-center bg-neutral-100 dark:bg-neutral-800/80 p-0.5 rounded-xl">
            <button
              onClick={() => onChangeReadingMode('light')}
              className={`p-1.5 rounded-lg transition-all ${
                readingMode === 'light'
                  ? 'bg-white shadow-xs text-amber-500'
                  : 'text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200'
              }`}
              title="라이트 모드"
            >
              <Sun className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onChangeReadingMode('sepia')}
              className={`p-1.5 rounded-lg transition-all ${
                readingMode === 'sepia'
                  ? 'bg-[#f4ebd9] shadow-xs text-amber-800 font-bold'
                  : 'text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200'
              }`}
              title="세피아 독서 모드"
            >
              <Coffee className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onChangeReadingMode('dark')}
              className={`p-1.5 rounded-lg transition-all ${
                readingMode === 'dark'
                  ? 'bg-neutral-700 shadow-xs text-emerald-400'
                  : 'text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200'
              }`}
              title="다크 모드"
            >
              <Moon className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Font Size Toggle */}
          <div className="hidden sm:flex items-center bg-neutral-100 dark:bg-neutral-800/80 p-0.5 rounded-xl">
            {(['sm', 'base', 'lg'] as FontSize[]).map((sz) => (
              <button
                key={sz}
                onClick={() => onChangeFontSize(sz)}
                className={`px-2 py-1 rounded-lg text-[11px] font-bold transition-all ${
                  fontSize === sz
                    ? 'bg-white dark:bg-neutral-700 shadow-xs text-neutral-900 dark:text-white'
                    : 'text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200'
                }`}
                title={`글자 크기 ${sz.toUpperCase()}`}
              >
                {sz === 'sm' ? 'A-' : sz === 'base' ? 'A' : 'A+'}
              </button>
            ))}
          </div>

          {/* Audio Page Turn Sound Toggle */}
          <button
            onClick={onToggleSound}
            className={`p-2 rounded-xl transition-colors ${
              soundEnabled
                ? 'text-emerald-500 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                : 'text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
            }`}
            title={soundEnabled ? '페이지 넘김 소리 켜짐' : '페이지 넘김 소리 꺼짐'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Notes & Bookmarks Drawer Trigger */}
          <button
            id="btn-toolbar-notes"
            onClick={onOpenNotes}
            className="relative p-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-300 transition-colors"
            title="독서 메모 및 북마크 보기"
          >
            <StickyNote className="w-4 h-4" />
            {(notesCount > 0 || bookmarksCount > 0) && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-500" />
            )}
          </button>

          {/* PDF Export Button */}
          <button
            id="btn-toolbar-pdf"
            onClick={onOpenPdfExport}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-950 text-xs font-bold hover:opacity-90 transition-opacity shadow-xs"
            title="PDF로 저장 / 인쇄"
          >
            <FileDown className="w-3.5 h-3.5" />
            <span className="hidden md:inline">PDF 저장</span>
          </button>

          {/* Book Editor Button */}
          <button
            id="btn-toolbar-edit"
            onClick={onOpenEditor}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 text-xs font-bold transition-all shadow-xs"
            title="전자책 카드 수정 및 추가"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span className="hidden md:inline">전자책 편집</span>
          </button>
        </div>
      </div>
    </header>
  );
};
