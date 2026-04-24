import styles from "./FacialAnalysis.module.scss";
import { Header } from "./Header";
import { Cards } from "./Cards";

export default function FacialAnalysis() {
  return (
    <section className={styles.section} aria-labelledby="facial-analysis-heading">
      <div className={styles.frame}>
        <Header />
        <Cards />
      </div>
    </section>
  );
}
