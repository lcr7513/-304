import fs from 'fs';
import path from 'path';

// Since the file is huge and has JSON-like structure, we can parse it as JS
// Actually, it's easier to just read the file, extract the object string, parse it, modify it, and write it back
let content = fs.readFileSync('src/data/initialBookData.ts', 'utf8');

// The file exports initialBookData. Let's make a safe extraction
const startStr = "export const initialBookData: EBook = ";
const startIdx = content.indexOf(startStr) + startStr.length;
// We know it ends with `};\n` or similar. Let's find the last `}`
const endIdx = content.lastIndexOf('}');
const jsonStr = content.substring(startIdx, endIdx + 1);

let bookData;
try {
  bookData = JSON.parse(jsonStr);
} catch (e) {
  console.error("Failed to parse JSON. Will try to evaluate.");
  // It might not be pure JSON. Let's write it to a temp js file and import it
}

