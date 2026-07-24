import { grammarCourses } from '../src/data/grammarData';
import { vocabularyData, extraVocab } from '../src/data/vocabularyData';
import { generateBlanks } from '../src/utils/questionUtils';
import assert from 'node:assert';

const PARTICLES = ['は', 'が', 'を', 'に', 'で', 'へ', 'と', 'や', 'か', 'も'];
const vocabList = [...Object.values(vocabularyData).flat(), ...extraVocab];

let successCount = 0;
let failCount = 0;

// Collect 100 examples randomly
const allExamples: any[] = [];
for (const course of grammarCourses) {
  for (const lesson of course.lessons) {
    for (const gp of lesson.grammarPoints) {
      allExamples.push(...gp.examples);
    }
  }
}

// Shuffle examples
for (let i = allExamples.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [allExamples[i], allExamples[j]] = [allExamples[j], allExamples[i]];
}

const testCases = allExamples.slice(0, 100);

for (let i = 0; i < testCases.length; i++) {
  const ex = testCases[i];
  
  const candidates = [];
  
  // Build candidates exactly like in GrammarExercise.tsx
  vocabList.forEach(v => {
    if (v.kanji && ex.japanese.includes(v.kanji)) {
      candidates.push({ text: v.kanji, readingText: v.hiragana });
    } else if (v.hiragana && ex.japanese.includes(v.hiragana)) {
      if (v.kanji === v.hiragana || v.hiragana.length >= 2) {
         candidates.push({ text: v.hiragana, readingText: v.hiragana });
      }
    }
  });
  
  PARTICLES.forEach(p => {
    if (ex.japanese.includes(p)) {
       candidates.push({ text: p, readingText: p });
    }
  });

  try {
    const result = generateBlanks(ex.japanese, ex.reading || '', candidates, 3);
    if (!result) {
      // It's possible to have no candidates, just skip
      continue;
    }

    const { questionText, correctAnswer, selectedTargets } = result;

    // 1. Check no duplicate words
    // If original sentence was A, and we replace B with C, it shouldn't produce B.
    // The auto-verification inside generateBlanks already checks reconstructed === original.
    // Let's re-verify here.
    const parts = questionText.split('___');
    let reconstructed = parts[0];
    for (let j = 0; j < selectedTargets.length; j++) {
      reconstructed += selectedTargets[j] + (parts[j + 1] || '');
    }

    assert.strictEqual(reconstructed, ex.japanese, `Reconstruction failed for "${ex.japanese}"`);
    
    // 2. Check blanks are correct number
    assert.strictEqual(parts.length - 1, selectedTargets.length, `Blank count mismatch for "${ex.japanese}"`);
    
    successCount++;
  } catch (err) {
    console.error(`Test ${i} failed:`, err);
    failCount++;
  }
}

console.log(`\nTest Results:`);
console.log(`Total ran: ${successCount + failCount} (some skipped due to no valid candidates)`);
console.log(`Success: ${successCount}`);
console.log(`Failed: ${failCount}`);

if (failCount > 0) {
  process.exit(1);
} else {
  console.log(`\nAll tests passed successfully!`);
}
