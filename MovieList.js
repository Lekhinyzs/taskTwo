import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import "./MovieList.css";

function MovieList() {
  const [topMovies, setTopMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch top 10 movies
    axios
      .get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=3346668ecc2e44c6329cd3e798a66216&language=en-US&page=1`
      )
      .then((response) => {
        setTopMovies(response.data.results);
        const top10Movies = response.data.results.slice(0, 10);
        setTopMovies(top10Movies);
      })
      .catch((error) => {
        console.error("Error fetching top movies:", error);
      });
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim() === "") return;

    setLoading(true);

    // Fetch movies by search query
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=3346668ecc2e44c6329cd3e798a66216&language=en-US&query=${searchQuery}&page=1&include_adult=false`
      )
      .then((response) => {
        setSearchResults(response.data.results);
        const top10Movies = response.data.results.slice(0, 10);
        setTopMovies(top10Movies);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching search results:", error);
        setLoading(false);
      });
  };

  return (
    <div className="container">
      <div className="nav">
        <div>
          <div className="nav_box">
            <img src="tv.png" alt="displayTv" className="tvImg" />
            <h2 className="img_title">
              <a href="#"></a>MovieBox
            </h2>
          </div>
        </div>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        <div className="nav_sign">
          <p className="signIn_title">Sign in</p>
          <img src="Menu.png" alt="MenuImg" className="MenuImg" />
        </div>
      </div>
      <div>
        <h1 className="movie_title">
          John wick 3: <br /> Parabellum
        </h1>
        <span className="sub_title">
          John Wick is on the run after killing after killing a member of the
          <br />
          international assasin guard and with a $14 million price tag on his
          <br />
          head, he is the target of men and women anywhere.
        </span>
      </div>

      {loading && <p>Loading...</p>}

      <div className="movie-list">
        {searchResults.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <h1 className="movie_head">Featured Movie</h1>
      <div className="movie-list">
        {topMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default MovieList;
