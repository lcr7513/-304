const fs = require('fs');

let code = fs.readFileSync('src/components/CardRenderer.tsx', 'utf8');

// The current code has:
/*
        {card.content && card.content.length > 0 && (
          <ul className="space-y-2 mt-3">
            {card.content.map((point, idx) => (
              <li key={idx} className={`flex items-start gap-2.5 ${fontClass}`}>
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 bg-neutral-400 dark:bg-neutral-500" />
                <span className="text-neutral-700 dark:text-neutral-300">
                  {point}
                </span>
              </li>
            ))}
          </ul>
        )}
*/

const oldContentBlock = /{card\.content && card\.content\.length > 0 && \([\s\S]*?<\/ul>[\s\S]*?\)}/;

const newContentBlock = `{card.content && card.content.length > 0 && (
          <div className="space-y-4 mt-4 text-justify print:text-black">
            {card.content.map((point, idx) => (
              <p key={idx} className={\`\${fontClass} text-neutral-700 dark:text-neutral-300 print:text-black\`}>
                {point}
              </p>
            ))}
          </div>
        )}`;

code = code.replace(oldContentBlock, newContentBlock);

// Also remove border and shadow from the main card container in print mode
// original: <div className={`relative h-full flex flex-col p-6 rounded-2xl border transition-colors ${
// We can just add `print:border-0 print:shadow-none print:bg-transparent print:p-0`
code = code.replace(
  /className=\{\`relative h-full flex flex-col p-6 rounded-2xl border transition-colors \$\{/g,
  "className={`relative h-full flex flex-col p-6 rounded-2xl border transition-colors print:border-0 print:shadow-none print:bg-transparent print:p-0 ${"
);

// We should also make image container have less margins in print mode maybe?
// <div className="my-4 rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800">
code = code.replace(
  /<div className="my-4 rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800">/g,
  '<div className="my-4 rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 print:border-0 print:rounded-none">'
);

fs.writeFileSync('src/components/CardRenderer.tsx', code);
console.log('CardRenderer updated');
