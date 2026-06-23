declare module 'hanzi-writer' {
  export interface CharacterData {
    strokes: string[];
    medians: number[][][];
    radStrokes?: number[];
  }

  export interface HanziWriterOptions {
    width?: number;
    height?: number;
    padding?: number;
    strokeAnimationSpeed?: number;
    strokeHighlightSpeed?: number;
    strokeHighlightDuration?: number;
    delayBetweenStrokes?: number;
    delayBetweenLoops?: number;
    strokeColor?: string;
    radicalColor?: string;
    highlightColor?: string;
    outlineColor?: string;
    drawingColor?: string;
    drawingWidth?: number;
    showOutline?: boolean;
    showCharacter?: boolean;
    showHintAfterMisses?: number;
    highlightOnComplete?: boolean;
    highlightCompleteColor?: string;
    charDataLoader?: (char: string, onLoad: (data: CharacterData) => void, onError: (err: any) => void) => void;
  }

  export default class HanziWriter {
    static create(element: HTMLElement | string, character: string, options?: HanziWriterOptions): HanziWriter;
    showCharacter(): void;
    hideCharacter(): void;
    animateCharacter(options?: { onComplete?: () => void }): void;
    animateStroke(strokeNum: number, options?: { onComplete?: () => void }): void;
    highlightStroke(strokeNum: number, options?: { onComplete?: () => void }): void;
    loopCharacterAnimation(): void;
    pauseAnimation(): void;
    resumeAnimation(): void;
    quiz(options?: {
      onMistake?: (strokeData: any) => void;
      onCorrectStroke?: (strokeData: any) => void;
      onComplete?: (summaryData: any) => void;
      showHintAfterMisses?: number;
      leniency?: number;
      highlightOnComplete?: boolean;
    }): void;
    cancelQuiz(): void;
  }
}
