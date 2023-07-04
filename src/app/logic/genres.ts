export interface genreInterface {
  [key: string]: number;
}

export interface TopArtists {
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

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//GETTOPGENRES() HELPERS

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const getPercentage = (num: number, total: number) => {
    const rawPercentage = (num / total) * 100;
    return Number(rawPercentage.toFixed(2));
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//TODO: STANDARDIZE SCALE

export const getTopGenres = (topArtists: TopArtists[] | string[][], turnIntoStringArray: boolean = false) => {
    //VARIABLE DECLARATIONS
    let genres: string[][] = [];
    let totalGenreEntries: number = 0;
    let genreCount: { [key: string]: number } = {};
    let result: { [key: string]: number } = {};

    //LIST ALL GENRES IN ARRAY
    if (turnIntoStringArray) {
      topArtists?.map((artist) => {
        if (typeof artist === 'object' && artist !== null && 'genres' in artist) {
          genres.push(artist.genres);
        }
      });
    } else {
      genres = topArtists as string[][];
    }

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

export const cutDownGenres = (genreObject: genreInterface) => {
    const genres = Object.keys(genreObject);
    let genreSimplificationOutput = {
        hiphop: 0,
        rap: 0,
        pop: 0,
        alternative: 0,
        metal: 0, 
        rock: 0,
        indie: 0,
        jazz: 0,
        other: 0,
    }

    for (let i = 0; i < genres.length; i++) {
        const currentGenre = genres[i];
        switch (true) {
            case currentGenre.includes('hip hop'):
                genreSimplificationOutput['hiphop'] += genreObject[currentGenre];
                break;
            case currentGenre.includes('rap'):
                genreSimplificationOutput['rap'] += genreObject[currentGenre];
                break;
            case currentGenre.includes('pop'):
                genreSimplificationOutput['pop'] += genreObject[currentGenre];
                break;
            case currentGenre.includes('alternative'):
                genreSimplificationOutput['alternative'] += genreObject[currentGenre];
                break;
            case currentGenre.includes('metal'):
                genreSimplificationOutput['metal'] += genreObject[currentGenre];
                break;
            case currentGenre.includes('rock'):
                genreSimplificationOutput['rock'] += genreObject[currentGenre];
                break;
            case currentGenre.includes('indie'):
                genreSimplificationOutput['indie'] += genreObject[currentGenre];
                break;
            case currentGenre.includes('jazz'):
                genreSimplificationOutput['jazz'] += genreObject[currentGenre];
                break;
            default:
                genreSimplificationOutput['other'] += genreObject[currentGenre];
                break;
        }        
    }

    return genreSimplificationOutput;
}