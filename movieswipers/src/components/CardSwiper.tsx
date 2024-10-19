import React from 'react';
import TinderCard from 'react-tinder-card'
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
  console.log('You swiped: ' + direction)
}

const onCardLeftScreen = (myIdentifier: string, loadMoreMovies: () => void, cardsLength: number) => {
  // console.log(myIdentifier + ' left the screen')
  console.log('cardsLength:', cardsLength, "myIdentifier:", myIdentifier);
  if (cardsLength === 1) {
    loadMoreMovies();
  }
}

const CardSwiper: React.FC<CardSwiperProps> = ({ cards, loadMoreMovies }) => {
  return (
    <div className="card-swiper">
      {cards.map((card, index) => (
        <TinderCard key={index} onSwipe={onSwipe} onCardLeftScreen={() => onCardLeftScreen(card.title, loadMoreMovies, cards.length)} preventSwipe={['up', 'down']}>
          <Card image={card.image} title={card.title} overview={card.overview} rating={card.rating} />
        </TinderCard>
      ))}
    </div>
  );
};

export default CardSwiper;
