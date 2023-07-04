"use client";

import { useEffect, useState } from "react";
import GenreChart from "@/components/GenreChart";
import { TopArtists, cutDownGenres, getTopGenres } from "../logic/genres";
import { getPlaylistGenre, getPlaylists, getTopArtists } from "../logic/api";
import { access } from "fs";

interface UrlParams {
  [key: string]: string;
}
interface TopGenres {
  [key: string]: number;
}

const sampleData = {
  alternative: 20,
  hiphop: 20,
  indie: 20,
  jazz: 20,
  metal: 20,
  other: 20,
  pop: 20,
  rap: 20,
  rock: 20,
};

const Callback = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [tokenType, setTokenType] = useState<string | null>(null);
  const [expiresIn, setExpiresIn] = useState<number | null>(null);
  const [topArtists, setTopArtists] = useState<TopArtists[] | undefined>(
    undefined
  );
  const [topGenres, setTopGenres] = useState<TopGenres>(sampleData);
  const [playlists, setPlaylists] = useState<TopGenres[]>([]);
  const [mounted, setMounted] = useState<boolean>(false);

  const handleAccessToken = () => {
    let accessToken: string | null = null;
    let tokenType: string | null = null;
    let expiresIn: number | null = null;

    if (typeof window !== "undefined") {
      const fragment = window.location.hash.substring(1);

      const params: UrlParams = {};
      fragment.split("&").forEach((pair) => {
        const [key, value] = pair.split("=");
        params[key] = decodeURIComponent(value);
      });

      accessToken = params.access_token;
      tokenType = params.token_type;
      expiresIn = parseInt(params.expires_in, 10); // Convert to number
    } else {
      console.log("window did not window");
    }

    return { accessToken, tokenType, expiresIn };
  };

  useEffect(() => {
    const fragment = handleAccessToken();
    setAccessToken(fragment.accessToken);
    setTokenType(fragment.tokenType);
    setExpiresIn(fragment.expiresIn);

    const fetchTopArtists = async () => {
      if (accessToken && topArtists == undefined) {
        await getTopArtists(accessToken, "medium_term").then((artists) => {
          setTopArtists(artists);
          console.log("data", artists);
        });
      }
    };

    const fetchPlaylists = async () => {
      if (accessToken) {
        await getPlaylists(accessToken).then(async (playlistsObj) => {
          console.log("playlistsObj", playlistsObj);

          const playlistKeys = Object.keys(playlistsObj);
          let playlistsToAdd: TopGenres[] = [];

          for (const playlistKey of playlistKeys) {
            const playlistUrl = playlistsObj[playlistKey];
            if (
              playlistKey == "mix" ||
              playlistKey == "lax" ||
              playlistKey == "flow"
            ) {
              //DELETE LATER!
              await getPlaylistGenre(accessToken, playlistUrl)
                .then((response) => {
                  // Process the response from the Spotify API
                  console.log(
                    "Genre response for playlist",
                    playlistKey,
                    ":",
                    response
                  );
                  // Add your code here to handle the response
                  if (response !== undefined) {
                    playlistsToAdd.push(response);
                  }
                })
                .catch((error) => {
                  // Handle any errors that occur during the API request
                  console.error(
                    "Error retrieving playlist genre for",
                    playlistKey,
                    ":",
                    error
                  );
                });
            }
          } //DELETE LATER!
          setPlaylists(playlistsToAdd);
        });
      }
    };

    fetchTopArtists();
    fetchPlaylists();
  }, [accessToken]);

  useEffect(() => {
    let genres = getTopGenres(topArtists as TopArtists[], true);
    genres = cutDownGenres(genres);
    setTopGenres(genres);
    console.log("updated topgenres", genres);
  }, [topArtists]);

  useEffect(() => {
    setMounted(true);
  }, [playlists]);
  return (
    <div>
      {!mounted && <p>loading</p>}
      {mounted && (
        <>
          {topArtists?.map((artist) => (
            <p key={artist.id}>{artist.name}</p>
          ))}
          <GenreChart
            categories={Object.keys(topGenres as TopGenres)}
            data={[Object.values(topGenres as TopGenres), playlists]}
          />
        </>
      )}
    </div>
  );
};

export default Callback;
