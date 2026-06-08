import type { CSSProperties } from 'react';
import './HoverText.css';

type HoverTextProps = {
  text: string;
  className?: string;
  tag?: 'span' | 'h1' | 'h2' | 'h3' | 'p' | 'a';
};

export function HoverText({ text, className = '', tag: Tag = 'span' }: HoverTextProps) {
  return (
    <Tag className={`hover-text ${className}`} aria-label={text}>
      {text.split('').map((char, i) => (
        <span
          key={`${char}-${i}`}
          className="hover-text__char"
          style={{ '--char-index': i } as CSSProperties}
          aria-hidden="true"
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </Tag>
  );
}
