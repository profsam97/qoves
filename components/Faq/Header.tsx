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
          start: "top 85%",
          once: true,
        },
        defaults: { ease: "power3.out" },
      });

      tl.fromTo(
        eyebrow,
        { y: 12, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.6, clearProps: "transform,opacity,visibility" },
      )
        .fromTo(
          headingWords,
          { y: 28, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.9,
            stagger: 0.08,
            clearProps: "transform,opacity,visibility",
          },
          "-=0.35",
        )
        .fromTo(
          subtitle,
          { y: 14, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.7, clearProps: "transform,opacity,visibility" },
          "-=0.55",
        );

      return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className={styles.header}>
      <span className={styles.eyebrow}>
        <span className={styles.eyebrowInner}>Your Questions</span>
      </span>
      <h2 id="faq-heading" className={styles.heading}>
        <span className={styles.word}>Frequently </span>
        <span className={styles.word}>asked </span>
        <span className={`${styles.word} ${styles.wordAccent}`}>questions</span>
      </h2>
      <p className={styles.subtitle}>
        If you have any further questions, please use the chat box in the bottom right or contact us by email at hello@qoves.com
      </p>
    </div>
  );
}
