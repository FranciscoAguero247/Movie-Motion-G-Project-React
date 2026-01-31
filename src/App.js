import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MMGLogo from './images/Movie Motion Logo.png';
import Footer from './componets/Footer';
import Home from './componets/Home';
import Nav from './componets/Nav';
import SearchedMovie from './pages/SearchedMovie';
import theater from './images/pexels-tima-miroshnichenko-7991404.jpg'
import notFoundImg from './images/Movie Not Found.png';
import MovieInfo from './pages/MovieInfo';
import About from './pages/About';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    const favicon = document.getElementById('favicon');
    if (favicon){
      favicon.href = MMGLogo;
    }
  })


  return (
    <div className="App">
      <Nav/>
          
      <Routes>
        <Route path='/' element={<Home theater={theater}/>}/>
        <Route path='/about' element={<About />}/>
        <Route path='/searchedmovie' element={<SearchedMovie notFoundImg={notFoundImg} />}/>
        <Route path='/movie/:id' element={<MovieInfo/>}/>
      </Routes>
      <Footer/>

    </div>
  );
}

export default App;