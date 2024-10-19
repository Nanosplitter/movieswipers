import axios from 'axios';

const API_KEY = 'your_imdb_api_key';
const BASE_URL = 'https://imdb-api.com/en/API/Top250Movies/';

export const fetchTopMovies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}${API_KEY}`);
    const movies = response.data.items.map((movie: any) => ({
      image: movie.image,
      title: movie.title,
    }));
    return movies;
  } catch (error) {
    console.error('Error fetching top movies:', error);
    return [];
  }
};
