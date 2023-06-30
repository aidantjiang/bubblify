import Image from "next/image";
import Link from "next/link";
import { authEndpoint, clientId, redirectUri, scopes } from "./logic/api";

export default function Home() {
  return (
    <main>
      <Link
        href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
          "%20"
        )}&response_type=token&show_dialog=true`}
      >
        send to login
      </Link>
    </main>
  );
}
