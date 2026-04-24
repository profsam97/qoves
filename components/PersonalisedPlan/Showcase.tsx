"use client";

import Image from "next/image";
import { useRef } from "react";
import styles from "./Showcase.module.scss";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
}

export function Showcase() {
  const rootRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      const before = rootRef.current!.querySelector(`.${styles.before}`);
      const after = rootRef.current!.querySelector(`.${styles.after}`);
      const topPath = rootRef.current!.querySelector<SVGPathElement>(
        `.${styles.pathTop}`,
      );
      const bottomPath = rootRef.current!.querySelector<SVGPathElement>(
        `.${styles.pathBottom}`,
      );
      const dotTop = rootRef.current!.querySelector(`.${styles.dotTop}`);
      const dotBottom = rootRef.current!.querySelector(`.${styles.dotBottom}`);

      const reveal = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current!,
          start: "top 90%",
          once: true,
        },
        defaults: { ease: "power3.out" },
      });

      reveal
        .fromTo(
          before,
          { x: -30, autoAlpha: 0 },
          { x: 0, autoAlpha: 1, duration: 0.9 },
        )
        .fromTo(
          after,
          { x: 30, autoAlpha: 0 },
          { x: 0, autoAlpha: 1, duration: 0.9 },
          "<",
        );

      if (topPath && dotTop) {
        gsap.to(dotTop, {
          duration: 4,
          repeat: -1,
          repeatDelay: 0.15,
          ease: "none",
          motionPath: {
            path: topPath,
            align: topPath,
            alignOrigin: [0.5, 0.5],
            start: 0,
            end: 1,
          },
        });
      }

      if (bottomPath && dotBottom) {
        gsap.to(dotBottom, {
          duration: 4,
          repeat: -1,
          repeatDelay: 0.15,
          ease: "none",
          motionPath: {
            path: bottomPath,
            align: bottomPath,
            alignOrigin: [0.5, 0.5],
            start: 0,
            end: 1,
          },
        });
      }

      return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className={styles.showcase}>
      <figure className={`${styles.card} ${styles.before}`}>
        <div className={styles.photoWrap}>
          <Image
            src="/assets/img/the_before.png"
            alt="Before facial analysis"
            fill
            sizes="(min-width: 1024px) 32vw, 90vw"
            priority
            className={styles.photo}
          />
        </div>
      </figure>

      <div className={styles.connector} aria-hidden="true">
        <svg
          viewBox="0 0 320 520"
          preserveAspectRatio="none"
          className={styles.connectorSvg}
        >
          <path
            className={`${styles.connectorPath} ${styles.pathTop}`}
            d="M 0 180 L 140 180 Q 160 180 160 200 L 160 240 Q 160 260 180 260 L 320 260"
          />
          <path
            className={`${styles.connectorPath} ${styles.pathBottom}`}
            d="M 320 300 L 180 300 Q 160 300 160 320 L 160 360 Q 160 380 140 380 L 0 380"
          />
          <circle
            className={`${styles.dot} ${styles.dotTop}`}
            cx="0"
            cy="0"
            r="3.5"
          />
          <circle
            className={`${styles.dot} ${styles.dotBottom}`}
            cx="0"
            cy="0"
            r="3.5"
          />
        </svg>
      </div>

      <figure className={`${styles.card} ${styles.after}`}>
        <div className={styles.photoWrap}>
          <Image
            src="/assets/img/after.png"
            alt="After personalised glow-up plan"
            fill
            sizes="(min-width: 1024px) 32vw, 90vw"
            priority
            className={styles.photo}
          />
        </div>
      </figure>
    </div>
  );
}
