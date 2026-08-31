import React from 'react';
import useReveal from '../hooks/useReveal';

export default function Reveal({ children, className = '', style }) {
  const [ref, isVisible] = useReveal();

  return (
    <div ref={ref} style={style} className={`reveal-on-scroll ${isVisible ? 'is-visible' : ''} ${className}`}>
      {children}
    </div>
  );
}
