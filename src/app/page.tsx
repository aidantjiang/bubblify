import Image from "next/image";
import { authEndpoint, clientId, redirectUri, scopes } from "./logic/api";
import RetroButton from "@/components/button";
import styles from "./page.module.css";
import Vinyl from "@/components/vinyl";

export default function Home() {
  const redirectTo: string = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
    "%20"
  )}&response_type=token&show_dialog=true`;

  return (
    <main className={`retro-normal ${styles.onePage}`}>
      {/* /* STATIC ICONS/BGS */}
      <div className={`${styles.bg} ${styles.nonPriority}`} />
      <Vinyl />
      {/* /* ACTUAL STUFF */}
      <div className={`${styles.title}`}>
        <div>Mixify</div>
        <div className={`${styles.subtitle}`}>a spotify app</div>
      </div>
      <div className={`${styles.fullscreen}`}>
        <RetroButton
          text={"log in"}
          link={true}
          url={redirectTo}
          modal={false}
        />
        <RetroButton
          text={"about the creator"}
          modalText={[
            "aidan jiang",
            "high schooler/creative",
            "insta: @aidantjiang",
            "boulder co",
          ]}
          modal={true}
        />
      </div>
    </main>
  );
}
