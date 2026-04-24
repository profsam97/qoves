"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  ReferenceDot,
} from "recharts";
import styles from "./BellCurveCard.module.scss";

function gaussian(x: number, mean: number, std: number) {
  return Math.exp(-0.5 * ((x - mean) / std) ** 2) / (std * Math.sqrt(2 * Math.PI));
}

const MEAN = 50;
const STD = 15;
const data = Array.from({ length: 101 }, (_, i) => ({
  x: i,
  y: gaussian(i, MEAN, STD),
}));

const markers = [
  { x: 15, label: "" },
  { x: 35, label: "" },
  { x: 55, label: "" },
  { x: 72, label: "" },
  { x: 85, label: "" },
  { x: 95, label: "" },
];

export function BellCurveCard() {
  return (
    <div className={styles.card}>
      <div className={styles.chartWrap}>
        <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
          <AreaChart data={data} margin={{ top: 10, right: 0, bottom: 0, left: 0 }}>
            <defs>
              <linearGradient id="bellFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(255,255,255,0.35)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.05)" />
              </linearGradient>
            </defs>
            <XAxis dataKey="x" hide />
            <YAxis hide />
            <Area
              type="monotone"
              dataKey="y"
              stroke="rgba(255,255,255,0.7)"
              strokeWidth={2}
              fill="url(#bellFill)"
              isAnimationActive={false}
            />
            {markers.map((m) => (
              <ReferenceDot
                key={m.x}
                x={m.x}
                y={0}
                r={3}
                fill="rgba(255,255,255,0.6)"
                stroke="none"
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className={styles.axis}>
        <span>Low Density</span>
        <span>Medium Density</span>
        <span>High Density</span>
      </div>
      <div className={styles.caption}>
        Your eyebrow density is in the mid 40th percentile
      </div>
    </div>
  );
}
