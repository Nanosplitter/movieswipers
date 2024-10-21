import React, { useEffect, useState } from 'react';
import CardSwiper from './components/CardSwiper';
import { fetchTopMovies } from './services/imdbApi';
import { db } from './services/firebase';
import { collection, addDoc, getDocs, query, where, onSnapshot, updateDoc, doc } from 'firebase/firestore';

function App() {
  const [cards, setCards] = useState<{ image: string; title: string; overview: string; rating: number; }[]>([]);
  const [page, setPage] = useState(1);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

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

  const createSession = async () => {
    const sessionRef = await addDoc(collection(db, 'sessions'), {
      createdAt: new Date(),
    });
    setSessionId(sessionRef.id);
    const userRef = await addDoc(collection(db, 'sessions', sessionRef.id, 'users'), {});
    setUserId(userRef.id);
  };

  const joinSession = async (sessionId: string) => {
    setSessionId(sessionId);
    const userRef = await addDoc(collection(db, 'sessions', sessionId, 'users'), {});
    setUserId(userRef.id);
  };

  const handleSwipe = async (direction: string, movieTitle: string) => {
    if (!sessionId || !userId) return;

    const userDocRef = doc(db, 'sessions', sessionId, 'users', userId);
    await updateDoc(userDocRef, {
      [movieTitle]: direction,
    });

    const q = query(collection(db, 'sessions', sessionId, 'users'), where(movieTitle, '==', direction));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.size > 1) {
      console.log(`Match found for movie: ${movieTitle}`);
    }
  };

  return (
    <div className="App">
      <button onClick={createSession}>Create Session</button>
      <button onClick={() => joinSession(prompt('Enter session ID:') || '')}>Join Session</button>
      <CardSwiper cards={cards} loadMoreMovies={loadMoreMovies} onSwipe={handleSwipe} />
    </div>
  );
}

export default App;
