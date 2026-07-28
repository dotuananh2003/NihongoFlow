import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const grammarFile = path.join(__dirname, '../src/data/grammarData.ts');
const newBlockFile = path.join(__dirname, '../scratch/lesson6_block.ts');

let content = fs.readFileSync(grammarFile, 'utf8');
const newBlock = fs.readFileSync(newBlockFile, 'utf8');

const lines = content.split('\n');

// Find start line index where id: 'lesson-6' is defined
let startIdx = -1;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes("id: 'lesson-6'")) {
    startIdx = i - 1; // start from the opening brace `{` of lesson-6
    break;
  }
}

// Find end line index where id: 'lesson-7' is defined
let endIdx = -1;
for (let i = startIdx + 1; i < lines.length; i++) {
  if (lines[i].includes("id: 'lesson-7'")) {
    endIdx = i - 2; // the `},` before lesson-7
    break;
  }
}

if (startIdx !== -1 && endIdx !== -1) {
  console.log(`Replacing lines ${startIdx + 1} to ${endIdx + 1}...`);
  lines.splice(startIdx, endIdx - startIdx + 1);
  lines.splice(startIdx, 0, newBlock);
  fs.writeFileSync(grammarFile, lines.join('\n'));
  console.log('Successfully injected Lesson 6 data!');
} else {
  console.error('Could not find start or end indices for lesson 6');
}
