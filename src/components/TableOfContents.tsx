import React, { useState } from 'react';
import { EBook, ReadingMode } from '../types';
import { X, Search, BookOpen, Layers, CheckCircle2 } from 'lucide-react';

interface TableOfContentsProps {
  isOpen: boolean;
  onClose: () => void;
  book: EBook;
  currentPage: number;
  readingMode: ReadingMode;
  onSelectPage: (pageNumber: number) => void;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({
  isOpen,
  onClose,
  book,
  currentPage,
  readingMode,
  onSelectPage,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const isDark = readingMode === 'dark';
  const isSepia = readingMode === 'sepia';

  // Filter pages by query
  const filteredPages = book.pages.filter((page) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const matchTitle = page.pageTitle.toLowerCase().includes(q);
    const matchChapter = page.chapterTitle.toLowerCase().includes(q);
    const matchCards = page.cards.some(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.content.some((text) => text.toLowerCase().includes(q))
    );
    return matchTitle || matchChapter || matchCards;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className={`w-full max-w-2xl max-h-[85vh] rounded-2xl flex flex-col shadow-2xl overflow-hidden border ${
          isDark
            ? 'bg-neutral-900 border-neutral-800 text-neutral-100'
            : isSepia
            ? 'bg-[#faf5eb] border-[#ded1be] text-[#332a21]'
            : 'bg-white border-neutral-200 text-neutral-900'
        }`}
      >
        {/* Header */}
        <div className="p-5 border-b border-neutral-200/80 dark:border-neutral-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-500" />
            <h3 className="text-lg font-serif font-bold">목차 및 페이지 바로가기</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search input */}
        <div className="p-4 border-b border-neutral-200/80 dark:border-neutral-800">
          <div className="relative">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="리포트 제목, 키워드, 내용 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-9 pr-4 py-2 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all ${
                isDark
                  ? 'bg-neutral-800/80 border-neutral-700 text-neutral-100'
                  : 'bg-neutral-50 border-neutral-200 text-neutral-800'
              }`}
            />
          </div>
        </div>

        {/* Page List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {filteredPages.length === 0 ? (
            <div className="py-12 text-center text-sm text-neutral-400">
              일치하는 리포트 내용이 없습니다.
            </div>
          ) : (
            filteredPages.map((page) => {
              const isCurrent = page.pageNumber === currentPage;
              return (
                <div
                  key={page.id}
                  onClick={() => {
                    onSelectPage(page.pageNumber);
                    onClose();
                  }}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 group ${
                    isCurrent
                      ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30'
                      : isDark
                      ? 'border-neutral-800 hover:border-neutral-700 bg-neutral-800/40 hover:bg-neutral-800'
                      : isSepia
                      ? 'border-[#e6d8c3] hover:border-amber-600/50 bg-white/60 hover:bg-white'
                      : 'border-neutral-200 hover:border-emerald-500/40 bg-neutral-50/50 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs font-bold shrink-0 ${
                        isCurrent
                          ? 'bg-emerald-500 text-white'
                          : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
                      }`}
                    >
                      {page.pageNumber}
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 truncate">
                          {page.chapterTitle}
                        </span>
                        {page.cards.length > 0 && (
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-neutral-200/60 dark:bg-neutral-800 text-neutral-500 shrink-0">
                            {page.cards.length} Cards
                          </span>
                        )}
                      </div>
                      <h4 className="text-sm font-bold truncate group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {page.pageTitle}
                      </h4>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {isCurrent && (
                      <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        현재
                      </span>
                    )}
                    <span className="text-neutral-400 text-sm group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-neutral-200/80 dark:border-neutral-800 text-xs text-neutral-400 flex items-center justify-between">
          <span>총 {book.pages.length}개 페이지</span>
          <span>검색된 결과: {filteredPages.length}개</span>
        </div>
      </div>
    </div>
  );
};
