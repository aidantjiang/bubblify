"use client";

import styles from "./vinyl.module.css";
import Image from "next/image";
import { useSound } from "use-sound";
import scratchSfx from "public/sounds/scratch.wav";
import elevatorMusic from "public/sounds/elevator.mp3";
import { useEffect, useState } from "react";

const Vinyl = () => {
  const [playScratch] = useSound(scratchSfx);
  const [playMusic, { pause, stop, sound }] = useSound(elevatorMusic);
  const [isReversed, setIsReversed] = useState(true);

  return (
    <div
      className={`${styles.vinylDiv}`}
      onMouseDown={() => {
        playScratch();
        setIsReversed(true);
        pause();
      }}
      onMouseUp={() => {
        setIsReversed(false);
        sound.loop(true);
        playMusic();
      }}
    >
      <Image
        src={"/../public/vinyl.png"}
        alt={"8bit vinyl"}
        className={`${styles.vinyl} ${isReversed ? styles.pause : ""}`}
        width={200}
        height={200}
      />
    </div>
  );
};

export default Vinyl;
