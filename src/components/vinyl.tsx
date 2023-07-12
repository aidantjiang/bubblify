"use client";

import styles from "./vinyl.module.css";
import Image from "next/image";
import useSound from "use-sound";
import scratchSfx from "public/sounds/scratch.wav";
import { useState } from "react";

const Vinyl = () => {
  const [playScratch] = useSound(scratchSfx);
  const [isReversed, setIsReversed] = useState(true);

  return (
    <div
      className={`${styles.vinylDiv}`}
      onMouseDown={() => {
        playScratch();
        setIsReversed(true);
      }}
      onMouseUp={() => {
        setIsReversed(false);
      }}
    >
      <Image
        src={"/../public/vinyl.png"}
        alt={"8bit vinyl"}
        className={`${styles.vinyl} ${isReversed ? styles.reverseSpin : ""}`}
        width={200}
        height={200}
      />
    </div>
  );
};

export default Vinyl;
