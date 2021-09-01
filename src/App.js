import React, { useState } from 'react';


import MoviesList from './components/MoviesList';
import './App.css';

function App() {

  const [moviesItems,setMoviesItems] =useState([
    {
      id: 1,
      title: 'Some Dummy Movie',
      opening_crawl: 'This is the opening text of the movie',
      release_date: '2021-05-18',
    },
    {
      id: 2,
      title: 'Some Dummy Movie 2',
      opening_crawl: 'This is the second opening text of the movie',
      release_date: '2021-05-19',
    },
  ])



          // useEffect(() => {
          //   fetchData();
          //   }, []);
  const fetchMovieHandler = () =>{
    fetch("https://swapi.py4e.com/api/films")
          .then((response) => response.json())
          .then((data) => setMoviesItems(data.results));   
          
  }
  console.log(moviesItems) 


  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler} >Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={moviesItems} />
      </section>
    </React.Fragment>
  );
}

export default App;
