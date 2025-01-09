"use client"
import styles from "./page.module.scss";
import { useAppDispatch, useAppSelector } from "@/strore/hooks";
import { useState } from "react";
import { Button  , Tag } from "antd";
import { moveLeft, moveRight, random } from "@/strore/slice/shapeList";
import { ShapeItem } from "@/strore/slice/shapeList";
import { CaretDownOutlined, CaretLeftOutlined, CaretRightOutlined, CaretUpOutlined } from '@ant-design/icons';

/**
 * 
 * This pages is for Layout and Style 
 */
export default function Test1() {
  const dispatch = useAppDispatch();
  const shape = useAppSelector((state) => state.shapeList.shape);
  const [isReversedLayout, setIsReversed] = useState(false);

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

  return (

    <div className={styles.page}>
      <div className={styles.buttonGroup}>
        <Button className={styles.normalSize} onClick={() => dispatch(moveLeft())}>
          <CaretLeftOutlined />
          <Tag className={styles.bottomTag }  color="blue">Blue</Tag>
        </Button>
        <Button className={styles.extraLarge} onClick={() => setIsReversed(!isReversedLayout)}>
        <CaretUpOutlined />
        <CaretDownOutlined />
        <Tag className={styles.bottomTag }  color="blue">Blue</Tag>
      
        </Button>
        <Button className={styles.normalSize} onClick={() => dispatch(moveRight())}>
        <CaretRightOutlined />
        <Tag className={styles.bottomTag }  color="blue">Blue</Tag>
        </Button>
      </div>
      <div
        className={`${styles.ShapeContent} ${isReversedLayout ? styles.reversed : styles.normal
          }`}
      >
        {ShapeContent}
      </div>

    </div>
  );
}
