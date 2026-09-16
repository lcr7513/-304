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
book.pages.forEach(p => {
  if (p.chapterTitle === '심화 학습 자료') {
    console.log(`Page: ${p.pageNumber}`);
    p.cards.forEach(c => {
       console.log(`  Card: ${c.title}`);
       console.log(`  Content:`, c.content);
    });
  }
});
