import React, { useEffect, useRef, useState } from 'react';
import useReveal from '../hooks/useReveal';

export default function AnimatedCounter({ value, duration = 900 }) {
  const [ref, isVisible] = useReveal();
  const [displayValue, setDisplayValue] = useState(0);
  const animationFrame = useRef(null);

  useEffect(() => {
    if (!isVisible) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      setDisplayValue(value);
      return undefined;
    }

    const startTime = performance.now();
    const animate = (currentTime) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(value * easedProgress));
      if (progress < 1) animationFrame.current = requestAnimationFrame(animate);
    };

    animationFrame.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame.current);
  }, [duration, isVisible, value]);

  return <span ref={ref}>{displayValue}</span>;
}
