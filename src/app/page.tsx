import Image from "next/image";
import Link from "next/link";
import { authEndpoint, clientId, redirectUri, scopes } from "./logic/api";
import RetroButton from "@/components/button";
import styles from "./page.module.css";

export default function Home() {
  const redirectTo: string = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
    "%20"
  )}&response_type=token&show_dialog=true`;

  return (
    <main className={`retro-normal ${styles.onePage}`}>
      {/* /* STATIC ICONS/BGS */}
      <div className={`${styles.bg} ${styles.nonPriority}`} />
      <div className={`${styles.vinylDiv}`}>
        <Image
          src={"/../public/vinyl.png"}
          alt={"8bit vinyl"}
          className={`${styles.vinyl}`}
          width={200}
          height={200}
        />
      </div>
      {/* /* ACTUAL STUFF */}
      <div className={`${styles.title}`}>
        <div>Mixify</div>
        <div className={`${styles.subtitle}`}>a spotify app</div>
      </div>
      <div className={`${styles.fullscreen}`}>
        <RetroButton text={"log in"} link={true} url={redirectTo} />
        <RetroButton text={"about the creator"} />
      </div>
    </main>
  );
}
