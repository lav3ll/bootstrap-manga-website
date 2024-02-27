import { useState } from 'react';
import reactLogo from './assets/react.svg';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './Components/Navigation';
import Home from './Components/Home';
import Login from './Components/Account/Login';
import Register from './Components/Account/Register';
import Bookmarks from './Components/Bookmarks/Bookmarks';

function App() {
  return (
    <>
      <Router>
        <div>
          <Navigation />
          <Routes>
            <Route path='/Home' element={<Home />} />
            <Route path='/Login' element={<Login />} />
            <Route path='/Register' element={<Register />} />
            <Route path='/Bookmarks' element={<Bookmarks />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
