const fs = require('fs');

const code = `import React from 'react';
import { EBook } from '../types';
import { CardRenderer } from './CardRenderer';

interface PrintViewProps {
  book: EBook;
}

export const PrintView: React.FC<PrintViewProps> = ({ book }) => {
  return (
    <div id="full-book-capture-area" className="fixed top-0 left-[-9999px] w-[210mm] opacity-0 pointer-events-none -z-50 print:block print:opacity-100 print:relative print:left-0 print:w-full bg-white text-black font-serif print-container">
      {/* Cover Page */}
      <div className="pdf-export-page print-page-break flex flex-col items-center justify-center h-[297mm] text-center border-b-[24px] border-emerald-900 p-12 bg-[#faf9f6]">
        <div className="mb-12 p-6 border-4 border-black inline-block bg-white">
          <span className="text-2xl font-bold tracking-[0.3em] uppercase">{book.edition}</span>
        </div>
        <h1 className="text-7xl font-black mb-10 leading-tight break-keep text-neutral-900">{book.title}</h1>
        <h2 className="text-3xl text-neutral-600 font-medium break-keep mb-16">{book.subtitle}</h2>
        
        <div className="w-24 h-1 bg-emerald-800 mb-16"></div>
        
        <div className="mt-auto pb-12">
          <p className="text-2xl font-bold text-neutral-800">Insight & Trend Research</p>
          <p className="text-lg text-neutral-500 mt-2">{book.publishedDate}</p>
        </div>
      </div>

      {/* Content Pages */}
      {book.pages
        .filter((p) => p.layout !== 'cover' && p.layout !== 'toc')
        .map((page) => (
          <div key={page.id} className="pdf-export-page print-page-break p-10 h-[297mm] bg-white flex flex-col overflow-hidden relative">
            <div className="border-b-[3px] border-black pb-4 mb-6 shrink-0">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold tracking-widest text-emerald-800 uppercase">{page.chapterTitle}</span>
                <span className="text-sm font-bold bg-black text-white px-4 py-1.5 rounded-full">
                  Page {page.pageNumber}
                </span>
              </div>
              <h3 className="text-4xl font-black mt-2 leading-tight break-keep">{page.pageTitle}</h3>
              {page.subtitle && <p className="text-xl text-neutral-500 mt-3 font-sans">{page.subtitle}</p>}
            </div>

            <div className="flex-1 flex flex-col gap-8 overflow-hidden font-serif">
              {page.cards.map((card, idx) => (
                <div key={card.id} className="break-inside-avoid">
                  <CardRenderer card={card} index={idx} readingMode="light" fontSize="sm" />
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t border-neutral-300 flex justify-between items-center text-[11px] font-sans text-neutral-400 shrink-0">
              <span>{book.title}</span>
              <span>{page.footerNote}</span>
            </div>
          </div>
        ))}
    </div>
  );
};
`;

fs.writeFileSync('src/components/PrintView.tsx', code);
console.log('PrintView updated with CardRenderer');
