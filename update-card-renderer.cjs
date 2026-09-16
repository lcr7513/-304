const fs = require('fs');
let code = fs.readFileSync('src/components/CardRenderer.tsx', 'utf8');

const oldStr = `<img 
              src={\`\${card.imageUrl}\${card.imageUrl.includes('?') ? '&' : '?'}cb=\${Date.now()}\`} 
              alt={card.imageAlt || 'Card image'} 
              crossOrigin="anonymous" 
              className="w-full h-auto object-cover max-h-64" 
            />`;

code = code.replace(oldStr, `<img src={base64Image || card.imageUrl} alt={card.imageAlt || 'Card image'} crossOrigin="anonymous" className="w-full h-auto object-cover max-h-64" />`);

fs.writeFileSync('src/components/CardRenderer.tsx', code);
