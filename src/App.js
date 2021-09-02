import React, { useEffect, useState } from "react";
import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [moviesItems, setMoviesItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error,setError]= useState(null);  

  useEffect(() =>{
    fetchMovieHandler();
  },[])

  async function fetchMovieHandler() {
    setError(null)
    setIsLoading(true)  
    try{
      const response= await fetch("https://swapi.py4e.com/api/films");
      if (!response.ok){
        throw new Error('Something went wrong here')
      }
      const data= await response.json();

    const transformedMovies = data.results.map((movieData) =>{
          return{
            id:movieData.episode_id,
            title:movieData.title,
            opening_text:movieData.opening_crawl,
            date:movieData.release_date
          }
        })
        setMoviesItems(transformedMovies);
        setIsLoading(false)  
    } catch (error){
      setError(error.message);
      setIsLoading(false)
    }
  };

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
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {content}
      </section>
    </React.Fragment>
  );
}
export default App;
