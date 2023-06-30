"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import GenreChart from "@/components/GenreChart";
import { TopArtists, cutDownGenres, getTopGenres } from "../logic/genres";
import { getPlaylistHrefs, getPlaylists, getTopArtists } from "../logic/api";
import { access } from "fs";

interface UrlParams {
  [key: string]: string;
}
interface TopGenres {
  [key: string]: number;
}

const Callback = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [tokenType, setTokenType] = useState<string | null>(null);
  const [expiresIn, setExpiresIn] = useState<number | null>(null);
  const [topArtists, setTopArtists] = useState<TopArtists[] | undefined>(
    undefined
  );
  const [topGenres, setTopGenres] = useState<TopGenres | undefined>(undefined);
  const [playlists, setPlaylists] = useState<any>(undefined);
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
      if (accessToken && playlists == undefined) {
        await getPlaylists(accessToken).then((playlists) => {
          setPlaylists(playlists);
          console.log("playlists", playlists);
        });
      }
    };

    fetchTopArtists();
    fetchPlaylists();
  }, [accessToken]);

  useEffect(() => {
    let genres = getTopGenres(topArtists as TopArtists[]);
    genres = cutDownGenres(genres);
    console.log("updated genres", genres);
    setTopGenres(genres);
    console.log("topgenres", genres);
    setMounted(true);
  }, [topArtists]);

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
            data={Object.values(topGenres as TopGenres)}
          />
        </>
      )}
    </div>
  );
};

export default Callback;
