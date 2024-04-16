import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './Components/Navigation';
import Home from './Components/Home';
import Login from './Components/Account/Login';
import Register from './Components/Account/Register';
import Bookmarks from './Components/Bookmarks/Bookmarks';
import MangaInfo from './Components/MangaInfo/MangaInfo';
import Chapter from './Components/Chapter/Chapter';

function App() {
  return (
    <>
      <Router>
        <div>
          <Navigation />
          <Routes>
            <Route path='/' element={<Outlet />} />
            <Route index element={<Home />} />
            <Route path='Home' element={<Home />} />
            <Route path='/Login' element={<Login />} />
            <Route path='/Register' element={<Register />} />
            <Route path='/Bookmarks' element={<Bookmarks />} />
            <Route path='/manga-info' element={<MangaInfo />} />
            <Route path='/chapter/:id' element={<Chapter />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
