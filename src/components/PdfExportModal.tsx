import React, { useState } from 'react';
import { EBook, BookPage, ReadingMode } from '../types';
import { exportElementToPdf, exportFullBookToPdf, triggerPrintDialog } from '../utils/pdfExport';
import { X, FileDown, Printer, CheckCircle2, AlertCircle, Sparkles, Loader2 } from 'lucide-react';

interface PdfExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  book: EBook;
  currentPage: BookPage | undefined;
  readingMode: ReadingMode;
}

export const PdfExportModal: React.FC<PdfExportModalProps> = ({
  isOpen,
  onClose,
  book,
  currentPage,
  readingMode,
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const [progressMsg, setProgressMsg] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  if (!isOpen) return null;

  const isDark = readingMode === 'dark';
  const isSepia = readingMode === 'sepia';

  const handleExportCurrentPage = async () => {
    setIsExporting(true);
    setStatus('idle');
    setProgressMsg('페이지를 분석하고 렌더링 준비 중...');

    const fileName = `${book.title}_${currentPage?.pageTitle || '페이지'}.pdf`.replace(
      /[\\/:*?"<>|]/g,
      '_'
    );

    const result = await exportElementToPdf('pdf-capture-area', {
      fileName,
      onProgress: (_prog, msg) => setProgressMsg(msg),
    });

    setIsExporting(false);
    if (result.success) {
      setStatus('success');
      setTimeout(() => {
        setStatus('idle');
        onClose();
      }, 1500);
    } else {
      setStatus('error');
      setErrorMessage(result.error || '알 수 없는 오류');
    }
  };

  
  const handlePrintAll = async () => {
    setIsExporting(true);
    setStatus('idle');
    setProgressMsg('전체 페이지를 분석 중입니다...');
    
    const fileName = `${book.title}_전체.pdf`.replace(/[\\/:*?"<>|]/g, '_');
    
    const result = await exportFullBookToPdf({
      fileName,
      onProgress: (_prog, msg) => setProgressMsg(msg),
    });
    
    setIsExporting(false);
    
    if (result.success) {
      setStatus('success');
      setTimeout(() => {
        setStatus('idle');
        onClose();
      }, 1500);
    } else {
      setStatus('error');
      setErrorMessage(result.error || '알 수 없는 오류');
    }
  };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className={`w-full max-w-lg rounded-2xl flex flex-col shadow-2xl overflow-hidden border ${
          isDark
            ? 'bg-neutral-900 border-neutral-800 text-neutral-100'
            : isSepia
            ? 'bg-[#faf5eb] border-[#ded1be] text-[#332a21]'
            : 'bg-white border-neutral-200 text-neutral-900'
        }`}
      >
        {/* Header */}
        <div className="p-5 border-b border-neutral-200/80 dark:border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileDown className="w-5 h-5 text-emerald-500" />
            <h3 className="text-lg font-serif font-bold">PDF로 저장 및 내보내기</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
            원하는 저장 방식을 선택하세요. 현재 보고 있는 리포트 카드를 PDF 이미지 문서로 내려받거나, 전체 전자책을 인쇄 및 벡터 PDF 파일로 저장할 수 있습니다.
          </p>

          {/* Option 1: Current Page PDF */}
          <button
            id="btn-export-current-pdf"
            onClick={handleExportCurrentPage}
            disabled={isExporting}
            className={`w-full p-4 rounded-xl border text-left flex items-start gap-4 transition-all group ${
              isDark
                ? 'border-neutral-700 hover:border-emerald-500 bg-neutral-800/40 hover:bg-neutral-800'
                : 'border-neutral-200 hover:border-emerald-500 bg-neutral-50/50 hover:bg-white hover:shadow-md'
            }`}
          >
            <div className="p-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 shrink-0">
              <FileDown className="w-6 h-6" />
            </div>
            <div className="space-y-1 min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                  현재 리포트 페이지 PDF 다운로드
                </h4>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-medium">
                  추천
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                현재 열려 있는 {currentPage?.pageTitle || '페이지'}의 카드 레이아웃을 A4 가로 규격 PDF 파일로 즉시 생성합니다.
              </p>
            </div>
          </button>

          {/* Option 2: Full Book Print & Save as Vector PDF */}
          <button
            id="btn-print-full-book"
            onClick={handlePrintAll}
            disabled={isExporting}
            className={`w-full p-4 rounded-xl border text-left flex items-start gap-4 transition-all group ${
              isDark
                ? 'border-neutral-700 hover:border-emerald-500 bg-neutral-800/40 hover:bg-neutral-800'
                : 'border-neutral-200 hover:border-emerald-500 bg-neutral-50/50 hover:bg-white hover:shadow-md'
            }`}
          >
            <div className="p-2.5 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400 shrink-0">
              <Printer className="w-6 h-6" />
            </div>
            <div className="space-y-1 min-w-0">
              <h4 className="text-sm font-bold group-hover:text-blue-600 dark:group-hover:text-blue-400">
                전체 전자책 인쇄 / 통합 PDF 저장
              </h4>
              <p className="text-xs text-neutral-400">
                전자책의 표지부터 모든 챕터 페이지까지 한 권의 온전한 PDF 파일로 렌더링하여 다운로드합니다. (페이지 수에 따라 약간의 시간이 소요될 수 있습니다)
              </p>
            </div>
          </button>

          {/* Progress or status */}
          {isExporting && (
            <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center gap-3 text-xs text-emerald-800 dark:text-emerald-300">
              <Loader2 className="w-4 h-4 animate-spin shrink-0" />
              <span>{progressMsg}</span>
            </div>
          )}

          {status === 'success' && (
            <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center gap-3 text-xs text-emerald-800 dark:text-emerald-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>PDF 파일이 성공적으로 생성되어 다운로드되었습니다!</span>
            </div>
          )}

          {status === 'error' && (
            <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 flex items-start gap-3 text-xs text-rose-800 dark:text-rose-300">
              <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <div className="flex flex-col gap-1">
                <span className="font-semibold">PDF 렌더링에 실패했습니다.</span>
                <span className="text-rose-700/80 dark:text-rose-400/80 break-all">{errorMessage || '알 수 없는 원인입니다.'}</span>
                <span className="mt-1">브라우저 환경(CORS 등)에 의해 파일 생성이 차단되었을 수 있습니다.</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-neutral-200/80 dark:border-neutral-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 transition-colors"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
