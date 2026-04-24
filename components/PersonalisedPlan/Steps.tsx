"use client";

import { useRef } from "react";
import styles from "./Steps.module.scss";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";

type Step = {
  n: number;
  title: string;
};

const STEPS: Step[] = [
  { n: 1, title: "Get your expert facial analysis" },
  { n: 2, title: "Visualise your best looking self" },
  { n: 3, title: "Get your personalized glow-up protocol" },
  { n: 4, title: "Track your progress and see dramatic results" },
];

export function Steps() {
  const rootRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      const cards = rootRef.current!.querySelectorAll(`.${styles.card}`);

      gsap.fromTo(
        cards,
        { y: 24, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          clearProps: "transform,opacity,visibility",
          scrollTrigger: {
            trigger: rootRef.current!,
            start: "top 95%",
            once: true,
          },
        },
      );

      return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className={styles.steps}>
      {STEPS.map((s) => (
        <article key={s.n} className={styles.card}>
          <span className={styles.badge} aria-hidden="true">
            <span className={styles.badgeNum}>{s.n}</span>
          </span>
          <h3 className={styles.title}>{s.title}</h3>
        </article>
      ))}
    </div>
  );
}
