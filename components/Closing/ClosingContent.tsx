"use client";

import { useRef } from "react";
import Image from "next/image";
import styles from "./ClosingContent.module.scss";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";

const SLIDE1_CARDS = [
  {
    image: "/assets/img/card_3.png",
    title: "Lifestyle factors",
    description: "Considers diet, climate, stress, sleep, and habits.",
  },
  {
    image: "/assets/img/card_1.png",
    title: "Cultural beauty standards",
    description: "Adapts to regional and societal ideals.",
  },
  {
    image: "/assets/img/card_2.png",
    title: "Genetic factors",
    description:
      "Takes into account genetic factors and how they might impact your facial aesthetics.",
  },
];

const CONSIDER_ITEMS = [
  "First impressions matter",
  "It has a considerable impact on interpersonal interactions",
  "Small improvements can drastically impact quality of life",
];

const KEY_ITEMS = [
  "Not chasing unrealistic standards",
  "Not trying to look like someone else",
  "Not seeking perfection",
  "Aiming only for a better version of yourself",
];

export function ClosingContent() {
  const rootRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const overlayLightRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const slide1Ref = useRef<HTMLDivElement>(null);
  const slide2Ref = useRef<HTMLDivElement>(null);
  const considerRef = useRef<HTMLDivElement>(null);
  const keyRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      const pinTl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current!,
          start: "top top",
          end: "+=250%",
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
        },
      });

      gsap.set(bgRef.current!, { filter: "blur(0px)" });

      pinTl
        .to(slide1Ref.current!, { autoAlpha: 0, y: -60, duration: 0.3 })
        .to(eyebrowRef.current!, { autoAlpha: 0, duration: 0.3 }, "<")
        .to(
          bgRef.current!,
          { filter: "blur(28px)", scale: 1.08, duration: 0.3 },
          "<"
        )
        .to(overlayRef.current!, { autoAlpha: 0, duration: 0.3 }, "<")
        .to(overlayLightRef.current!, { autoAlpha: 1, duration: 0.3 }, "<")
        .fromTo(
          slide2Ref.current!,
          { autoAlpha: 0, y: 60 },
          { autoAlpha: 1, y: 0, duration: 0.3 },
          "-=0.15"
        )
        .fromTo(
          considerRef.current!,
          { autoAlpha: 0, y: 40 },
          { autoAlpha: 1, y: 0, duration: 0.25 },
          "-=0.1"
        )
        .fromTo(
          keyRef.current!,
          { autoAlpha: 0, y: 40 },
          { autoAlpha: 1, y: 0, duration: 0.25 },
          "-=0.05"
        );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className={styles.root}>
      <div ref={bgRef} className={styles.bg}>
        <Image
          src="/assets/img/bottom_cover.png"
          alt=""
          fill
          sizes="100vw"
          priority
          style={{ objectFit: "cover", objectPosition: "center 25%" }}
        />
      </div>

      <div ref={overlayRef} className={styles.overlay} />
      <div
        ref={overlayLightRef}
        className={styles.overlayLight}
        style={{ visibility: "hidden" }}
      />

      <div ref={eyebrowRef} className={styles.eyebrowWrap}>
        <span className={`${styles.eyebrow} ${styles.eyebrowDesktop}`}>
          <span className={styles.eyebrowInner}>Your Questions</span>
        </span>
      </div>

      {/* Slide 1 */}
      <div ref={slide1Ref} className={styles.slide}>
        <div className={styles.slide1Content}>
          <span className={`${styles.eyebrow} ${styles.eyebrowMobile}`}>
            <span className={styles.eyebrowInner}>Backed by 2000+ research papers</span>
          </span>
          <h2 className={styles.heading}>
            <span className={styles.headingLine}>Will analyzing my face</span>
            <span className={`${styles.headingLine} ${styles.headingMuted}`}>
              Make me insecure?
            </span>
          </h2>
          <p className={styles.subtitle}>
            Most insecurity comes from uncertainty—not knowing if your concerns
            are real or imagined. When you&apos;re guessing about your appearance,
            your mind often makes things seem worse than they are.
          </p>
           <p className={styles.subtitle2}>
            Get your personalized facial analysis and transformation plan based on 2000+ academic studies.
          </p>
          <button type="button" className={styles.cta}>
            <span>Start your glow-up</span>
            <span className={styles.ctaIcon}>
              <Image
                src="/assets/icons/chevron_right.png"
                alt=""
                width={20}
                height={20}
              />
            </span>
          </button>
          <div className={styles.cards}>
            {SLIDE1_CARDS.map((card) => (
              <div key={card.title} className={styles.card}>
                <div className={styles.cardImage}>
                  <Image
                    src={card.image}
                    alt={card.title}
                    width={120}
                    height={81}
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={styles.cardDesc}>{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Slide 2 */}
      <div ref={slide2Ref} className={styles.slide} style={{ visibility: "hidden" }}>
        <div className={styles.slide2Content}>
          <div className={styles.slide2Center}>
            <h2 className={styles.heading2}>
              <span className={styles.heading2Line}>Is it vain to care</span>
              <span className={`${styles.heading2Line} ${styles.headingMuted}`}>
                about your appearance?
              </span>
            </h2>
            <p className={styles.subtitle2}>
              Many feel guilty about wanting to improve their looks, fearing it means
              they&apos;re shallow or insecure. But here&apos;s what research tells us:
              caring about appearance is natural. Like health, finances, and education,
              it&apos;s just another form of self-improvement.
            </p>
          </div>

          <div className={styles.slide2Cards}>
            <div ref={considerRef} className={styles.considerCard} style={{ visibility: "hidden" }}>
              <h3 className={styles.considerTitle}>Consider this...</h3>
              <div className={styles.considerItems}>
                {CONSIDER_ITEMS.map((item) => (
                  <div key={item} className={styles.considerItem}>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div ref={keyRef} className={styles.keyCard} style={{ visibility: "hidden" }}>
              <h3 className={styles.keyTitle}>
                The key is approaching
                <br />
                it intelligently
              </h3>
              <div className={styles.keyItems}>
                {KEY_ITEMS.map((item) => (
                  <div key={item} className={styles.keyItem}>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
