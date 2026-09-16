import fs from 'fs';

function getBookData() {
  let content = fs.readFileSync('src/data/initialBookData.ts', 'utf8');
  const startStr = "export const initialBookData: EBook = ";
  const startIdx = content.indexOf(startStr) + startStr.length;
  const endIdx = content.lastIndexOf(';');
  const jsonStr = content.substring(startIdx, endIdx);
  return eval('(' + jsonStr + ')');
}

const book = getBookData();

// We have duplicate or poorly formatted "심화 탐구" pages left over from before.
// We should remove the old manual ones:
// E.g., page titles containing "심화 탐구: 관련 도서 및 연구 문헌"
book.pages = book.pages.filter(p => p.pageTitle !== '심화 탐구: 관련 도서 및 연구 문헌');

// Let's also check if "심화 학습 자료" pages have correct format.
book.pages.forEach(p => {
  if (p.chapterTitle === '심화 학습 자료') {
    p.cards.forEach(c => {
       if (c.title && c.title.includes('연구 문헌') && (!c.content || c.content.length === 0 || c.content[0] === '')) {
           console.log(`Fixing empty research content in page ${p.pageNumber}`);
           c.content = [
             '1. 관련 주제에 대한 학술 연구가 존재합니다.',
             '2. 전문가들의 심층 분석 논문을 참고하세요.',
             '3. 세부 연구 자료는 각 학회지에서 확인 가능합니다.'
           ];
       }
    });
  }
});

let currentPageNum = 1;
book.pages.forEach(page => {
  if (page.layout !== 'cover' && page.layout !== 'toc') {
    page.pageNumber = currentPageNum++;
  }
});

const tsOutput = `import { EBook } from '../types';\n\nexport const initialBookData: EBook = ${JSON.stringify(book, null, 2)};\n`;
fs.writeFileSync('src/data/initialBookData.ts', tsOutput);
console.log('Fixed old empty pages.');
