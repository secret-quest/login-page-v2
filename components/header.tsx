import { DynamicWidget } from "@dynamic-labs/sdk-react-core";
import Link from "next/link";
import styles from "./header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <nav className={styles.nav}>
          <div className={styles.logo}>Secret Quest</div>
          <div className={styles.navLinks}>
            <DynamicWidget />
          </div>
        </nav>
      </div>
    </header>
  );
}