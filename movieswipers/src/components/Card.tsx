import React from 'react';
import './Card.css';

interface CardProps {
  image: string;
  title: string;
}

const Card: React.FC<CardProps> = ({ image, title }) => {
  return (
    <div className="card">
      <img src={image} alt={title} className="card-image" />
      <h2 className="card-title">{title}</h2>
    </div>
  );
};

export default Card;
