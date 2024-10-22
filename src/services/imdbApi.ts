const movieUrl = (page: number) => `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&region=US&page=${page}&sort_by=popularity.desc&without_genres=27&with_release_type=3|4|5`; // `27` is the genre ID for Horror
const trendingUrl = (page: number) => `https://api.themoviedb.org/3/trending/movie/week?page=${page}&without_genres=27&with_release_type=3|4|5`; // Adjust trending as well
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

// Fetch popular movies
const fetchPopularMovies = async (page: number) => {
  try {
    const response = await fetch(movieUrl(page), options);
    const data = await response.json();
    return data.results.map((movie: any) => ({
      id: movie.id,
      image: "https://image.tmdb.org/t/p/w500" + movie.poster_path,
      title: movie.title,
      overview: movie.overview,
      rating: movie.vote_average,
      genres: movie.genre_ids.map((id: number) => genreMap[id])
    }));
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    return [];
  }
};

// Fetch trending movies
const fetchTrendingMovies = async (page: number) => {
  try {
    const response = await fetch(trendingUrl(page), options);
    const data = await response.json();
    return data.results.map((movie: any) => ({
      id: movie.id,
      image: "https://image.tmdb.org/t/p/w500" + movie.poster_path,
      title: movie.title,
      overview: movie.overview,
      rating: movie.vote_average,
      genres: movie.genre_ids.map((id: number) => genreMap[id])
    }));
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    return [];
  }
};

// Combine and return mixed movie results
export const fetchTopMovies = async (page: number) => {
  try {
    if (Object.keys(genreMap).length === 0) {
      await fetchGenres();
    }
    
    const popularMovies = await fetchPopularMovies(page);
    const trendingMovies = await fetchTrendingMovies(page);

    // Combine both sets and remove duplicates by movie ID
    const combinedMovies = [...popularMovies, ...trendingMovies];
    const uniqueMovies = Array.from(new Map(combinedMovies.map(movie => [movie.id, movie])).values());

    // Optionally shuffle to add randomness
    uniqueMovies.sort(() => Math.random() - 0.5);

    // Adjust weight of horror movies (reduce occurrence but don't remove)
    const filteredMovies = uniqueMovies.filter(movie => !movie.genres.includes('Horror'));
    const horrorMovies = uniqueMovies.filter(movie => movie.genres.includes('Horror'));

    // Include fewer horror movies (e.g., 1 out of every 5)
    const finalMovies = [...filteredMovies, ...horrorMovies.slice(0, Math.ceil(filteredMovies.length / 5))];

    console.log('Fetched mixed top movies:', finalMovies);
    return finalMovies.reverse(); // Return in reverse order for display
  } catch (error) {
    console.error('Error fetching top movies:', error);
    return [];
  }
};