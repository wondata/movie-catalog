import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import axios from "axios";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      const baseUrl = `http://www.omdbapi.com/?i=tt3896198&apikey=34abaae6`;

      axios
        .get(`${baseUrl}&s=${searchTerm}`)
        .then((response) => {
          const topThreeMovies = response.data?.Search?.slice(0, 3);

          setMovies(topThreeMovies || []);
        })
        .catch((error) => {
          setMovies([]);
          console.error("Error fetching data:", error);
        });
    };

    fetchMovies();
  }, [searchTerm]);

  return (
    <div>
      <AppHeader
        heading="Movies Catalog"
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <MovieList movies={movies} />
    </div>
  );
}

const AppHeader = (props) => {
  return (
    <div className="header-container pt-3 pb-3 mb-4">
      <div className="container d-flex align-items-center">
        <div className="col">
          <h1>{props.heading}</h1>
        </div>

        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="Start typing to search..."
            value={props.searchTerm}
            onChange={(e) => props.setSearchTerm(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

const MovieCard = (props) => {
  return (
    <div className="col-md-4 mb-3">
      <div className="card movie-thumbnail">
        <a
          href={props.movie.Poster}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: "block", width: "100%", height: "100%" }}
        >
          <img
            src={props.movie.Poster}
            alt={props.movie.Title}
            width="300px"
            height="450px"
            className="card-img-top"
          />
        </a>
        <div className="card-body">
          <h6 className="card-title">{props.movie.Title}</h6>
          <p className="card-text">{props.movie.Year}</p>
        </div>
      </div>
    </div>
  );
};

const MovieList = (props) => {
  return (
    <div className="container">
      <div className="row">
        {props.movies.length === 0 ? (
          <p className="text-center">
            Enter keywords in the search bar and hit the 'Enter' button to find
            relevant movies.
          </p>
        ) : (
          props.movies.map((movie, i) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))
        )}
      </div>
    </div>
  );
};

export default App;
