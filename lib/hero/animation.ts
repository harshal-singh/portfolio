const WORD_STEP_MS = 70;
const HEADLINE_START_MS = 50;
const LINE_GAP_MS = 80;
const BLOCK_GAP_MS = 130;

export function splitWords(text: string): string[] {
  return text.trim().split(/\s+/).filter(Boolean);
}

export function wordDelay(startMs: number, index: number): number {
  return startMs + index * WORD_STEP_MS;
}

const TYPEWRITER_PHRASES = [
  "loads faster.",
  "scales easily.",
  "looks perfect.",
];

export function heroAnimationTiming(headline: string, _highlight?: string) {
  const headlineWords = splitWords(headline);
  const highlightWords = splitWords(_highlight ?? "");
  const highlightStart =
    HEADLINE_START_MS + headlineWords.length * WORD_STEP_MS + LINE_GAP_MS;

  const longestPhraseChars = Math.max(
    ...TYPEWRITER_PHRASES.map((p) => p.length),
  );
  const typewriterFinish = highlightStart + longestPhraseChars * 55 + 120;
  const bodyDelay = typewriterFinish + LINE_GAP_MS;
  const ctaDelay = bodyDelay + BLOCK_GAP_MS;
  const metaDelay = ctaDelay + BLOCK_GAP_MS;

  return {
    headlineWords,
    highlightWords,
    headlineStart: HEADLINE_START_MS,
    highlightStart,
    bodyDelay,
    ctaDelay,
    metaDelay,
  };
}
