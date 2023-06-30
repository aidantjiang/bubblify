interface genreInterface {
    [key: string]: number;
}

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