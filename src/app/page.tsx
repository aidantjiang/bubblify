import Image from "next/image";
import Link from "next/link";
import { authEndpoint, clientId, redirectUri, scopes } from "./logic/api";
import RetroButton from "@/components/button";

export default function Home() {
  const redirectTo: string = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
    "%20"
  )}&response_type=token&show_dialog=true`;

  return (
    <main className={"retro-normal"}>
      <RetroButton text={"log in"} link={true} url={redirectTo} />
    </main>
  );
}
