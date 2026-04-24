import styles from "./Faq.module.scss";
import { Header } from "./Header";
import { List } from "./List";

export default function Faq() {
  return (
    <section className={styles.section} aria-labelledby="faq-heading">
      <div className={styles.frame}>
        <Header />
        <List />
      </div>
    </section>
  );
}
