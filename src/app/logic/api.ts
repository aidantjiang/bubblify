import axios from "axios";

type Terms = "long_term" | "medium_term" | "short_term";

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
    const response = await axios.get(
        `https://api.spotify.com/v1/me/playlists`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      return response.data.items;
}

export const getPlaylistHrefs = async (token: string) => {
    const response = await axios.get(
        `https://api.spotify.com/v1/me/playlists`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      const items = response.data.items;
}

//I LOVE YOU AXIOS!