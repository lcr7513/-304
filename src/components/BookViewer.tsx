import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { EBook, ReadingMode, FontSize, ViewMode, Bookmark, Note, BookPage } from '../types';
import { FlipPage } from './FlipPage';
import { BookCover } from './BookCover';
import { soundEngine } from '../utils/audio';
import { ChevronLeft, ChevronRight, BookOpen, Volume2, VolumeX, Maximize2, Minimize2 } from 'lucide-react';

interface BookViewerProps {
  book: EBook;
  currentPage: number;
  readingMode: ReadingMode;
  fontSize: FontSize;
  viewMode: ViewMode;
  soundEnabled: boolean;
  bookmarks: Bookmark[];
  notes: Note[];
  onPageChange: (newPage: number) => void;
  onToggleBookmark: (page: BookPage) => void;
  onAddNote: (page: BookPage) => void;
  onOpenToc: () => void;
}

export const BookViewer: React.FC<BookViewerProps> = ({
  book,
  currentPage,
  readingMode,
  fontSize,
  viewMode,
  soundEnabled,
  bookmarks,
  notes,
  onPageChange,
  onToggleBookmark,
  onAddNote,
  onOpenToc,
}) => {
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Check window width for responsive 1-page vs 2-page spread
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalPages = book.pages.length;

  // Dual page logic
  // If viewMode === 'spread' or ('auto' && !isMobile) AND currentPage > 1:
  // Render spread: left page = even, right page = odd
  const isSpread =
    !isMobile && (viewMode === 'spread' || viewMode === 'auto') && currentPage > 1;

  // Normalized page numbers for spread:
  // When in spread, if currentPage is even, left = currentPage, right = currentPage + 1
  // If currentPage is odd, left = currentPage - 1, right = currentPage
  const leftPageNum = isSpread
    ? currentPage % 2 === 0
      ? currentPage
      : currentPage - 1
    : currentPage;
  const rightPageNum = isSpread ? leftPageNum + 1 : null;

  const leftPage = book.pages.find((p) => p.pageNumber === leftPageNum);
  const rightPage = rightPageNum
    ? book.pages.find((p) => p.pageNumber === rightPageNum)
    : null;

  // Page turn action
  const goToNextPage = useCallback(() => {
    const step = isSpread ? 2 : 1;
    if (currentPage < totalPages) {
      setDirection(1);
      soundEngine.playFlipSound(soundEnabled);
      const next = Math.min(currentPage + step, totalPages);
      onPageChange(next);
    }
  }, [currentPage, totalPages, isSpread, soundEnabled, onPageChange]);

  const goToPrevPage = useCallback(() => {
    const step = isSpread ? 2 : 1;
    if (currentPage > 1) {
      setDirection(-1);
      soundEngine.playFlipSound(soundEnabled);
      const prev = Math.max(currentPage - step, 1);
      onPageChange(prev);
    }
  }, [currentPage, isSpread, soundEnabled, onPageChange]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['input', 'textarea'].includes((e.target as HTMLElement)?.tagName?.toLowerCase())) {
        return;
      }
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        goToNextPage();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        goToPrevPage();
      } else if (e.key === 'Home') {
        e.preventDefault();
        onPageChange(1);
      } else if (e.key === 'End') {
        e.preventDefault();
        onPageChange(totalPages);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNextPage, goToPrevPage, totalPages, onPageChange]);

  // Touch gestures for mobile
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNextPage();
    } else if (isRightSwipe) {
      goToPrevPage();
    }
  };

  // Flip Animation Variants for 3D realism
  const flipVariants = {
    enter: (dir: number) => ({
      rotateY: dir > 0 ? 30 : -30,
      opacity: 0,
      scale: 0.96,
      x: dir > 0 ? 40 : -40,
    }),
    center: {
      rotateY: 0,
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: 0.38,
        ease: [0.25, 1, 0.5, 1],
      },
    },
    exit: (dir: number) => ({
      rotateY: dir > 0 ? -30 : 30,
      opacity: 0,
      scale: 0.96,
      x: dir > 0 ? -40 : 40,
      transition: {
        duration: 0.28,
        ease: [0.25, 1, 0.5, 1],
      },
    }),
  };

  return (
    <div
      ref={containerRef}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      className="relative w-full max-w-7xl mx-auto px-2 sm:px-4 py-4 md:py-6 flex flex-col items-center select-none"
      style={{ perspective: '1600px' }}
    >
      {/* Navigation Buttons (Floating Left/Right) */}
      <button
        id="btn-prev-page"
        onClick={goToPrevPage}
        disabled={currentPage <= 1}
        className={`fixed left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/90 dark:bg-neutral-800/90 text-neutral-800 dark:text-neutral-100 shadow-xl backdrop-blur-sm border border-neutral-200 dark:border-neutral-700 transition-all ${
          currentPage <= 1
            ? 'opacity-0 pointer-events-none'
            : 'hover:scale-110 hover:bg-white dark:hover:bg-neutral-800 active:scale-95'
        }`}
        title="이전 페이지 (←)"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <button
        id="btn-next-page"
        onClick={goToNextPage}
        disabled={currentPage >= totalPages}
        className={`fixed right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/90 dark:bg-neutral-800/90 text-neutral-800 dark:text-neutral-100 shadow-xl backdrop-blur-sm border border-neutral-200 dark:border-neutral-700 transition-all ${
          currentPage >= totalPages
            ? 'opacity-0 pointer-events-none'
            : 'hover:scale-110 hover:bg-white dark:hover:bg-neutral-800 active:scale-95'
        }`}
        title="다음 페이지 (→)"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Book Container with Page Turning Animation */}
      <div
        id="pdf-capture-area"
        className="w-full relative shadow-2xl rounded-2xl overflow-hidden"
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={isSpread ? `spread-${leftPageNum}` : `single-${currentPage}`}
            custom={direction}
            variants={flipVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full origin-center"
          >
            {/* If on page 1 (Cover) */}
            {currentPage === 1 ? (
              <BookCover
                book={book}
                readingMode={readingMode}
                onOpenBook={() => {
                  soundEngine.playFlipSound(soundEnabled);
                  onPageChange(2);
                }}
                onOpenToc={onOpenToc}
              />
            ) : isSpread ? (
              // DUAL PAGE SPREAD (MAGAZINE HARDCOVER LAYOUT)
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 relative bg-neutral-200 dark:bg-neutral-900 rounded-2xl p-1 shadow-2xl">
                {/* Book Center Crease Shadow */}
                <div className="hidden lg:block absolute inset-y-0 left-1/2 -translate-x-1/2 w-10 bg-gradient-to-r from-black/15 via-black/35 to-black/15 pointer-events-none z-20" />
                <div className="hidden lg:block absolute inset-y-0 left-1/2 -translate-x-1/2 w-[1px] bg-black/40 z-30" />

                {/* Left Page */}
                <div className="w-full">
                  {leftPage ? (
                    <FlipPage
                      page={leftPage}
                      totalPages={totalPages}
                      readingMode={readingMode}
                      fontSize={fontSize}
                      side="left"
                      isBookmarked={bookmarks.some((b) => b.pageId === leftPage.id)}
                      notes={notes.filter((n) => n.pageId === leftPage.id)}
                      onToggleBookmark={onToggleBookmark}
                      onAddNote={onAddNote}
                      onNavigatePage={onPageChange}
                    />
                  ) : (
                    <div className="w-full h-full min-h-[620px] bg-neutral-100 dark:bg-neutral-900 rounded-l-2xl border border-dashed border-neutral-300 dark:border-neutral-800" />
                  )}
                </div>

                {/* Right Page */}
                <div className="w-full">
                  {rightPage ? (
                    <FlipPage
                      page={rightPage}
                      totalPages={totalPages}
                      readingMode={readingMode}
                      fontSize={fontSize}
                      side="right"
                      isBookmarked={bookmarks.some((b) => b.pageId === rightPage.id)}
                      notes={notes.filter((n) => n.pageId === rightPage.id)}
                      onToggleBookmark={onToggleBookmark}
                      onAddNote={onAddNote}
                      onNavigatePage={onPageChange}
                    />
                  ) : (
                    <div className="w-full h-full min-h-[620px] flex flex-col items-center justify-center bg-[#faf5eb] dark:bg-neutral-900 rounded-r-2xl p-8 border border-neutral-200 dark:border-neutral-800 text-center">
                      <BookOpen className="w-12 h-12 text-neutral-400 mb-3" />
                      <h4 className="text-lg font-serif font-bold text-neutral-700 dark:text-neutral-300">
                        보고서의 끝입니다
                      </h4>
                      <p className="text-xs text-neutral-400 mt-1 max-w-xs">
                        언제든 편집기를 통해 새로운 페이지를 추가하거나 목차로 돌아갈 수 있습니다.
                      </p>
                      <button
                        onClick={() => onPageChange(1)}
                        className="mt-4 px-4 py-2 text-xs font-semibold rounded-lg bg-neutral-800 dark:bg-neutral-700 text-white hover:opacity-90 transition-opacity"
                      >
                        표지로 돌아가기
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              // SINGLE PAGE VIEW (Mobile or single mode)
              <div className="w-full">
                {leftPage && (
                  <FlipPage
                    page={leftPage}
                    totalPages={totalPages}
                    readingMode={readingMode}
                    fontSize={fontSize}
                    side="single"
                    isBookmarked={bookmarks.some((b) => b.pageId === leftPage.id)}
                    notes={notes.filter((n) => n.pageId === leftPage.id)}
                    onToggleBookmark={onToggleBookmark}
                    onAddNote={onAddNote}
                    onNavigatePage={onPageChange}
                  />
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Reading Progress Indicator */}
      <div className="w-full max-w-lg mt-4 flex items-center justify-between gap-3 text-xs text-neutral-400 dark:text-neutral-500 font-medium">
        <button
          onClick={goToPrevPage}
          disabled={currentPage <= 1}
          className="hover:text-neutral-900 dark:hover:text-neutral-200 disabled:opacity-30 transition-colors"
        >
          이전
        </button>

        <div className="flex-1 mx-2 flex items-center gap-2">
          <input
            type="range"
            min="1"
            max={totalPages}
            value={currentPage}
            onChange={(e) => {
              const val = parseInt(e.target.value, 10);
              soundEngine.playFlipSound(soundEnabled);
              onPageChange(val);
            }}
            className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />
        </div>

        <button
          onClick={goToNextPage}
          disabled={currentPage >= totalPages}
          className="hover:text-neutral-900 dark:hover:text-neutral-200 disabled:opacity-30 transition-colors"
        >
          다음
        </button>
      </div>
    </div>
  );
};
