"use client";

import Image from "next/image";
import { useRef } from "react";
import styles from "./Cards.module.scss";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { BellCurveCard } from "./BellCurveCard";
import { LipSmoothnessCard } from "./LipSmoothnessCard";

export function Cards() {
  const rootRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      const portrait = rootRef.current!.querySelectorAll(`.${styles.portrait}`);
      const leftGroup = rootRef.current!.querySelector(`.${styles.leftGroup}`);
      const rightGroup = rootRef.current!.querySelector(`.${styles.rightGroup}`);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current!,
          start: "top 85%",
          once: true,
        },
        defaults: { ease: "power3.out" },
      });

      tl.fromTo(
        portrait,
        { y: 60, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 1, clearProps: "transform,opacity,visibility" }
      )
        .fromTo(
          leftGroup,
          { x: -50, autoAlpha: 0 },
          { x: 0, autoAlpha: 1, duration: 0.9, clearProps: "transform,opacity,visibility" },
          "-=0.6"
        )
        .fromTo(
          rightGroup,
          { x: 50, autoAlpha: 0 },
          { x: 0, autoAlpha: 1, duration: 0.9, clearProps: "transform,opacity,visibility" },
          "<"
        );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className={styles.stage}>
      <div className={`${styles.portrait} ${styles.portraitDesktop}`}>
        <Image
          src="/assets/img/lady.png"
          alt="Facial analysis portrait"
          fill
          sizes="(min-width: 1024px) 34vw, 60vw"
          priority
          className={styles.portraitImg}
        />
      </div>
      <div className={`${styles.portrait} ${styles.portraitMobile}`}>
        <Image
          src="/assets/img/mobile_lady.png"
          alt="Facial analysis portrait"
          fill
          sizes="(max-width: 480px) 360px, 0px"
          priority
          className={styles.portraitImg}
        />
      </div>

      <div className={styles.cardsRow}>
        <div className={styles.leftGroup}>
          <div className={styles.card1}>
            <Image
              src="/assets/img/feminine_masculine.png"
              alt="Brow shape analysis"
              fill
              sizes="(min-width: 1024px) 22vw, 40vw"
              className={styles.cardImg}
            />
          </div>
          <div className={styles.col23}>
            <div className={styles.card2wrap}>
              <BellCurveCard />
            </div>
            <div className={styles.card3wrap}>
              <LipSmoothnessCard />
            </div>
          </div>
        </div>

        <div className={styles.rightGroup}>
          <div className={styles.card4}>
            <Image
              src="/assets/img/eye.png"
              alt="Eye color spectrum analysis"
              fill
              sizes="(min-width: 1024px) 22vw, 40vw"
              className={styles.cardImg}
            />
          </div>
          <div className={styles.col56}>
            <div className={styles.card5wrap}>
              <Image
                src="/assets/img/facial_thrids.png"
                alt="Facial thirds proportion analysis"
                fill
                sizes="(min-width: 1024px) 22vw, 40vw"
                className={styles.cardImg}
              />
            </div>
            <div className={styles.card6wrap}>
              <Image
                src="/assets/img/asymetrical.png"
                alt="Facial symmetry comparison"
                fill
                sizes="(min-width: 1024px) 22vw, 40vw"
                className={styles.cardImg}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
