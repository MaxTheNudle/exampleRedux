
import styles from "./page.module.css";
import { Button } from "antd";
import Link from "next/link";
export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
      <Link href="/test1" passHref>
        <Button className={styles.ButtonNavigation}> Test 1 </Button>
      </Link>
      <Link href="/test2" passHref>
        <Button className={styles.ButtonNavigation}> Test 2 </Button>
      </Link>
      </main>
    </div>
  );
}
