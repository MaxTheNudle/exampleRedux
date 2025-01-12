import styles from "./page.module.css";
import { Button, Select } from "antd";
import Link from "next/link";
import { fallbackLng, languages } from "../i18n/settings";
import { useTranslation } from '../i18n'
import ChangeLntButton from "../../component/changelngButton";


export default async function Home({ params }: {
  params: {
    lng: string;
  };
}) {
  let { lng } = await params
  if (languages.indexOf(lng) < 0) lng = fallbackLng
  console.log("lng", lng)
  const { t } = await useTranslation(lng)

  return (
    <div className={styles.page}>
      <ChangeLntButton params={params} />
      <main className={styles.main}>
        <Link href={`/${lng}/test1`} passHref>
          <Button className={styles.ButtonNavigation}>
            <h1> {t('Test-1')}</h1>
            <p> {t('Layout&Style')} </p>
          </Button>
        </Link>
        <Link href={`/${lng}/test2`} passHref>
          <Button className={styles.ButtonNavigation}>
            <h1> {t('Test-2')}</h1>
            <p> {t('Form&Table')} </p>
          </Button>
        </Link>
      </main>
    </div>
  );
}
