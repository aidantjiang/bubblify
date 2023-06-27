import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const authEndpoint = "https://accounts.spotify.com/authorize";
  const clientId = process.env.CLIENT_ID;
  const redirectUri = process.env.REDIRECT_URI;
  const scopes: string[] = [
    "playlist-read-private",
    "playlist-read-collaborative",
    "user-library-read",
    "user-top-read",
    "user-read-private",
  ];

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
