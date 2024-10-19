const url = (page: number) => `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`;
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwN2JhNzQwN2M1MWQyYmJiNmE4Yjk5NWUzY2Y3YTdiOCIsIm5iZiI6MTcyOTM3MDM2NC4xODAxNDIsInN1YiI6IjY3MTQxODNjOTlmMjJmMzI2YWFkMzE2MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.L5qFOnzckPJmz0RV2yS2VFl8UlEbKDn5qJvwF8Hi1-I'
  }
};

export const fetchTopMovies = async (page: number) => {
  try {
    console.log('Fetching top movies...');
    const response = await fetch(url(page), options);
    const data = await response.json();
    const movies = data.results.map((movie: any) => ({
      image: "https://image.tmdb.org/t/p/w500" + movie.poster_path,
      title: movie.title,
      overview: movie.overview,
      rating: movie.vote_average
    }));
    return movies;
  } catch (error) {
    console.error('Error fetching top movies:', error);
    return [];
  }
};
