'use client';
import { useState, useEffect } from 'react';
import { useReducedMotion } from 'motion/react';

export function useCountUp(target: number, duration = 600): number {
  const [count, setCount] = useState(0);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration, prefersReduced]);

  return prefersReduced ? target : count;
}
