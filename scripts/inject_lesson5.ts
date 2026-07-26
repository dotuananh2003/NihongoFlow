import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const grammarFile = path.join(__dirname, '../src/data/grammarData.ts');
const newBlockFile = path.join(__dirname, '../scratch/lesson5_block.ts');

let content = fs.readFileSync(grammarFile, 'utf8');
const newBlock = fs.readFileSync(newBlockFile, 'utf8');

const lines = content.split('\n');

// Find start line 712 (index 711)
const startIdx = 711;
// Find end line 774 (index 773)
const endIdx = 773;

// Remove the old block
lines.splice(startIdx, endIdx - startIdx + 1);

// Insert the new block
lines.splice(startIdx, 0, newBlock);

fs.writeFileSync(grammarFile, lines.join('\n'));

console.log('Successfully injected Lesson 5 data!');
