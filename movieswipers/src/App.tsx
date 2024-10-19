import React, { useEffect, useState } from 'react';
import CardSwiper from './components/CardSwiper';
import { fetchTopMovies } from './services/imdbApi';

function App() {
  const [cards, setCards] = useState<{ image: string; title: string; overview: string; rating: number; }[]>([]);
  const [page, setPage] = useState(1);

  const fetchData = async (page: number) => {
    const movies = await fetchTopMovies(page);
    setCards(movies);
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  const loadMoreMovies = () => {
    setPage(page + 1);
  };

  return (
    <div className="App">
      <CardSwiper cards={cards} loadMoreMovies={loadMoreMovies} />
    </div>
  );
}

export default App;
