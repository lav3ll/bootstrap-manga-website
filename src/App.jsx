import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './Components/Navigation';
import Slider from './Components/Sldier/Slider';
import PopularContainer from './Components/Popular/PopularContainer';

function App() {
  return (
    <>
      <Navigation />
      <Slider />
      <PopularContainer />
    </>
  );
}

export default App;
