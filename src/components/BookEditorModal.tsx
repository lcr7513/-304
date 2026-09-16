import React, { useState } from 'react';
import { EBook, BookPage, CardItem, ReadingMode } from '../types';
import { X, Plus, Trash2, Edit3, Save, RotateCcw, FileText, UploadCloud, Check } from 'lucide-react';

interface BookEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  book: EBook;
  readingMode: ReadingMode;
  onSaveBook: (updatedBook: EBook) => void;
  onResetBook: () => void;
}

export const BookEditorModal: React.FC<BookEditorModalProps> = ({
  isOpen,
  onClose,
  book,
  readingMode,
  onSaveBook,
  onResetBook,
}) => {
  const [selectedPageIndex, setSelectedPageIndex] = useState<number>(2); // Default to a content page
  const [activeTab, setActiveTab] = useState<'edit' | 'add-page' | 'import'>('edit');
  const [editedBook, setEditedBook] = useState<EBook>(book);

  // New page form state
  const [newPageTitle, setNewPageTitle] = useState('');
  const [newPageSubtitle, setNewPageSubtitle] = useState('');
  const [newPageChapter, setNewPageChapter] = useState('01. 중국 Z세대 감정 소비');
  const [newCardTitle, setNewCardTitle] = useState('');
  const [newCardBadge, setNewCardBadge] = useState('신규 인사이트');
  const [newCardBullets, setNewCardBullets] = useState('');

  // Import text state
  const [importTitle, setImportTitle] = useState('');
  const [importChapter, setImportChapter] = useState('02. AI 숏폼 드라마의 공습');
  const [importText, setImportText] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const isDark = readingMode === 'dark';
  const isSepia = readingMode === 'sepia';

  const currentPage = editedBook.pages[selectedPageIndex];

  const handleUpdatePageField = (field: 'pageTitle' | 'subtitle' | 'chapterTitle', val: string) => {
    if (!currentPage) return;
    const updatedPages = [...editedBook.pages];
    updatedPages[selectedPageIndex] = {
      ...currentPage,
      [field]: val,
    };
    setEditedBook({ ...editedBook, pages: updatedPages });
  };

  const handleUpdateCard = (cardIdx: number, field: string, val: any) => {
    if (!currentPage) return;
    const updatedCards = [...currentPage.cards];
    updatedCards[cardIdx] = {
      ...updatedCards[cardIdx],
      [field]: val,
    };
    const updatedPages = [...editedBook.pages];
    updatedPages[selectedPageIndex] = {
      ...currentPage,
      cards: updatedCards,
    };
    setEditedBook({ ...editedBook, pages: updatedPages });
  };

  const handleDeleteCard = (cardIdx: number) => {
    if (!currentPage) return;
    const updatedCards = currentPage.cards.filter((_, i) => i !== cardIdx);
    const updatedPages = [...editedBook.pages];
    updatedPages[selectedPageIndex] = {
      ...currentPage,
      cards: updatedCards,
    };
    setEditedBook({ ...editedBook, pages: updatedPages });
  };

  const handleAddNewCardToCurrent = () => {
    if (!currentPage) return;
    const newCard: CardItem = {
      id: `card-custom-${Date.now()}`,
      title: '새로운 분석 카드',
      subtitle: '카드 요약 부제목',
      category: '추가 분석',
      badge: 'NEW',
      content: ['첫 번째 핵심 요약 내용을 입력하세요.', '두 번째 분석 포인트를 입력하세요.'],
      styleVariant: 'default',
    };
    const updatedPages = [...editedBook.pages];
    updatedPages[selectedPageIndex] = {
      ...currentPage,
      cards: [...currentPage.cards, newCard],
    };
    setEditedBook({ ...editedBook, pages: updatedPages });
  };

  // Create brand new page
  const handleCreateNewPage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPageTitle.trim()) return;

    const bullets = newCardBullets
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);

    const newPage: BookPage = {
      id: `page-${Date.now()}`,
      pageNumber: editedBook.pages.length + 1,
      chapterId: 'ch-custom',
      chapterTitle: newPageChapter,
      pageTitle: newPageTitle,
      subtitle: newPageSubtitle,
      layout: 'two-column',
      headerTag: 'CUSTOM REPORT',
      cards: [
        {
          id: `card-${Date.now()}-1`,
          title: newCardTitle || '핵심 쟁점 분석',
          subtitle: '상세 인사이트',
          badge: newCardBadge,
          badgeColor: 'emerald',
          content: bullets.length > 0 ? bullets : ['내용을 입력하세요.'],
          styleVariant: 'default',
        },
      ],
      footerNote: '사용자가 직접 추가한 전자책 분석 리포트',
    };

    const newPages = [...editedBook.pages, newPage];
    const updated = { ...editedBook, pages: newPages };
    setEditedBook(updated);
    onSaveBook(updated);
    setSelectedPageIndex(newPages.length - 1);
    setActiveTab('edit');

    // Reset inputs
    setNewPageTitle('');
    setNewPageSubtitle('');
    setNewCardBullets('');
  };

  // Smart import from text
  const handleImportText = (e: React.FormEvent) => {
    e.preventDefault();
    if (!importText.trim()) return;

    // Split text paragraphs into cards
    const paragraphs = importText
      .split('\n\n')
      .map((p) => p.trim())
      .filter(Boolean);

    const generatedCards: CardItem[] = paragraphs.slice(0, 4).map((p, i) => {
      const lines = p.split('\n').filter(Boolean);
      const title = lines[0] ? lines[0].replace(/^[-#*0-9.]+\s*/, '') : `인사이트 ${i + 1}`;
      const bullets = lines.length > 1 ? lines.slice(1) : [lines[0] || '요약 내용'];

      return {
        id: `imported-card-${Date.now()}-${i}`,
        title,
        subtitle: '추출된 분석 포인트',
        badge: `섹션 ${i + 1}`,
        badgeColor: i % 2 === 0 ? 'amber' : 'emerald',
        content: bullets,
        styleVariant: i === 0 ? 'accent' : 'default',
      };
    });

    const newPage: BookPage = {
      id: `imported-page-${Date.now()}`,
      pageNumber: editedBook.pages.length + 1,
      chapterId: 'ch-imported',
      chapterTitle: importChapter,
      pageTitle: importTitle || '새로운 전자책 챕터',
      subtitle: '텍스트 자료 기반 자동 생성된 카드형 리포트',
      layout: generatedCards.length > 2 ? 'four-grid' : 'two-column',
      headerTag: 'IMPORTED CHAPTER',
      cards: generatedCards,
      footerNote: 'PDF 및 텍스트 자료를 바탕으로 생성된 인터랙티브 리포트',
    };

    const newPages = [...editedBook.pages, newPage];
    const updated = { ...editedBook, pages: newPages };
    setEditedBook(updated);
    onSaveBook(updated);
    setSelectedPageIndex(newPages.length - 1);
    setActiveTab('edit');
    setImportText('');
    setImportTitle('');
  };

  const handleSaveAll = () => {
    onSaveBook(editedBook);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className={`w-full max-w-5xl h-[90vh] rounded-2xl flex flex-col shadow-2xl overflow-hidden border ${
          isDark
            ? 'bg-neutral-900 border-neutral-800 text-neutral-100'
            : isSepia
            ? 'bg-[#faf5eb] border-[#ded1be] text-[#332a21]'
            : 'bg-white border-neutral-200 text-neutral-900'
        }`}
      >
        {/* Modal Top Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-200/80 dark:border-neutral-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Edit3 className="w-5 h-5 text-emerald-500" />
            <h3 className="text-lg font-serif font-bold">전자책 카드 및 리포트 편집기</h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-medium">
              로컬 자동 저장
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSaveAll}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>저장 완료!</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>변경사항 저장</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-5 pt-3 border-b border-neutral-200/80 dark:border-neutral-800 flex items-center gap-2">
          <button
            onClick={() => setActiveTab('edit')}
            className={`pb-3 px-3 text-xs font-bold border-b-2 transition-all ${
              activeTab === 'edit'
                ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
                : 'border-transparent text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300'
            }`}
          >
            기존 카드 및 페이지 수정
          </button>
          <button
            onClick={() => setActiveTab('add-page')}
            className={`pb-3 px-3 text-xs font-bold border-b-2 transition-all ${
              activeTab === 'add-page'
                ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
                : 'border-transparent text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300'
            }`}
          >
            + 새 리포트 페이지 작성
          </button>
          <button
            onClick={() => setActiveTab('import')}
            className={`pb-3 px-3 text-xs font-bold border-b-2 transition-all ${
              activeTab === 'import'
                ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
                : 'border-transparent text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300'
            }`}
          >
            자료 붙여넣기로 전자책 카드 자동 생성
          </button>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
          {activeTab === 'edit' && (
            <>
              {/* Left Sidebar: Page List */}
              <div className="w-full md:w-64 border-r border-neutral-200/80 dark:border-neutral-800 p-3 overflow-y-auto space-y-1 shrink-0">
                <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block px-2 py-1">
                  페이지 선택
                </span>
                {editedBook.pages.map((p, idx) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPageIndex(idx)}
                    className={`w-full text-left p-2.5 rounded-xl text-xs font-medium transition-colors flex items-center justify-between gap-2 ${
                      selectedPageIndex === idx
                        ? 'bg-emerald-500 text-neutral-950 font-bold shadow-xs'
                        : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                    }`}
                  >
                    <span className="truncate">
                      {p.pageNumber}p. {p.pageTitle}
                    </span>
                    <span className="text-[10px] opacity-75 font-mono">
                      {p.cards.length}C
                    </span>
                  </button>
                ))}
              </div>

              {/* Right Panel: Page and Card Fields */}
              <div className="flex-1 p-5 overflow-y-auto space-y-6">
                {currentPage ? (
                  <>
                    <div className="space-y-3 bg-neutral-50 dark:bg-neutral-800/40 p-4 rounded-xl border border-neutral-200/80 dark:border-neutral-800">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase">
                          페이지 기본 정보
                        </h4>
                        <span className="text-xs font-mono text-emerald-500 font-semibold">
                          페이지 #{currentPage.pageNumber}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-[11px] font-semibold text-neutral-500 block mb-1">
                            페이지 제목
                          </label>
                          <input
                            type="text"
                            value={currentPage.pageTitle}
                            onChange={(e) => handleUpdatePageField('pageTitle', e.target.value)}
                            className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] font-semibold text-neutral-500 block mb-1">
                            소제목 / 부제
                          </label>
                          <input
                            type="text"
                            value={currentPage.subtitle || ''}
                            onChange={(e) => handleUpdatePageField('subtitle', e.target.value)}
                            className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Cards on this page */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold">
                          수록된 카드 목록 ({currentPage.cards.length}개)
                        </h4>
                        <button
                          onClick={handleAddNewCardToCurrent}
                          className="px-3 py-1.5 rounded-lg bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-xs font-bold transition-colors flex items-center gap-1"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>카드 추가</span>
                        </button>
                      </div>

                      {currentPage.cards.map((card, cIdx) => (
                        <div
                          key={card.id}
                          className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 space-y-3 bg-white dark:bg-neutral-800/60"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs font-bold text-emerald-500 font-mono">
                              카드 #{cIdx + 1}
                            </span>
                            <button
                              onClick={() => handleDeleteCard(cIdx)}
                              className="text-neutral-400 hover:text-rose-500 transition-colors p-1"
                              title="카드 삭제"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="text-[11px] font-semibold text-neutral-500 block mb-1">
                                카드 제목
                              </label>
                              <input
                                type="text"
                                value={card.title}
                                onChange={(e) => handleUpdateCard(cIdx, 'title', e.target.value)}
                                className="w-full px-3 py-1.5 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800"
                              />
                            </div>
                            <div>
                              <label className="text-[11px] font-semibold text-neutral-500 block mb-1">
                                뱃지 텍스트
                              </label>
                              <input
                                type="text"
                                value={card.badge || ''}
                                onChange={(e) => handleUpdateCard(cIdx, 'badge', e.target.value)}
                                className="w-full px-3 py-1.5 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="text-[11px] font-semibold text-neutral-500 block mb-1">
                              불릿 포인트 내용 (한 줄에 하나씩 입력)
                            </label>
                            <textarea
                              rows={3}
                              value={card.content.join('\n')}
                              onChange={(e) =>
                                handleUpdateCard(cIdx, 'content', e.target.value.split('\n'))
                              }
                              className="w-full p-2.5 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 resize-y"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="py-20 text-center text-sm text-neutral-400">
                    좌측에서 편집할 페이지를 선택하세요.
                  </div>
                )}
              </div>
            </>
          )}

          {activeTab === 'add-page' && (
            <form onSubmit={handleCreateNewPage} className="flex-1 p-6 overflow-y-auto space-y-4 max-w-2xl mx-auto">
              <h4 className="text-base font-bold font-serif">새로운 리포트 페이지 추가하기</h4>
              <p className="text-xs text-neutral-400">
                전자책에 새로운 주제의 리포트 페이지와 카드를 추가하여 확장할 수 있습니다.
              </p>

              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold block mb-1">소속 챕터 명칭</label>
                  <input
                    type="text"
                    value={newPageChapter}
                    onChange={(e) => setNewPageChapter(e.target.value)}
                    placeholder="예: 06. 미래 기술과 사회 변동"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold block mb-1">페이지 제목 *</label>
                  <input
                    type="text"
                    required
                    value={newPageTitle}
                    onChange={(e) => setNewPageTitle(e.target.value)}
                    placeholder="예: 글로벌 양자 컴퓨팅 동향 및 파급 효과"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold block mb-1">소제목 / 부제</label>
                  <input
                    type="text"
                    value={newPageSubtitle}
                    onChange={(e) => setNewPageSubtitle(e.target.value)}
                    placeholder="예: 최신 연구 발표 및 산업 응용 가능성 검토"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold block mb-1">첫 번째 카드 제목</label>
                  <input
                    type="text"
                    value={newCardTitle}
                    onChange={(e) => setNewCardTitle(e.target.value)}
                    placeholder="예: 시장 동향 및 핵심 기술 지표"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold block mb-1">카드 내용 (엔터로 줄 구분)</label>
                  <textarea
                    rows={4}
                    value={newCardBullets}
                    onChange={(e) => setNewCardBullets(e.target.value)}
                    placeholder="핵심 포인트 1&#10;핵심 포인트 2&#10;핵심 포인트 3"
                    className="w-full p-3 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs transition-colors flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>페이지 생성 및 전자책에 반영</span>
                </button>
              </div>
            </form>
          )}

          {activeTab === 'import' && (
            <form onSubmit={handleImportText} className="flex-1 p-6 overflow-y-auto space-y-4 max-w-2xl mx-auto">
              <div className="flex items-center gap-2">
                <UploadCloud className="w-5 h-5 text-emerald-500" />
                <h4 className="text-base font-bold font-serif">
                  PDF 텍스트 / 리포트 자료를 붙여넣어 전자책 만들기
                </h4>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                슬라이드나 PDF에서 복사한 텍스트 문단을 아래에 붙여넣으면, 문단별로 자동 분류하여 전문가급 카드 레이아웃 페이지로 변환합니다.
              </p>

              <div>
                <label className="text-xs font-semibold block mb-1">새 리포트 제목</label>
                <input
                  type="text"
                  value={importTitle}
                  onChange={(e) => setImportTitle(e.target.value)}
                  placeholder="예: 2026 AI 트렌드 특별 보고서"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800"
                />
              </div>

              <div>
                <label className="text-xs font-semibold block mb-1">텍스트 붙여넣기</label>
                <textarea
                  rows={8}
                  value={importText}
                  onChange={(e) => setImportText(e.target.value)}
                  placeholder="여기에 리포트 내용이나 슬라이드 텍스트를 붙여넣으세요.&#10;&#10;문단과 문단 사이를 엔터 두 번으로 띄우면 각각 독립된 카드로 자동 생성됩니다."
                  className="w-full p-3 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 resize-none font-sans"
                />
              </div>

              <button
                type="submit"
                disabled={!importText.trim()}
                className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 text-neutral-950 font-bold text-xs transition-colors flex items-center justify-center gap-2"
              >
                <FileText className="w-4 h-4" />
                <span>전자책 카드형 리포트로 변환 생성</span>
              </button>
            </form>
          )}
        </div>

        {/* Modal Bottom Reset & Save */}
        <div className="p-4 border-t border-neutral-200/80 dark:border-neutral-800 flex items-center justify-between text-xs">
          <button
            onClick={() => {
              if (confirm('모든 수정한 내용을 원본 리포트 상태로 되돌리시겠습니까?')) {
                onResetBook();
                onClose();
              }
            }}
            className="text-neutral-400 hover:text-rose-500 transition-colors flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>원본 리포트로 초기화</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 font-semibold"
            >
              닫기
            </button>
            <button
              onClick={handleSaveAll}
              className="px-4 py-2 rounded-xl bg-emerald-500 text-neutral-950 font-bold hover:bg-emerald-400 transition-colors"
            >
              저장하고 적용
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
