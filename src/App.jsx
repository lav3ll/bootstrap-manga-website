import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './Components/Navigation';
import Slider from './Components/Sldier/Slider';
import Popular from './Components/Popular/Popular';

function App() {
  return (
    <>
      <Navigation />
      <Slider />
      <Popular />
    </>
  );
}

export default App;
