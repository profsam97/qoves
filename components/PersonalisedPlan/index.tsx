import styles from "./PersonalisedPlan.module.scss";
import { Header } from "./Header";
import { Showcase } from "./Showcase";
import { Steps } from "./Steps";

export default function PersonalisedPlan() {
  return (
    <section className={styles.section} aria-labelledby="personalised-plan-heading">
      <div className={styles.frame}>
        <Header />
        <Showcase />
        <Steps />
      </div>
    </section>
  );
}
