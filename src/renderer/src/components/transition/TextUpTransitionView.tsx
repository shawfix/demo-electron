import { m } from 'motion/react';
import type { JSX } from 'react';

import { microReboundPreset } from './spring';

export function TextUpTransitionView(
  props: {
    text?: string;
    children?: string;
    appear?: boolean;
    eachDelay?: number;
    initialDelay?: number;
  } & JSX.IntrinsicElements['div']
): JSX.Element {
  const { appear = true, eachDelay = 0.1, initialDelay = 0, children, text, ...rest } = props;

  if (!appear) {
    return <div {...rest}>{text ?? children}</div>;
  }

  return (
    <div {...rest}>
      {Array.from(text ?? (children as string)).map((char, i) => {
        return (
          <m.span
            key={i}
            className="inline-block whitespace-pre"
            initial={{ transform: 'translateY(10px)', opacity: 0.001 }}
            animate={{
              transform: 'translateY(0px)',
              opacity: 1,
              transition: {
                ...microReboundPreset,
                duration: 0.1,
                delay: i * eachDelay + initialDelay
              }
            }}
          >
            {char}
          </m.span>
        );
      })}
    </div>
  );
}
