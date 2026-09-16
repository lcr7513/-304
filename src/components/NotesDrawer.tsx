import React, { useState } from 'react';
import { Bookmark, Note, BookPage, ReadingMode } from '../types';
import { X, Bookmark as BookmarkIcon, StickyNote, Trash2, ArrowRight, Plus } from 'lucide-react';

interface NotesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage: BookPage | undefined;
  bookmarks: Bookmark[];
  notes: Note[];
  readingMode: ReadingMode;
  onNavigatePage: (pageNumber: number) => void;
  onRemoveBookmark: (pageId: string) => void;
  onAddNote: (text: string, pageId: string, pageNumber: number) => void;
  onDeleteNote: (noteId: string) => void;
}

export const NotesDrawer: React.FC<NotesDrawerProps> = ({
  isOpen,
  onClose,
  currentPage,
  bookmarks,
  notes,
  readingMode,
  onNavigatePage,
  onRemoveBookmark,
  onAddNote,
  onDeleteNote,
}) => {
  const [activeTab, setActiveTab] = useState<'notes' | 'bookmarks'>('notes');
  const [newNoteText, setNewNoteText] = useState('');

  if (!isOpen) return null;

  const isDark = readingMode === 'dark';
  const isSepia = readingMode === 'sepia';

  const handleSaveNewNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim() || !currentPage) return;
    onAddNote(newNoteText.trim(), currentPage.id, currentPage.pageNumber);
    setNewNoteText('');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className={`w-full max-w-md h-full shadow-2xl flex flex-col border-l animate-in slide-in-from-right duration-300 ${
          isDark
            ? 'bg-neutral-900 border-neutral-800 text-neutral-100'
            : isSepia
            ? 'bg-[#fcf8f2] border-[#e7dac5] text-[#342b21]'
            : 'bg-white border-neutral-200 text-neutral-900'
        }`}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-neutral-200/80 dark:border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-800 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('notes')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'notes'
                  ? 'bg-white dark:bg-neutral-700 shadow-xs text-neutral-900 dark:text-white'
                  : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <StickyNote className="w-3.5 h-3.5" />
              <span>독서 메모 ({notes.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('bookmarks')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'bookmarks'
                  ? 'bg-white dark:bg-neutral-700 shadow-xs text-neutral-900 dark:text-white'
                  : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <BookmarkIcon className="w-3.5 h-3.5" />
              <span>북마크 ({bookmarks.length})</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {activeTab === 'notes' ? (
            <>
              {/* Form to add note to current page */}
              {currentPage && (
                <form onSubmit={handleSaveNewNote} className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 font-medium">
                    <span>현재 페이지({currentPage.pageNumber}p)에 메모 남기기:</span>
                  </div>
                  <textarea
                    rows={3}
                    value={newNoteText}
                    onChange={(e) => setNewNoteText(e.target.value)}
                    placeholder="인상 깊은 인사이트, 질문, 아이디어를 적어보세요..."
                    className={`w-full p-3 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all resize-none ${
                      isDark
                        ? 'bg-neutral-800/80 border-neutral-700 text-neutral-100'
                        : 'bg-neutral-50 border-neutral-200 text-neutral-900'
                    }`}
                  />
                  <button
                    type="submit"
                    disabled={!newNoteText.trim()}
                    className="w-full py-2 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 text-neutral-950 text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>메모 저장하기</span>
                  </button>
                </form>
              )}

              {/* Notes List */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                  저장된 메모 목록
                </h4>
                {notes.length === 0 ? (
                  <div className="py-12 text-center text-xs text-neutral-400">
                    아직 작성된 메모가 없습니다.
                  </div>
                ) : (
                  notes.map((note) => (
                    <div
                      key={note.id}
                      className={`p-3.5 rounded-xl border space-y-2 transition-all ${
                        isDark
                          ? 'bg-neutral-800/60 border-neutral-800'
                          : isSepia
                          ? 'bg-[#f5ecdc] border-[#e6d8c3]'
                          : 'bg-neutral-50 border-neutral-200'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[11px] text-neutral-400">
                        <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                          {note.pageNumber} 페이지
                        </span>
                        <span>{new Date(note.createdAt).toLocaleDateString()}</span>
                      </div>
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">
                        {note.text}
                      </p>
                      <div className="flex items-center justify-between pt-2 border-t border-neutral-200/50 dark:border-neutral-700/50">
                        <button
                          onClick={() => {
                            onNavigatePage(note.pageNumber);
                            onClose();
                          }}
                          className="text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
                        >
                          <span>페이지로 이동</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => onDeleteNote(note.id)}
                          className="text-neutral-400 hover:text-rose-500 transition-colors p-1"
                          title="메모 삭제"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </>
          ) : (
            // BOOKMARKS TAB
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                북마크된 페이지
              </h4>
              {bookmarks.length === 0 ? (
                <div className="py-12 text-center text-xs text-neutral-400">
                  북마크된 페이지가 없습니다.
                  <br />
                  각 페이지 상단의 북마크 아이콘을 클릭해보세요.
                </div>
              ) : (
                bookmarks.map((bm) => (
                  <div
                    key={bm.id}
                    className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 transition-all ${
                      isDark
                        ? 'bg-neutral-800/60 border-neutral-800'
                        : isSepia
                        ? 'bg-[#f5ecdc] border-[#e6d8c3]'
                        : 'bg-neutral-50 border-neutral-200'
                    }`}
                  >
                    <div
                      onClick={() => {
                        onNavigatePage(bm.pageNumber);
                        onClose();
                      }}
                      className="min-w-0 cursor-pointer flex-1"
                    >
                      <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                        {bm.pageNumber}p · {bm.chapterTitle}
                      </span>
                      <h5 className="text-sm font-bold truncate hover:text-emerald-500 transition-colors">
                        {bm.pageTitle}
                      </h5>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onRemoveBookmark(bm.pageId)}
                        className="text-neutral-400 hover:text-rose-500 transition-colors p-1"
                        title="북마크 해제"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
