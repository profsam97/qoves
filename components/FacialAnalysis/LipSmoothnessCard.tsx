"use client";

import styles from "./LipSmoothnessCard.module.scss";

export function LipSmoothnessCard() {
  const value = 56;

  return (
    <div className={styles.card}>
      <span className={styles.label}>Lip Smoothness</span>
      <span className={styles.value}>{value}%</span>
      <div className={styles.barSection}>
        <div className={styles.barLabels}>
          <span>Rough (0%)</span>
          <span className={styles.youLabel}>{value}% (You)</span>
          <span>Smooth (100%)</span>
        </div>
        <div className={styles.track}>
          <div className={styles.fill} style={{ width: `${value}%` }} />
          <div className={styles.marker} style={{ left: `${value}%` }} />
        </div>
      </div>
    </div>
  );
}
