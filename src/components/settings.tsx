"use client";

import Image from "next/image";
import styles from "./settings.module.css";
import { useState } from "react";

const Settings = () => {
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <div>
      <div
        className={`${styles.icon}`}
        onClick={() => {
          setVisible(true);
        }}
      >
        <Image
          src="/../public/settings.png"
          alt="settings gear"
          width="70"
          height="70"
        />
      </div>
      {visible && (
        <div className={`${styles.settingBarDiv} ${styles.slideIn}`}>
          <div
            className={`${styles.close}`}
            onClick={() => {
              setVisible(false);
            }}
          >
            <Image
              src={"/../public/close.png"}
              alt={"close button"}
              width={40}
              height={40}
            />
          </div>
          <div className={`${styles.bg}`}></div>
          <div className={`${styles.offWhiteBorder}`}></div>
          <div className={`${styles.flexDown}`}>
            <div className={`${styles.flexSide}`}>
              <p>SOUND ON! NO WAY TO TURN IT OFF :)</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
