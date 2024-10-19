import React from 'react';

interface CardProps {
  image: string;
  title: string;
  overview: string;
  rating: number;
}

const Card: React.FC<CardProps> = ({ image, title, overview, rating }) => {
  return (
    <div className="card">
      <img src={image} alt={title} className="card-image" />
      <h2 className="card-title">{title}</h2>
      <p className="card-overview">{overview}</p>
      <p className="card-rating">Rating: {rating} / 10</p>
    </div>
  );
};

export default Card;
