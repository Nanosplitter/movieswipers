import React from 'react';
import CardSwiper from './components/CardSwiper';

function App() {
  return (
    <div className="App">
      <CardSwiper cards={[{image: "https://www.amazon.com/Harry-Potter-Sorcerers-Stone-Regular/dp/B0016D6UH2", title: "title"}]} />
    </div>
  );
}

export default App;
