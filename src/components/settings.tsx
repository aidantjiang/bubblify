"use client";

import Image from "next/image";
import styles from "./settings.module.css";
import { useState } from "react";

import useSound from "use-sound";
import creakSfx from "public/sounds/creak.wav";
import closeSfx from "public/sounds/close.wav";

const Settings = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [playCreak] = useSound(creakSfx);
  const [playClose] = useSound(closeSfx);

  return (
    <div>
      <div
        className={`${styles.icon}`}
        onClick={() => {
          setVisible(true);
          playCreak();
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
              playClose();
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
