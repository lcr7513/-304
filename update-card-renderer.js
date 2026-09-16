const fs = require('fs');
let code = fs.readFileSync('src/components/CardRenderer.tsx', 'utf8');

// Add useState and useEffect imports
if (!code.includes('useState')) {
  code = code.replace("import React from 'react';", "import React, { useState, useEffect } from 'react';");
}

const hookCode = `
  const [base64Image, setBase64Image] = useState<string | null>(null);

  useEffect(() => {
    if (card.imageUrl) {
      // Fetch image and convert to base64 to avoid html2canvas CORS taint issues
      fetch(card.imageUrl)
        .then(res => res.blob())
        .then(blob => {
          const reader = new FileReader();
          reader.onloadend = () => {
            setBase64Image(reader.result as string);
          };
          reader.readAsDataURL(blob);
        })
        .catch(err => {
          console.warn('Failed to fetch image for base64 conversion', err);
          setBase64Image(card.imageUrl); // Fallback to original URL
        });
    }
  }, [card.imageUrl]);
`;

code = code.replace(
  "  const fontClass = {",
  hookCode + "\n  const fontClass = {"
);

code = code.replace(
  /<img\s+src=\{`\$\{card\.imageUrl\}.*?\s+alt=\{card\.imageAlt \|\| 'Card image'\}\s+crossOrigin="anonymous"\s+className="w-full h-auto object-cover max-h-64"\s+\/>/g,
  `<img src={base64Image || card.imageUrl} alt={card.imageAlt || 'Card image'} crossOrigin="anonymous" className="w-full h-auto object-cover max-h-64" />`
);

fs.writeFileSync('src/components/CardRenderer.tsx', code);
