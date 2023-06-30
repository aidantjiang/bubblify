import axios from "axios";

type Terms = "long_term" | "medium_term" | "short_term";

interface ObjectType1 {
    [key: string]: string;
}

export const authEndpoint = "https://accounts.spotify.com/authorize";
export const clientId = process.env.CLIENT_ID;
export const redirectUri = process.env.REDIRECT_URI;
export const scopes: string[] = [
"playlist-read-private",
"playlist-read-collaborative",
"user-library-read",
"user-top-read",
"user-read-private",
];


export const getTopArtists = async (token: string, time_frame: Terms) => {
    const response = await axios.get(
      `https://api.spotify.com/v1/me/top/artists?time_range=${time_frame}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    return response.data.items;
    };

export const getPlaylists = async (token: string) => {
    const hrefObject: ObjectType1 = {};

    const response = await axios.get(
        `https://api.spotify.com/v1/me/playlists`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      const items = response.data.items;

      for (let i = 0; i < items.length; i++) {
        const playlistName = items[i].name
        hrefObject[playlistName] = (items[i].tracks['href']);
      }

      return [items, hrefObject];
}

export const getPlaylistHrefs = async (token: string) => {
    const hrefList = [];

    const response = await axios.get(
        `https://api.spotify.com/v1/me/playlists`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      const items = response.data.items;

      for (let i = 0; i < items.length; i++) {
        hrefList.push(items[i].tracks['href']);
      }
}

//I LOVE YOU AXIOS!