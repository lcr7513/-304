import fs from 'fs';

let content = fs.readFileSync('src/data/initialBookData.ts', 'utf8');
const startStr = "export const initialBookData: EBook = ";
const startIdx = content.indexOf(startStr) + startStr.length;
const endIdx = content.lastIndexOf(';');
const jsonStr = content.substring(startIdx, endIdx);

try {
  // Try evaluating the object
  const book = eval('(' + jsonStr + ')');
  book.chapters.forEach(ch => {
    console.log(ch.id, ch.title);
  });
} catch (e) {
  console.log("Error evaluating", e);
}
