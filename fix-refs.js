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
book.pages.forEach((p, idx) => {
  console.log(`Index: ${idx}, PageNum: ${p.pageNumber}, Chapter: ${p.chapterTitle}, PageTitle: ${p.pageTitle}`);
  p.cards.forEach(c => {
    if (c.title) console.log(`  - ${c.title}`);
  });
});
