import { useEffect, useRef, useState } from 'react';

export default function useReveal() {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;

    const reveal = () => {
      setIsVisible(true);
      observer.unobserve(element);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) reveal();
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px' }
    );

    observer.observe(element);
    const { top, bottom } = element.getBoundingClientRect();
    if (top < window.innerHeight && bottom > 0) reveal();
    return () => observer.disconnect();
  }, []);

  return [ref, isVisible];
}
