"use client";

import Image from "next/image";
import { useRef } from "react";
import styles from "./Showcase.module.scss";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Showcase() {
  const rootRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (!rootRef.current) return;
    let cleanupConnector = () => {};

    const ctx = gsap.context(() => {
      const before = rootRef.current!.querySelector<HTMLElement>(
        `.${styles.before}`,
      );
      const after = rootRef.current!.querySelector<HTMLElement>(
        `.${styles.after}`,
      );
      const topPath = rootRef.current!.querySelector<SVGPathElement>(
        `.${styles.pathTop}`,
      );
      const bottomPath = rootRef.current!.querySelector<SVGPathElement>(
        `.${styles.pathBottom}`,
      );
      const dotTop = rootRef.current!.querySelector<SVGCircleElement>(
        `.${styles.dotTop}`,
      );
      const dotBottom = rootRef.current!.querySelector<SVGCircleElement>(
        `.${styles.dotBottom}`,
      );
      const connector = rootRef.current!.querySelector<HTMLElement>(
        `.${styles.connector}`,
      );
      const connectorSvg = rootRef.current!.querySelector<SVGSVGElement>(
        `.${styles.connectorSvg}`,
      );

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

      if (
        !before ||
        !after ||
        !connector ||
        !connectorSvg ||
        !topPath ||
        !bottomPath ||
        !dotTop ||
        !dotBottom
      ) {
        return;
      }

      const connectorTweens: gsap.core.Tween[] = [];

      const animateDot = (path: SVGPathElement, dot: SVGCircleElement) => {
        const length = path.getTotalLength();
        if (!Number.isFinite(length) || length <= 0) return;

        const state = { progress: 0 };
        const setDotPosition = () => {
          const point = path.getPointAtLength(length * state.progress);
          gsap.set(dot, {
            attr: { cx: point.x, cy: point.y },
            autoAlpha: 1,
          });
        };

        setDotPosition();
        connectorTweens.push(
          gsap.to(state, {
            progress: 1,
            duration: 4.2,
            repeat: -1,
            repeatDelay: 0.15,
            ease: "none",
            onUpdate: setDotPosition,
          }),
        );
      };

      const format = (value: number) => Math.round(value * 10) / 10;

      const syncConnector = () => {
        connectorTweens.splice(0).forEach((tween) => tween.kill());

        connectorSvg.setAttribute(
          "viewBox",
          `0 0 ${connector.offsetWidth} ${connector.offsetHeight}`,
        );

        const beforeOuter = format(
          before.offsetLeft - connector.offsetLeft - 0.5,
        );
        const beforeInner = format(
          before.offsetLeft + before.offsetWidth - connector.offsetLeft + 0.5,
        );
        const afterInner = format(
          after.offsetLeft - connector.offsetLeft - 0.5,
        );
        const afterOuter = format(
          after.offsetLeft + after.offsetWidth - connector.offsetLeft + 0.5,
        );
        const top = before.offsetTop - connector.offsetTop;
        const cardHeight = before.offsetHeight;
        const topLine = format(top - 0.5);
        const bottomLine = format(top + cardHeight + 0.5);
        const topBridge = format(top + cardHeight * 0.38);
        const bottomBridge = format(top + cardHeight * 0.62);

        topPath.setAttribute(
          "d",
          [
            `M ${beforeOuter} ${bottomLine}`,
            `V ${topLine}`,
            `H ${beforeInner}`,
            `M ${beforeInner} ${topBridge}`,
            `H ${afterInner}`,
            `M ${afterInner} ${topLine}`,
            `H ${afterOuter}`,
            `V ${bottomLine}`,
          ].join(" "),
        );

        bottomPath.setAttribute(
          "d",
          [
            `M ${afterOuter} ${bottomLine}`,
            `H ${afterInner}`,
            `M ${afterInner} ${bottomBridge}`,
            `H ${beforeInner}`,
            `M ${beforeInner} ${bottomLine}`,
            `H ${beforeOuter}`,
          ].join(" "),
        );

        animateDot(topPath, dotTop);
        animateDot(bottomPath, dotBottom);
      };

      let animationFrame = window.requestAnimationFrame(syncConnector);
      const queueSync = () => {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = window.requestAnimationFrame(syncConnector);
      };
      const resizeObserver = new ResizeObserver(queueSync);

      resizeObserver.observe(rootRef.current!);
      resizeObserver.observe(before);
      resizeObserver.observe(after);
      window.addEventListener("resize", queueSync);

      cleanupConnector = () => {
        window.cancelAnimationFrame(animationFrame);
        window.removeEventListener("resize", queueSync);
        resizeObserver.disconnect();
        connectorTweens.forEach((tween) => tween.kill());
      };
    }, rootRef);

    return () => {
      cleanupConnector();
      ctx.revert();
    };
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
          className={styles.connectorSvg}
          preserveAspectRatio="none"
        >
          <path
            className={`${styles.connectorPath} ${styles.pathTop}`}
          />
          <path
            className={`${styles.connectorPath} ${styles.pathBottom}`}
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
