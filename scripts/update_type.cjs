const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, '../src/data/grammarData.ts');
let content = fs.readFileSync(dataPath, 'utf-8');

content = content.replace('export interface GrammarExample {', `export interface RelatedGrammar {
  name: string;
  meaning: string;
  example: GrammarExample;
}

export interface GrammarExample {`);

content = content.replace('  commonWords?: string;', `  commonWords?: string;\n  relatedGrammars?: RelatedGrammar[];`);

fs.writeFileSync(dataPath, content, 'utf-8');
console.log('Updated grammarData.ts interfaces');
