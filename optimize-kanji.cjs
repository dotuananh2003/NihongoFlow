const fs = require('fs');
const path = require('path');
const dir = 'e:/All App/Coding_Workspace/jp-forus/src/pages/Kanji';
const files = ['Kanji.tsx', 'KanjiLesson.tsx', 'KanjiDetail.tsx'];

files.forEach(f => {
  let p = path.join(dir, f);
  let content = fs.readFileSync(p, 'utf8');
  content = content.replace(/,\s*y:\s*-?\d+/g, '');
  content = content.replace(/,\s*x:\s*-?\d+/g, '');
  content = content.replace(/,\s*scale:\s*0\.\d+/g, '');
  content = content.replace(/,\s*scale:\s*1/g, '');
  content = content.replace(/hover:-translate-y-1/g, '');
  content = content.replace(/backdrop-blur-md/g, '');
  fs.writeFileSync(p, content);
});
console.log('Optimized Kanji files');
