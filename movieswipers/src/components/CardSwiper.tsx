import React, { useState, useEffect } from 'react';
import TinderCard from 'react-tinder-card';
import './CardSwiper.css';
import Card from './Card';

interface CardData {
  image: string;
  title: string;
  overview: string;
  rating: number;
}

interface CardSwiperProps {
  cards: CardData[];
  loadMoreMovies: () => void;
}

const onSwipe = (direction: string) => {
}

const CardSwiper: React.FC<CardSwiperProps> = ({ cards, loadMoreMovies }) => {
  const [cardList, setCardList] = useState<CardData[]>([]);

  useEffect(() => {
    setCardList(cards);
  }, [cards]);

  const onCardLeftScreen = (myIdentifier: string) => {
    setCardList(prevCards => {
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
        <TinderCard key={index} onSwipe={onSwipe} onCardLeftScreen={() => onCardLeftScreen(card.title)} preventSwipe={['up', 'down']}>
          <Card image={card.image} title={card.title} overview={card.overview} rating={card.rating} />
        </TinderCard>
      ))}
    </div>
  );
}

export default CardSwiper;
