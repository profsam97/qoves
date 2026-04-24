"use client";

import { useRef } from "react";
import styles from "./Header.module.scss";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";

export function Header() {
  const rootRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      const eyebrow = rootRef.current!.querySelector(`.${styles.eyebrow}`);
      const headingWords = rootRef.current!.querySelectorAll(`.${styles.word}`);
      const subtitle = rootRef.current!.querySelector(`.${styles.subtitle}`);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current!,
          start: "top 95%",
          once: true,
        },
        defaults: { ease: "power3.out" },
      });

      tl.fromTo(eyebrow, { y: 12, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6 })
        .fromTo(
          headingWords,
          { y: 28, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.9, stagger: 0.08, clearProps: "transform,opacity,visibility" },
          "-=0.35"
        )
        .fromTo(subtitle, { y: 14, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7 }, "-=0.55");
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className={styles.header}>
      <span className={styles.eyebrow}>
        <span className={styles.eyebrowInner}>Personalized Aesthetics</span>
      </span>
      <h2 id="facial-analysis-heading" className={styles.heading}>
        <span className={styles.word}>Your </span>
        <span className={styles.word}>complete </span>
        <span className={`${styles.word} ${styles.wordAccent}`}>facial </span>
        <span className={`${styles.word} ${styles.wordAccent}`}>analysis</span>
      </h2>
      <p className={styles.subtitle}>
        Every face is unique. We assess more than 100 unique facial markers to
        give you a precise understanding of your aesthetics.
      </p>
    </div>
  );
}
