import React, { useEffect, useState } from 'react';
import CardSwiper from './components/CardSwiper';
import { fetchTopMovies } from './services/imdbApi';
import { db } from './services/firebase';
import { collection, addDoc, getDocs, query, where, updateDoc, doc, onSnapshot } from 'firebase/firestore';
import Modal from './components/Modal'; // Import the modal component
import { Button, Grid, Box, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material'; // Import Material UI components
import MatchDialog from './components/MatchDialog'; // Import the MatchDialog component

function App() {
  const [cards, setCards] = useState<{ image: string; title: string; overview: string; rating: number; }[]>([]);
  const [page, setPage] = useState(1);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [isJoinDialogOpen, setIsJoinDialogOpen] = useState(false); // State to control join dialog visibility
  const [joinSessionId, setJoinSessionId] = useState(''); // State to store the session ID entered by the user
  const [isMatchDialogOpen, setIsMatchDialogOpen] = useState<{ open: boolean; movieTitle?: string; movieImage?: string }>({ open: false });

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

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Session ID copied to clipboard');
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };

  const createSession = async () => {
    const sessionRef = await addDoc(collection(db, 'sessions'), {
      createdAt: new Date(),
    });
    setSessionId(sessionRef.id);
    const userRef = await addDoc(collection(db, 'sessions', sessionRef.id, 'users'), {});
    setUserId(userRef.id);

    // Open modal with session ID
    setIsModalOpen(true);

    // Add listener to detect when a match is found
    onSnapshot(collection(db, 'sessions', sessionRef.id, 'matches'), (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          const matchData = change.doc.data();
          setIsMatchDialogOpen({ open: true, movieTitle: matchData.movieTitle, movieImage: matchData.movieImage });
        }
      });
    });
  };

  const joinSession = async (sessionId: string) => {
    setSessionId(sessionId);
    const userRef = await addDoc(collection(db, 'sessions', sessionId, 'users'), {});
    setUserId(userRef.id);

    // Add listener to detect when a match is found
    onSnapshot(collection(db, 'sessions', sessionId, 'matches'), (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          const matchData = change.doc.data();
          setIsMatchDialogOpen({ open: true, movieTitle: matchData.movieTitle, movieImage: matchData.movieImage });
        }
      });
    });
  };

  const handleSwipe = async (direction: string, movieTitle: string, movieImage: string) => {
    if (!sessionId || !userId) return;

    const userDocRef = doc(db, 'sessions', sessionId, 'users', userId);
    await updateDoc(userDocRef, {
      [movieTitle]: direction,
    });

    // Query to check if all users have swiped right for the given movie title
    const q = query(collection(db, 'sessions', sessionId, 'users'), where(movieTitle, '==', 'right'));
    const querySnapshot = await getDocs(q);

    // Check if the number of users who swiped right matches the total number of users
    const totalUsersRef = collection(db, 'sessions', sessionId, 'users');
    const totalUsersSnapshot = await getDocs(totalUsersRef);

    // Ensure a match is found only if all users have swiped right
    if (querySnapshot.size === totalUsersSnapshot.size && querySnapshot.size > 0) {
      console.log(`Match found for movie: ${movieTitle}`);
      setIsMatchDialogOpen({ open: true, movieTitle, movieImage });

      // Add match to the matches collection
      await addDoc(collection(db, 'sessions', sessionId, 'matches'), {
        movieTitle,
        movieImage,
        createdAt: new Date(),
      });
    }
  };

  const handleMatchDialogClose = () => {
    setIsMatchDialogOpen({ open: false });
  };

  return (
    <div className="App">
      <Box sx={{ p: 2 }}>
        <Grid container spacing={2}>
          <Grid item>
            <Button variant="contained" color="primary" onClick={createSession}>
              Create Session
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="secondary" onClick={() => setIsJoinDialogOpen(true)}>
              Join Session
            </Button>
          </Grid>
        </Grid>
      </Box>
      <CardSwiper cards={cards} loadMoreMovies={loadMoreMovies} onSwipe={handleSwipe} />
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        sessionId={sessionId || ''}
        copyToClipboard={copyToClipboard}
      />
      <Dialog open={isJoinDialogOpen} onClose={() => setIsJoinDialogOpen(false)}>
        <DialogTitle>Join Session</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Session ID"
            type="text"
            fullWidth
            variant="standard"
            value={joinSessionId}
            onChange={(e) => setJoinSessionId(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsJoinDialogOpen(false)}>Cancel</Button>
          <Button onClick={() => { joinSession(joinSessionId); setIsJoinDialogOpen(false); }}>Join</Button>
        </DialogActions>
      </Dialog>
      <MatchDialog
        isOpen={isMatchDialogOpen.open}
        onClose={handleMatchDialogClose}
        movieTitle={isMatchDialogOpen.movieTitle}
        movieImage={isMatchDialogOpen.movieImage}
      />
    </div>
  );
}

export default App;
