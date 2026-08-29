import { wordDelay } from "@/lib/hero/animation";
import { cn } from "@/lib/utils";

type HeroSplitWordsProps = {
  words: string[];
  startDelay: number;
  accent?: boolean;
};

export function HeroSplitWords({
  words,
  startDelay,
  accent = false,
}: HeroSplitWordsProps) {
  return (
    <>
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className={cn("hero-word", accent && "text-accent")}
          style={{ animationDelay: `${wordDelay(startDelay, index)}ms` }}
        >
          {word}
        </span>
      ))}
    </>
  );
}
