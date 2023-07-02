import axios from "axios";
import { cutDownGenres, genreInterface, getTopGenres } from "./genres";

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

      return hrefObject;
}

export const getPlaylistGenre = async (token: string, apiurl: string) => {
  let exportGenreEnd;
  let artistIdArray: string[] = [];

  const response = await axios.get(
    apiurl,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );

  //TOODS
  //TODO PLAYSLISTS ABOVE 100 TRACK LIMIT ON API CALL
  //TODO CHECK FOR REPEAT ALBUMS
  //TODO IMPORTANT: ADD SUPPORT FOR 50+ ARTISTS (MULTIPLE CALLS OF GETARTISTGENRES())

  let totalTracks = response.data.total; //use for playlists over 100 tracks
  let maxArtistApiCount = 50;
  let items = response.data.items;
  for (let i = 0; i < items.length; i++)  {
    if (maxArtistApiCount > 0) {
      let artistsOnTrack = items[i].track.artists;
      for (let j = 0; j < artistsOnTrack.length; j++) {
        artistIdArray.push(artistsOnTrack[j].id);
        maxArtistApiCount--;
      }
    }
    //   }
    // } else {
    //   getArtistGenres(token, artistIdArray).then((genres) => {
    //     console.log('20 album genres', genres);
    //     artistIdArray = [];
    //   })
    //   maxArtistApiCount = 50;
    // }
  }
  await getArtistGenres(token, artistIdArray, true).then((genres) => {
        console.log('50 artist genres', genres);
        exportGenreEnd = genres;
        artistIdArray = [];
      });
  // if (trackIdArray.length > 0) {
  //   getAlbumGenres(token, trackIdArray).then((genres) => {
  //     console.log('50 album genres', genres);
  //   })
  // }
  return exportGenreEnd;
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//GETARTISTGENRES() HELPERS

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const formatArtistGenres = (genres: string[][]) => {
  let artistGenres = getTopGenres(genres);
  artistGenres = cutDownGenres(artistGenres);

  return artistGenres
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const getArtistGenres = async (token: string, ids: string[], formatData: boolean = false) => {
  //PROCCESSING ARRAY FORMAT OF TRACKS INTO ONE STRING

  const commaSeparatedArtists = ids.join(',');

  console.log(`https://api.spotify.com/v1/artists?ids=${commaSeparatedArtists}`)

  const response = await axios.get('https://api.spotify.com/v1/artists', {
    params: {
      ids: commaSeparatedArtists
    },
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  let genres: string[][] | genreInterface = [];

  const artists = response.data.artists;
  for (let i = 0; i < artists.length; i++) {
    genres.push(artists[i].genres);
  }

  if (formatData) {
    genres = formatArtistGenres(genres);
  }

  return genres;
}