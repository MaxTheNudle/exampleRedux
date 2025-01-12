"use client"
import styles from "./page.module.scss";
import { useAppDispatch, useAppSelector } from "@/strore/hooks";
import { useEffect, useState } from "react";
import { Button  , Tag   } from "antd";
import { moveLeft, moveRight, random } from "@/strore/slice/shapeList";
import { ShapeItem } from "@/strore/slice/shapeList";
import { CaretDownOutlined, CaretLeftOutlined, CaretRightOutlined, CaretUpOutlined  , } from '@ant-design/icons';
import Link from "next/link";
import { useTranslation } from "../../i18n/client";
import ChangeLntButton from "@/component/changelngButton";


export default  function Test1({ params }: { params: { lng: string } }) {
  const dispatch = useAppDispatch();
  const shape = useAppSelector((state) => state.shapeList.shape);
  const [isReversedLayout, setIsReversed] = useState(false);
  const lng = params.lng;

  const IconStyle =  {
    fontSize: '150px',
    color: '#888888',
  }
  const ShapeContent = [];
  for (let i = 0; i < shape.length; i += 3) {
    ShapeContent.push(
      <div className={`${styles.shapeRow} `} key={i}>
        {shape.slice(i, i + 3).map((shape: ShapeItem) => (
          <Button
            className={`${styles.Shape} `}
            type="default"
            onClick={() => dispatch(random())}
            key={shape.id}
          >
            <div className={`${styles[shape.type]}`}>
            </div>
          
          </Button>
        ))}
      </div>
    );
  }

  const { t } = useTranslation(lng);

  return (
    <>
      <header className={styles.header}>
        <div>
         <h1> {t('Layout&Style')} </h1>
        </div>
        <div>
        <ChangeLntButton params={params} />
        < Link href={`/${lng}`} passHref>
          <Button className={styles.HomeButton} > {t('Home')}</Button>
        </ Link>
        </div>
      </header>
      <div className={styles.page}>
        <div className={styles.buttonGroup}>
          <Button className={styles.normalSize} onClick={() => dispatch(moveLeft())}>
            <CaretLeftOutlined style={IconStyle} />
            <Tag className={styles.bottomTag} >{t("Move-Shape")}</Tag>
          </Button>
          <Button className={styles.extraLarge} onClick={() => setIsReversed(!isReversedLayout)}>
            <div className={styles.rotateIconGroup}>
              <CaretUpOutlined style={IconStyle} />
              <CaretDownOutlined style={IconStyle} />
            </div>
            <Tag className={styles.bottomTag} >{t("Move-Postion")}</Tag>
          </Button>
          <Button className={styles.normalSize} onClick={() => dispatch(moveRight())}>
            <CaretRightOutlined style={IconStyle} />
            <Tag className={styles.bottomTag} >{t("Move-Shape")}</Tag>
          </Button>
        </div>
        <div
          className={`${styles.ShapeContent} ${isReversedLayout ? styles.reversed : styles.normal
            }`}
        >
          {ShapeContent}
        </div>

      </div>
    </>
  );
}
