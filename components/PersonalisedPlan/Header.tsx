"use client";

import { useRef } from "react";
import styles from "./Header.module.scss";
import { gsap, ScrollTrigger } from "@/lib/gsap";
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
          start: "top 80%",
          once: true,
        },
        defaults: { ease: "power3.out" },
      });

      tl.from(eyebrow, { y: 12, autoAlpha: 0, duration: 0.6 })
        .from(
          headingWords,
          { y: 28, autoAlpha: 0, duration: 0.9, stagger: 0.08 },
          "-=0.35",
        )
        .from(subtitle, { y: 14, autoAlpha: 0, duration: 0.7 }, "-=0.55");

      return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className={styles.header}>
      <span className={styles.eyebrow}>
        <span className={styles.eyebrowInner}>Personalized Analysis</span>
      </span>
      <h1 id="personalised-plan-heading" className={styles.heading}>
        <span className={styles.word}>Get </span>
        <span className={styles.word}>your </span>
        <span className={styles.word}>personalised </span>
        <span className={`${styles.word} ${styles.wordAccent}`}>Qoves </span>
        <span className={`${styles.word} ${styles.wordAccent}`}>plan</span>
      </h1>
      <p className={styles.subtitle}>
        Understand your facial features and start your glow-up today
        <br />
        with a proven action plan, no plastic surgery needed.
      </p>
    </div>
  );
}
