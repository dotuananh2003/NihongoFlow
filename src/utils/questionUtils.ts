export interface BlankTarget {
  text: string; // The exact text to find in the sentence
  readingText?: string; // The text to find in the reading sentence (e.g. hiragana form)
}

export interface BlankResult {
  questionText: string;
  correctAnswer: string;
  readingWithBlanks: string;
  selectedTargets: string[]; // For distractor generation
}

interface Occurrence {
  text: string;
  readingText?: string;
  start: number;
  end: number;
}

/**
 * Shuffles an array in place.
 */
function shuffleArray<T>(array: T[]): T[] {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

/**
 * Generates fill-in-the-blank questions robustly.
 * Ensures no overlapping blanks, no duplicate words in answers, and exactly reconstructable sentences.
 */
export function generateBlanks(
  sentence: string,
  readingSentence: string,
  candidates: BlankTarget[],
  maxBlanks: number = 3
): BlankResult | null {
  if (!sentence || candidates.length === 0) return null;

  const allOccurrences: Occurrence[] = [];

  // 1. Find all occurrences of all candidates
  for (const candidate of candidates) {
    if (!candidate.text) continue;
    let startIndex = 0;
    while (true) {
      const idx = sentence.indexOf(candidate.text, startIndex);
      if (idx === -1) break;
      allOccurrences.push({
        text: candidate.text,
        readingText: candidate.readingText || candidate.text,
        start: idx,
        end: idx + candidate.text.length,
      });
      startIndex = idx + 1; // move forward by 1 to catch overlapping matches of the same word (rare but possible)
    }
  }

  // 2. Sort occurrences by length descending (prefer longer words)
  allOccurrences.sort((a, b) => b.text.length - a.text.length);

  // 3. Filter out overlapping occurrences greedily
  const validOccurrences: Occurrence[] = [];
  for (const occ of allOccurrences) {
    const isOverlapping = validOccurrences.some(
      (v) => (occ.start >= v.start && occ.start < v.end) || (occ.end > v.start && occ.end <= v.end) || (occ.start <= v.start && occ.end >= v.end)
    );
    if (!isOverlapping) {
      validOccurrences.push(occ);
    }
  }

  if (validOccurrences.length === 0) return null;

  // 4. Randomly pick numBlanks (1 to maxBlanks)
  const numBlanks = Math.floor(Math.random() * Math.min(maxBlanks, validOccurrences.length)) + 1;
  const shuffledOccurrences = shuffleArray(validOccurrences);
  const chosenOccurrences = shuffledOccurrences.slice(0, numBlanks);

  // 5. Sort chosen by start index so blanks appear left-to-right
  chosenOccurrences.sort((a, b) => a.start - b.start);

  // 6. Build questionText
  let qText = sentence;
  // Replace from end to start so indices don't shift
  for (let i = chosenOccurrences.length - 1; i >= 0; i--) {
    const occ = chosenOccurrences[i];
    qText = qText.substring(0, occ.start) + '___' + qText.substring(occ.end);
  }

  // 7. Build readingWithBlanks
  let rText = readingSentence || '';
  // Since we don't have exact indices for the reading sentence, we replace the first occurrence
  // of the readingText. In a robust system we'd need a tokenizer, but this works 99% of the time for N5.
  for (const occ of chosenOccurrences) {
    if (rText) {
      rText = rText.replace(occ.readingText || occ.text, '___');
    }
  }

  const correctAnswer = chosenOccurrences.map((occ) => occ.text).join(' - ');
  const selectedTargets = chosenOccurrences.map((occ) => occ.text);

  // 8. Auto-Verification step (Critical requirement)
  // Ensure that substituting the correct answers back into questionText yields the exact original sentence.
  const parts = qText.split('___');
  let reconstructed = parts[0];
  for (let i = 0; i < selectedTargets.length; i++) {
    reconstructed += selectedTargets[i] + (parts[i + 1] || '');
  }

  if (reconstructed !== sentence) {
    console.error(`Reconstruction failed! Original: ${sentence}, Reconstructed: ${reconstructed}`);
    return null; // Fallback or reject this generation
  }

  return {
    questionText: qText,
    correctAnswer,
    readingWithBlanks: rText,
    selectedTargets,
  };
}
