'use client';

import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

interface SplitTextProps extends HTMLMotionProps<'span'> {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}

export function SplitText({
  text,
  className = '',
  delay = 0,
  stagger = 0.008,
  ...props
}: SplitTextProps) {
  const letters = Array.from(text);

  return (
    <motion.span
      className={`inline-block ${className}`}
      initial="hidden"
      animate="visible"
      aria-label={text}
      {...props}
    >
      {letters.map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          className="inline-block whitespace-pre"
          variants={{
            hidden: {
              opacity: 0,
              y: 6,
            },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.3,
                ease: [0.16, 1, 0.3, 1],
                delay: delay + index * stagger,
              },
            },
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}
