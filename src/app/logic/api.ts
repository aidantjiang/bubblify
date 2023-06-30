import axios from "axios";

type Terms = "long_term" | "medium_term" | "short_term";

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

