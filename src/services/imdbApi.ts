const movieUrl = (page: number) => `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&region=US&page=${page}&sort_by=popularity.desc`;
const genreUrl = `https://api.themoviedb.org/3/genre/movie/list?language=en-US`;
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwN2JhNzQwN2M1MWQyYmJiNmE4Yjk5NWUzY2Y3YTdiOCIsIm5iZiI6MTcyOTM3MDM2NC4xODAxNDIsInN1YiI6IjY3MTQxODNjOTlmMjJmMzI2YWFkMzE2MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.L5qFOnzckPJmz0RV2yS2VFl8UlEbKDn5qJvwF8Hi1-I'
  }
};

let genreMap: { [key: number]: string } = {};

const fetchGenres = async () => {
  try {
    const response = await fetch(genreUrl, options);
    const data = await response.json();
    genreMap = data.genres.reduce((map: { [key: number]: string }, genre: any) => {
      map[genre.id] = genre.name;
      return map;
    }, {});
  } catch (error) {
    console.error('Error fetching genres:', error);
  }
};

export const fetchTopMovies = async (page: number) => {
  try {
    if (Object.keys(genreMap).length === 0) {
      await fetchGenres();
    }
    const response = await fetch(movieUrl(page), options);
    const data = await response.json();
    const movies = data.results.map((movie: any) => ({
      image: "https://image.tmdb.org/t/p/w500" + movie.poster_path,
      title: movie.title,
      overview: movie.overview,
      rating: movie.vote_average,
      genres: movie.genre_ids.map((id: number) => genreMap[id])
    }));
    console.log('Fetched top movies:', movies);
    return movies.reverse();
  } catch (error) {
    console.error('Error fetching top movies:', error);
    return [];
  }
};
