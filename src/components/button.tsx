"use client";

import Link from "next/link";
import styles from "./button.module.css";
import { useState } from "react";
import PopUp from "./popup";

interface IProps {
  text: string;
  link?: boolean;
  url?: string;
  modalText?: string[];
}

const RetroButton = ({
  text,
  link = false,
  url = "",
  modalText = ["header", "body"],
}: IProps) => {
  const [visible, setVisible] = useState<boolean>(false);
  const handleVisible = () => {
    setVisible(!visible);
  };

  const content = link ? (
    <Link style={{ textDecoration: "none" }} href={url}>
      {text}
    </Link>
  ) : (
    <p
      onClick={() => {
        setVisible(true);
      }}
      className={styles.noStyling}
    >
      {text}
    </p>
  );

  return (
    <div className={`retro-bold ${styles.main}`}>
      <div className={styles.button}>{content}</div>
      {visible && (
        <div className={`${styles.modalContainer}`}>
          <PopUp modalText={modalText} change={handleVisible} />
        </div>
      )}
    </div>
  );
};

export default RetroButton;
