const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../src/data/grammarData.ts');
let dataContent = fs.readFileSync(dataPath, 'utf-8');

const replacements = [
  { old: "name: 'N は N です'", new: "name: 'N は N です (N1 là N2)'" },
  { old: "name: 'N は Aな です'", new: "name: 'N は Aな です (N thì A)'" },
  { old: "name: 'N は Aい N です'", new: "name: 'N は Aい N です (N2 là N1 A)'" },
  { old: "name: 'N は Aかった です'", new: "name: 'N は Aかった です (N đã A)'" },
  
  { old: "name: 'N は N じゃありません'", new: "name: 'N は N じゃありません (N1 không phải là N2)'" },
  { old: "name: 'N は Aな じゃありません'", new: "name: 'N は Aな じゃありません (N không A)'" },
  { old: "name: 'N は Aくありません'", new: "name: 'N は Aくありません (N không A)'" },
  { old: "name: 'N は Aくなかった です'", new: "name: 'N は Aくなかった です (N đã không A)'" },
  
  { old: "name: 'N は Aい です'", new: "name: 'N は Aい です (N thì A)'" },
  { old: "name: 'N は Aな N です'", new: "name: 'N は Aな N です (N2 là N1 A)'" },
  { old: "name: 'N は Aでした'", new: "name: 'N は Aでした (N đã A)'" },
  
  { old: "name: 'N は Aくない です'", new: "name: 'N は Aくない です (N không A)'" },
  { old: "name: 'N は Aではありません'", new: "name: 'N は Aではありません (N không A)'" },
  { old: "name: 'N は Aじゃありませんでした'", new: "name: 'N は Aじゃありませんでした (N đã không A)'" },
  
  { old: "name: 'あまり + Aくない / じゃありません'", new: "name: 'あまり + Aくない / じゃありません (Không A lắm)'" },
  { old: "name: 'ぜんぜん + A (phủ định)'", new: "name: 'ぜんぜん + A (phủ định) (Hoàn toàn không A)'" },
  
  { old: "name: 'とても + Aい / Aな'", new: "name: 'とても + Aい / Aな (Rất A)'" },
  { old: "name: '少し + Aい / Aな'", new: "name: '少し + Aい / Aな (Hơi A)'" },
  
  { old: "name: 'N1 に N2 が います'", new: "name: 'N1 に N2 が います (Ở N1 có N2)'" },
  { old: "name: 'N2 は N1 に あります'", new: "name: 'N2 は N1 に あります (N2 thì ở N1)'" },
  { old: "name: 'N1 に なに が ありますか'", new: "name: 'N1 に なに が ありますか (Ở N1 có gì?)'" },
  { old: "name: 'N1 に N2 や N3 が あります'", new: "name: 'N1 に N2 や N3 が あります (Ở N1 có N2 và N3)'" },
];

for (const rep of replacements) {
  // Use global regex replacement in case a structure appears multiple times
  const regex = new RegExp(rep.old.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&'), 'g');
  dataContent = dataContent.replace(regex, rep.new);
}

fs.writeFileSync(dataPath, dataContent, 'utf-8');
console.log('Successfully appended Vietnamese translations to grammar titles!');
