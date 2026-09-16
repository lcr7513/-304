const fs = require('fs');
let code = fs.readFileSync('src/utils/pdfExport.ts', 'utf8');

code = code.replace(
  /\/\/ Fallback: trigger browser print\n\s*window\.print\(\);/g,
  ""
);

fs.writeFileSync('src/utils/pdfExport.ts', code);
