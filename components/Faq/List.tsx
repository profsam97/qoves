"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import styles from "./List.module.scss";
import { FAQ_CATEGORIES } from "./data";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";

export function List() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  useIsomorphicLayoutEffect(() => {
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      const rows = rootRef.current!.querySelectorAll(`.${styles.category}`);

      gsap.fromTo(
        rows,
        { y: 16, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.06,
          clearProps: "transform,opacity,visibility",
          scrollTrigger: {
            trigger: rootRef.current!,
            start: "top 90%",
            once: true,
          },
        },
      );

      return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    }, rootRef);

    return () => ctx.revert();
  }, []);

  function toggleCategory(id: string) {
    if (openCategory === id) {
      setOpenCategory(null);
      setOpenQuestion(null);
      return;
    }
    setOpenCategory(id);
    const first = FAQ_CATEGORIES.find((c) => c.id === id)?.items[0];
    setOpenQuestion(first ? `${id}:0` : null);
  }

  function toggleQuestion(key: string) {
    setOpenQuestion((prev) => (prev === key ? null : key));
  }

  return (
    <div ref={rootRef} className={styles.list}>
      {FAQ_CATEGORIES.map((cat) => {
        const isOpen = openCategory === cat.id;
        return (
          <div
            key={cat.id}
            className={`${styles.category} ${isOpen ? styles.open : ""}`}
          >
            <button
              type="button"
              className={styles.categoryHeader}
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${cat.id}`}
              onClick={() => toggleCategory(cat.id)}
            >
              <span>{cat.title}</span>
              <span className={styles.categoryIcon} aria-hidden="true">
                <Image
                  src={isOpen ? "/assets/icons/close.png" : "/assets/icons/plus.png"}
                  alt=""
                  width={16}
                  height={16}
                />
              </span>
            </button>
            <div
              id={`faq-panel-${cat.id}`}
              className={styles.panel}
              role="region"
              aria-labelledby={`faq-panel-${cat.id}-label`}
            >
              <div className={styles.panelInner}>
                {cat.items.map((item, i) => {
                  const qKey = `${cat.id}:${i}`;
                  const qOpen = openQuestion === qKey;
                  return (
                    <div
                      key={qKey}
                      className={`${styles.question} ${qOpen ? styles.active : ""}`}
                    >
                      <button
                        type="button"
                        className={styles.questionHeader}
                        aria-expanded={qOpen}
                        aria-controls={`faq-a-${qKey}`}
                        onClick={() => toggleQuestion(qKey)}
                      >
                        <span>{item.q}</span>
                        <span className={styles.questionIcon} aria-hidden="true">
                          <Image
                            src={qOpen ? "/assets/icons/minus.png" : "/assets/icons/plus.png"}
                            alt=""
                            width={14}
                            height={14}
                          />
                        </span>
                      </button>
                      <div id={`faq-a-${qKey}`} className={styles.answerWrap}>
                        <div className={styles.answerInner}>
                          <p className={styles.answer}>{item.a}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
