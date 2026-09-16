import React from 'react';
import { Chapter, ReadingMode } from '../types';

interface ChapterQuickBarProps {
  chapters: Chapter[];
  currentPage: number;
  readingMode: ReadingMode;
  onSelectChapter: (chapterIndex: number) => void;
}

export const ChapterQuickBar: React.FC<ChapterQuickBarProps> = ({
  chapters,
  currentPage,
  readingMode,
  onSelectChapter,
}) => {
  const isDark = readingMode === 'dark';
  const isSepia = readingMode === 'sepia';

  const getActiveChapterIndex = () => {
    if (currentPage < 3) return -1;
    for (let i = chapters.length - 1; i >= 0; i--) {
      if (currentPage >= chapters[i].startPage) return i;
    }
    return 0;
  };

  const activeIdx = getActiveChapterIndex();

  return (
    <nav
      className={`w-full max-w-7xl mx-auto px-3 sm:px-6 py-2 flex items-center justify-between gap-2 overflow-x-auto no-scrollbar select-none text-xs border-t ${
        isDark
          ? 'bg-neutral-950/90 border-neutral-800 text-neutral-300'
          : isSepia
          ? 'bg-[#f7f1e5]/90 border-[#e3d3bd] text-[#42362b]'
          : 'bg-white/90 border-neutral-200 text-neutral-700'
      }`}
    >
      <div className="flex items-center gap-1.5 whitespace-nowrap overflow-x-auto py-1">
        <button
          onClick={() => onSelectChapter(1)}
          className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
            currentPage === 1
              ? 'bg-emerald-500 text-neutral-950 font-bold'
              : 'hover:bg-neutral-200/60 dark:hover:bg-neutral-800 text-neutral-500 dark:text-neutral-400'
          }`}
        >
          표지
        </button>

        <button
          onClick={() => onSelectChapter(2)}
          className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
            currentPage === 2
              ? 'bg-emerald-500 text-neutral-950 font-bold'
              : 'hover:bg-neutral-200/60 dark:hover:bg-neutral-800 text-neutral-500 dark:text-neutral-400'
          }`}
        >
          목차
        </button>

        <div className="w-[1px] h-4 bg-neutral-300 dark:bg-neutral-700 mx-1 shrink-0" />

        {chapters.map((ch, idx) => {
          const isAct = activeIdx === idx;
          return (
            <button
              key={ch.id}
              onClick={() => onSelectChapter(ch.startPage)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 shrink-0 ${
                isAct
                  ? 'bg-emerald-500 text-neutral-950 font-bold shadow-xs'
                  : 'hover:bg-neutral-200/60 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
              }`}
            >
              <span className="font-mono text-[11px] opacity-75">{ch.number}</span>
              <span className="truncate max-w-[120px] sm:max-w-none">{ch.title}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
