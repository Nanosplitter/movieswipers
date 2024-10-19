import React from 'react';
import CardSwiper from './components/CardSwiper';

function App() {
  return (
    <div className="App">
      <CardSwiper cards={[{image: "https://www.washingtonpost.com/graphics/2019/entertainment/oscar-nominees-movie-poster-design/img/black-panther-web.jpg", title: "Black Panther"}]} />
    </div>
  );
}

export default App;
