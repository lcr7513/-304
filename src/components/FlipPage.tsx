import React from 'react';
import { BookPage, ReadingMode, FontSize, Bookmark, Note } from '../types';
import { CardRenderer } from './CardRenderer';
import { Bookmark as BookmarkIcon, BookmarkCheck, StickyNote, Plus, Sparkles, BookOpen } from 'lucide-react';

interface FlipPageProps {
  page: BookPage;
  totalPages: number;
  readingMode: ReadingMode;
  fontSize: FontSize;
  isBookmarked: boolean;
  notes: Note[];
  side?: 'left' | 'right' | 'single';
  onToggleBookmark: (page: BookPage) => void;
  onAddNote: (page: BookPage) => void;
  onNavigatePage?: (pageNumber: number) => void;
}

export const FlipPage: React.FC<FlipPageProps> = ({
  page,
  totalPages,
  readingMode,
  fontSize,
  isBookmarked,
  notes,
  side = 'single',
  onToggleBookmark,
  onAddNote,
  onNavigatePage,
}) => {
  const isDark = readingMode === 'dark';
  const isSepia = readingMode === 'sepia';

  // Book paper textures & spine gradients
  const pageBgClass = isDark
    ? 'bg-[#18181b] text-neutral-100'
    : isSepia
    ? 'bg-[#faf5eb] text-[#332a21]'
    : 'bg-[#fcfdfd] text-neutral-900';

  // Subtle spine shadow mimicking real paper curve inside hardcover
  const spineShadowClass =
    side === 'left'
      ? 'shadow-[inset_-16px_0_24px_-10px_rgba(0,0,0,0.1)]'
      : side === 'right'
      ? 'shadow-[inset_16px_0_24px_-10px_rgba(0,0,0,0.1)]'
      : 'shadow-md';

  const gridClass = {
    'two-column': 'grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6',
    'three-column': 'grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5',
    'four-grid': 'grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5',
    'hero-split': 'grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6',
    'comparison': 'grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6',
    'timeline': 'grid grid-cols-1 gap-4',
    'conclusion': 'grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6',
    'toc': 'space-y-4',
    'cover': '',
  }[page.layout] || 'grid grid-cols-1 md:grid-cols-2 gap-4';

  return (
    <div
      id={`book-page-${page.pageNumber}`}
      className={`w-full h-full min-h-[620px] md:min-h-[760px] flex flex-col justify-between p-6 sm:p-8 lg:p-10 rounded-2xl relative overflow-hidden transition-colors duration-200 border border-neutral-200/60 dark:border-neutral-800 ${pageBgClass} ${spineShadowClass}`}
    >
      {/* Top Header / Running Head */}
      <div className="flex items-center justify-between border-b border-neutral-200/80 dark:border-neutral-800 pb-3 mb-6 gap-3">
        <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
          {page.headerTag && (
            <span className="text-[11px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
              {page.headerTag}
            </span>
          )}
          <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 truncate">
            {page.chapterTitle}
          </span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {/* Note indicator badge */}
          {notes.length > 0 && (
            <button
              onClick={() => onAddNote(page)}
              className="flex items-center gap-1 text-[11px] font-medium px-2 py-1 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 hover:opacity-80 transition-opacity"
              title="메모 보기 / 추가"
            >
              <StickyNote className="w-3 h-3" />
              <span>{notes.length}</span>
            </button>
          )}

          {/* Add note button */}
          <button
            id={`btn-add-note-${page.pageNumber}`}
            onClick={() => onAddNote(page)}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            title="이 페이지에 메모 작성"
          >
            <Plus className="w-4 h-4" />
          </button>

          {/* Bookmark button */}
          <button
            id={`btn-bookmark-${page.pageNumber}`}
            onClick={() => onToggleBookmark(page)}
            className={`p-1.5 rounded-lg transition-colors ${
              isBookmarked
                ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/40'
                : 'text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800'
            }`}
            title={isBookmarked ? '북마크 해제' : '북마크 저장'}
          >
            {isBookmarked ? (
              <BookmarkCheck className="w-4 h-4 fill-current" />
            ) : (
              <BookmarkIcon className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Page Title & Subtitle Area */}
      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
          {page.pageTitle}
        </h2>
        {page.subtitle && (
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1.5 font-medium leading-relaxed">
            {page.subtitle}
          </p>
        )}
      </div>

      {/* Main Page Layout */}
      <div className="flex-1 my-auto">
        {page.layout === 'toc' ? (
          // TABLE OF CONTENTS SPECIAL VIEW
          <div className="space-y-3">
            {page.cards.map((tocItem, idx) => (
              <div
                key={tocItem.id}
                onClick={() => {
                  // Jump to corresponding page (ch1 starts at 3, ch2 starts at 7, ch3 at 12, ch4 at 14, ch5 at 16)
                  const targetPageMap = [3, 7, 12, 14, 16];
                  const target = targetPageMap[idx] || (idx + 3);
                  onNavigatePage?.(target);
                }}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-4 group ${
                  isDark
                    ? 'bg-neutral-900/60 border-neutral-800 hover:border-emerald-500/50 hover:bg-neutral-900'
                    : isSepia
                    ? 'bg-[#f4ebd9]/80 border-[#e1d2b8] hover:border-amber-600 hover:bg-[#efe3ce]'
                    : 'bg-white border-neutral-200 hover:border-emerald-500 hover:shadow-md'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                      {tocItem.category}
                    </span>
                    <h4 className="text-base sm:text-lg font-bold group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {tocItem.title}
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
                    {tocItem.subtitle}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0 self-center">
                  <span className="text-xs font-mono font-medium text-neutral-400">
                    {tocItem.badge}
                  </span>
                  <span className="text-emerald-500 group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // STANDARD CARD LAYOUT
          <div className={gridClass}>
            {page.cards.map((card, idx) => (
              <CardRenderer
                key={card.id}
                card={card}
                index={idx}
                readingMode={readingMode}
                fontSize={fontSize}
              />
            ))}
          </div>
        )}
      </div>

      {/* Page Footer */}
      <div className="mt-6 pt-3 border-t border-neutral-200/80 dark:border-neutral-800 flex items-center justify-between text-xs text-neutral-400 dark:text-neutral-500">
        <div className="flex items-center gap-2">
          <BookOpen className="w-3.5 h-3.5" />
          <span className="truncate max-w-[200px] sm:max-w-md">
            {page.footerNote || '인사이트 리포트 전자책'}
          </span>
        </div>

        <div className="flex items-center gap-1 font-mono font-semibold">
          <span className="text-neutral-900 dark:text-neutral-100 text-sm">
            {page.pageNumber}
          </span>
          <span className="text-neutral-400">/</span>
          <span>{totalPages}</span>
        </div>
      </div>
    </div>
  );
};
