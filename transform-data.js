import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the ts file
let code = fs.readFileSync('src/data/initialBookData.ts', 'utf8');

// Strip out imports and typings to make it valid JS
code = code.replace(/import \{.*?\} from '..\/types';/g, '');
code = code.replace(/export const initialBookData: EBook =/g, 'const initialBookData =');
code = code.replace(/export const initialBookData =/g, 'const initialBookData =');
code += '\nexport default initialBookData;\n';

fs.writeFileSync('tempData.js', code);
