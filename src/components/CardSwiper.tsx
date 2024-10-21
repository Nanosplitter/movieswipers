import React, { useState, useEffect } from 'react';
import TinderCard from 'react-tinder-card';
import './CardSwiper.css';
import Card from './Card';
// import { db } from '../services/firebase';
// import { collection, addDoc, getDocs, query, where, onSnapshot, updateDoc, doc } from 'firebase/firestore';

interface CardData {
  image: string;
  title: string;
  overview: string;
  rating: number;
  genres: string[];
}

interface CardSwiperProps {
  cards: CardData[];
  loadMoreMovies: () => void;
  onSwipe: (direction: string, movieTitle: string, movieImage: string) => void;
}

const CardSwiper: React.FC<CardSwiperProps> = ({ cards, loadMoreMovies, onSwipe }) => {
  const [cardList, setCardList] = useState<CardData[]>([]);

  useEffect(() => {
    setCardList(cards);
  }, [cards]);

  const onCardLeftScreen = (myIdentifier: string) => {
    setCardList((prevCards: CardData[]) => {
      const updatedCards = prevCards.filter(card => card.title !== myIdentifier);
      if (updatedCards.length === 0) {
        loadMoreMovies();
      }
      return updatedCards;
    });
  }

  return (
    <div className="card-swiper">
      {cardList.map((card, index) => (
        <TinderCard
          key={index}
          onSwipe={(dir) => onSwipe(dir, card.title, card.image)}
          onCardLeftScreen={() => onCardLeftScreen(card.title)}
          preventSwipe={['up', 'down']}
          swipeRequirementType='position'
        >
          <Card image={card.image} title={card.title} overview={card.overview} rating={card.rating} genres={card.genres} />
        </TinderCard>
      ))}
    </div>
  );
}

export default CardSwiper;
