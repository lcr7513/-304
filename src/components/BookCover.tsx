import React from 'react';
import { EBook, ReadingMode } from '../types';
import { BookOpen, Sparkles, ArrowRight, Layers, Bookmark } from 'lucide-react';

interface BookCoverProps {
  book: EBook;
  readingMode: ReadingMode;
  onOpenBook: () => void;
  onOpenToc: () => void;
}

export const BookCover: React.FC<BookCoverProps> = ({
  book,
  readingMode,
  onOpenBook,
  onOpenToc,
}) => {
  const isDark = readingMode === 'dark';
  const isSepia = readingMode === 'sepia';

  return (
    <div
      id="book-cover-container"
      className={`w-full h-full min-h-[620px] md:min-h-[720px] flex flex-col justify-between p-8 md:p-12 rounded-2xl relative overflow-hidden transition-colors duration-300 border ${
        isDark
          ? 'bg-neutral-950 text-neutral-100 border-neutral-800'
          : isSepia
          ? 'bg-[#f6f0e4] text-[#2c241b] border-[#decbb2]'
          : 'bg-gradient-to-br from-neutral-900 via-neutral-950 to-stone-900 text-white border-neutral-800'
      }`}
    >
      {/* Decorative subtle texture & geometry */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 border border-white/5 m-4 rounded-xl pointer-events-none" />

      {/* Top Meta */}
      <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-mono tracking-wider uppercase text-emerald-400 font-semibold">
            {book.edition}
          </span>
        </div>
        <span className="text-xs font-mono text-neutral-400">
          {book.publishedDate}
        </span>
      </div>

      {/* Center Hero Editorial Title */}
      <div className="relative z-10 my-auto py-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-medium tracking-wide mb-6 backdrop-blur-sm">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>INTERACTIVE E-BOOK REPORT</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight leading-tight mb-4 text-white">
          {book.title}
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-neutral-300 max-w-2xl font-light leading-relaxed mb-8">
          {book.subtitle}
        </p>

        {/* Chapter pills */}
        <div className="flex flex-wrap gap-2 pt-2">
          {book.chapters.map((ch) => (
            <span
              key={ch.id}
              className="text-xs px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 font-medium transition-colors"
            >
              {ch.number}. {ch.title}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom CTA and Navigation */}
      <div className="relative z-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs text-neutral-400">
          <Layers className="w-4 h-4 text-neutral-400" />
          <span>총 {book.pages.length}개 페이지 수록 · 3D 플립북 지원</span>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            id="btn-cover-toc"
            onClick={onOpenToc}
            className="flex-1 sm:flex-none px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <Bookmark className="w-4 h-4" />
            <span>목차 확인</span>
          </button>

          <button
            id="btn-open-book"
            onClick={onOpenBook}
            className="flex-1 sm:flex-none px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 text-sm font-bold transition-all shadow-lg hover:shadow-emerald-500/25 flex items-center justify-center gap-2 group"
          >
            <BookOpen className="w-4 h-4" />
            <span>전자책 읽기 시작</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
