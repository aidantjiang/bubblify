"use client";

import Link from "next/link";
import styles from "./button.module.css";
import { useState } from "react";
import PopUp from "./popup";
import useSound from "use-sound";
import clickSfx from "public/sounds/click.mp3";

interface IProps {
  text: string;
  link?: boolean;
  url?: string;
  modalText?: string[];
  modal: boolean;
}

const RetroButton = ({
  text,
  link = false,
  url = "",
  modalText = ["header", "body"],
  modal = false,
}: IProps) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [playClick] = useSound(clickSfx);
  const handleVisible = () => {
    setVisible(!visible);
  };

  const content = link ? (
    <Link style={{ textDecoration: "none" }} href={url}>
      {text}
    </Link>
  ) : (
    <p className={styles.noStyling}>{text}</p>
  );

  return (
    <div className={`retro-bold ${styles.main}`}>
      <div
        className={styles.button}
        onClick={() => {
          if (modal) {
            setVisible(true);
          }
          playClick();
        }}
      >
        {content}
      </div>
      {visible && (
        <div className={`${styles.modalContainer}`}>
          <PopUp modalText={modalText} change={handleVisible} />
        </div>
      )}
    </div>
  );
};

export default RetroButton;
