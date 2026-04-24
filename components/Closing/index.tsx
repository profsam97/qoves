import styles from "./Closing.module.scss";
import { ClosingContent } from "./ClosingContent";

export default function Closing() {
  return (
    <section className={styles.section}>
      <ClosingContent />
    </section>
  );
}
