import { useEffect, useRef } from 'react';

/**
 * useScrollReveal - attaches IntersectionObserver to elements with
 * .scroll-reveal / .scroll-reveal-left / .scroll-reveal-right / .scroll-reveal-scale
 * and adds .is-visible when they enter the viewport.
 *
 * Call once at the top-level App or in each page component.
 */
export function useScrollReveal(rootMargin = '-60px') {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      { rootMargin, threshold: 0.1 }
    );

    const classes = [
      '.scroll-reveal',
      '.scroll-reveal-left',
      '.scroll-reveal-right',
      '.scroll-reveal-scale',
    ];

    const elements = document.querySelectorAll(classes.join(', '));
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, [rootMargin]);
}
