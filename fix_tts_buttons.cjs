const fs = require('fs');

const dataPath = 'src/pages/Grammar/GrammarPointDetail.tsx';
let dataContent = fs.readFileSync(dataPath, 'utf-8');

// Inject handleSpeak if not present
if (!dataContent.includes('handleSpeak')) {
  dataContent = dataContent.replace(
    "const GrammarPointDetail = () => {",
    "const GrammarPointDetail = () => {\n  const handleSpeak = (text: string, rate: number = 0.85) => {\n    const utterance = new SpeechSynthesisUtterance(text);\n    utterance.lang = 'ja-JP';\n    utterance.rate = rate;\n    window.speechSynthesis.speak(utterance);\n  };\n"
  );
}

// Ensure Volume2 is imported (it might already be imported since the file uses it)
if (!dataContent.includes('Volume2')) {
  dataContent = dataContent.replace(
    "import { ArrowLeft, BookOpen, CheckCircle2, ChevronRight, PenTool, Type } from 'lucide-react';",
    "import { ArrowLeft, BookOpen, CheckCircle2, ChevronRight, PenTool, Type, Volume2 } from 'lucide-react';"
  );
}

// Hook up the buttons
dataContent = dataContent.replace(
  /<button className="flex items-center justify-center gap-2 w-32 py-2 bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm">\s*<Volume2 size=\{14\} \/> Đọc chậm\s*<\/button>/g,
  `<button onClick={() => handleSpeak(ex.japanese, 0.4)} className="flex items-center justify-center gap-2 w-32 py-2 bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm active:scale-95">
                    <Volume2 size={14} /> Đọc chậm
                  </button>`
);

dataContent = dataContent.replace(
  /<button className="flex items-center justify-center gap-2 w-32 py-2 bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm">\s*<Volume2 size=\{14\} \/> Đọc thường\s*<\/button>/g,
  `<button onClick={() => handleSpeak(ex.japanese, 0.85)} className="flex items-center justify-center gap-2 w-32 py-2 bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm active:scale-95">
                    <Volume2 size={14} /> Đọc thường
                  </button>`
);

fs.writeFileSync(dataPath, dataContent, 'utf-8');
console.log('Fixed TTS buttons successfully.');
