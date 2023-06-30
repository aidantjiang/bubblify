"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import GenreChart from "@/components/GenreChart";
import { cutDownGenres } from "../logic/genres";
import { getTopArtists } from "../logic/api";

interface UrlParams {
  [key: string]: string;
}

interface TopArtists {
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string | null;
    total: number;
  };
  genres: string[];
  href: string;
  id: string;
  images: {
    height: number;
    url: string;
    width: number;
  }[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
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

  const getPercentage = (num: number, total: number) => {
    const rawPercentage = (num / total) * 100;
    return Number(rawPercentage.toFixed(2));
  };

  const getTopGenres = () => {
    //VARIABLE DECLARATIONS
    let genres: string[][] = [];
    let totalGenreEntries: number = 0;
    let genreCount: { [key: string]: number } = {};
    let result: { [key: string]: number } = {};

    //LIST ALL GENRES IN ARRAY
    topArtists?.map((artist) => {
      genres.push(artist.genres);
    });

    //COUNT INSTANCE OF EACH GENRE
    for (let i = 0; i < genres.length; i++) {
      for (let j = 0; j < genres[i].length; j++) {
        const currentGenre: string = genres[i][j];
        if (genreCount.hasOwnProperty(currentGenre)) {
          genreCount[currentGenre] += 1;
        } else {
          genreCount[currentGenre] = 1;
        }
        totalGenreEntries++;
      }
    }

    //MAKE ALL GENRE VALUES %'s OF TOTAL
    result = genreCount;
    for (let key in result) {
      const value = getPercentage(result[key], totalGenreEntries);
      result[key] = value;
    }

    //RETURN
    return result;
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

    fetchTopArtists();
  }, [accessToken]);

  useEffect(() => {
    let genres = getTopGenres();
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
