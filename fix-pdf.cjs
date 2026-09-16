const fs = require('fs');

let code = fs.readFileSync('src/utils/pdfExport.ts', 'utf8');

code = code.replace(/backgroundColor: '#ffffff',/g, "backgroundColor: '#ffffff',\n      fontEmbedCSS: '',");

fs.writeFileSync('src/utils/pdfExport.ts', code);
