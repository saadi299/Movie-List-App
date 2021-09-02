import React, { useState, useEffect, useCallback } from 'react';
import MoviesList from "./components/MoviesList";
import AddMovie from './components/AddMovie';
import "./App.css";

function App() {
  const [moviesItems, setMoviesItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error,setError]= useState(null);  

  const fetchMovieHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('https://react-http-a4f0f-default-rtdb.firebaseio.com/movies.json');
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();
      console.log(data)
      
      const loadedMovies =[]; // fetchData from Firebase -1
      for(const key in data){ // fetchData from Firebase -2
        loadedMovies.push({
          id:key,
          title:data[key].title,
          opening_text:data[key].openingText,
          date:data[key].releaseDate
        })
      }
      setMoviesItems(loadedMovies); // fetchData from Firebase -3
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMovieHandler();
  }, [fetchMovieHandler]);

  async function addMovieHandler (movie) { //POST request on FireBase -1
    const response =await fetch('https://react-http-a4f0f-default-rtdb.firebaseio.com/movies.json',{
      method:'POST',
      body:JSON.stringify(movie),
      headers:{
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    console.log(data)
  }


  let content = <p>Found No Movies</p>  
  if(moviesItems.length>0){
    content = <MoviesList movies={moviesItems} />
  }
  if(error){
    content = <p>{error}</p>
  }
  if(isLoading){
    content =<p>Loading.....</p>
  }
  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {content}
      </section>
    </React.Fragment>
  );
}
export default App;
