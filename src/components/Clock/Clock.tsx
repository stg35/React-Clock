import { ClockProps } from "./Clock.props";
import styles from "./Clock.module.css";
import { useRef } from "react";

export const Clock = ({ hour, minute, second }: ClockProps): JSX.Element => {
  const hourRef = useRef<HTMLDivElement>(null);
  const minRef = useRef<HTMLDivElement>(null);
  const secRef = useRef<HTMLDivElement>(null);

  const hourDeg = (hour / 12) * 360 - 90 + (30 * (minute * 60 + second)) / 3600;
  const minDeg = (minute / 60) * 360 - 90 + (6 * second) / 60;
  const secDeg = (second / 60) * 360 - 90;

  if (hourRef.current && minRef.current && secRef.current) {
    hourRef.current.style.transform = `rotate(${hourDeg}deg)`;
    minRef.current.style.transform = `rotate(${minDeg}deg)`;
    secRef.current.style.transform = `rotate(${secDeg}deg)`;
  }

  return (
    <section>
      <div className={styles.clock}>
        <div className={styles.hour} ref={hourRef}></div>
        <div className={styles.min} ref={minRef}></div>
        <div className={styles.sec} ref={secRef}></div>
      </div>
    </section>
  );
};
