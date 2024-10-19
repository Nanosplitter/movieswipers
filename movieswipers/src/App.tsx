import React, { useEffect, useState } from 'react';
import CardSwiper from './components/CardSwiper';
import { fetchTopMovies } from './services/imdbApi';

function App() {
  const [cards, setCards] = useState<{ image: string; title: string; overview: string; rating: number; }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const movies = await fetchTopMovies();
      setCards(movies);
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <CardSwiper cards={cards} />
    </div>
  );
}

export default App;
