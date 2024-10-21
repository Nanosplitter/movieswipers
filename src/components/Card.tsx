import React from 'react';
import { Card as MuiCard, CardContent, CardMedia, Typography, Box } from '@mui/material';

interface CardProps {
  image: string;
  title: string;
  overview: string;
  rating: number;
  genres: string[];
}

const Card: React.FC<CardProps> = ({ image, title, overview, rating, genres }) => {
  return (
    <MuiCard sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <CardMedia
        component="img"
        image={image}
        alt={title}
        sx={{ maxHeight: '50%', objectFit: 'contain' }}
      />
      <CardContent sx={{ flexGrow: 1, overflow: 'auto' }}>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
          {genres.map((genre, index) => (
            <Typography key={index} variant="body2" color="text.secondary">
              {genre} |
            </Typography>
          ))}
        </Box>
        <Typography variant="body2" color="text.secondary">
          {overview}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Rating: {rating} / 10
        </Typography>
      </CardContent>
    </MuiCard>
  );
};

export default Card;
