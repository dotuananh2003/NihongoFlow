import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const file = path.join(__dirname, '../src/data/mockExams/JPD123_SP25_RE.ts');

let content = fs.readFileSync(file, 'utf8');

const blocks = [];
const regex = /\{\s*id:\s*\d+,[\s\S]*?correctAnswerIndex:\s*\d+\s*(?:,\s*attachedPassage:\s*"[^"]*")?\s*\}/g;
let match;
while ((match = regex.exec(content)) !== null) {
    blocks.push(match[0]);
}

if (blocks.length === 30) {
    // Current order: blocks[0] is Q8, blocks[1..7] are Q1..Q7, blocks[8..29] are Q9..Q30
    const reorderedBlocks = [
        ...blocks.slice(1, 8),
        blocks[0],
        ...blocks.slice(8)
    ];
    
    // Fix IDs
    const fixedBlocks = reorderedBlocks.map((block, i) => {
        return block.replace(/id:\s*\d+,/, `id: ${i + 1},`);
    });
    
    const newArrayStr = '[\n  ' + fixedBlocks.join(',\n  ') + '\n]';
    content = content.replace(/\[[\s\S]*\]/, newArrayStr + ';');
    
    fs.writeFileSync(file, content, 'utf8');
    console.log('Successfully reordered questions!');
} else {
    console.log('Failed to parse exactly 30 blocks. Found: ' + blocks.length);
}
