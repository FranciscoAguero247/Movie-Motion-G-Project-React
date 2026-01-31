import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

const MovieInfo =() => {
    const navigate = useNavigate();
    const API_KEY = process.env.REACT_APP_OMDB_API_KEY;
    const {id} = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] =  useState(false);
    const [recommendedMovies, setRecommendedMovies] = useState([]);
    const lastSearch = localStorage.getItem("lastSearch") || "Trending";

    const watchTrailer = () => {
        const query = encodeURIComponent(`${movie.Title} ${movie.Year} official trailer`);
        window.open(`https://www.youtube.com/results?search_query=${query}`, "_blank");
    };

    useEffect(() => {
        async function getMovieDetails() {
            setLoading(true);
            const { data } = await axios.get(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`);
            setMovie(data);
            
            const primaryGenre = data.Genre.split(',')[0];
            
            const recommendationRes = await axios.get(
                `https://www.omdbapi.com/?apikey=${API_KEY}&s=${primaryGenre}`
            );
            
            const filtered = (recommendationRes.data.Search || [])
                .filter(m => m.imdbID !== id)
                .slice(0, 4); // Only show the top 4
                
            setRecommendedMovies(filtered);
            setLoading(false);
        }
        getMovieDetails();
    }, [id]);

    if (loading || !movie) return <div className="container">Loading Movie Details...</div>;

    return (
    <div id="movie__body">
      <main id="movie__main">
        <div>
          <div className="row">
            <div className="movie__selected--top">

             <Link to={`/searchedmovie?s=${lastSearch}`} className="movie__link">
                <FontAwesomeIcon icon="arrow-left" />
                <span className="movie__link--text">Back to Results</span>
             </Link>


            </div>

            <div className="movie__selected">
                <div className="movie__selected--inner">
                    <figure className="movie__selected--figure">
                        <img className="movie__selected--img" src={movie.Poster} alt="" />
                    </figure>
                    <div className="movie__selected--description">
                        <h2 className="movie__selected--title">{movie.Title}</h2>
                        <div className="movie__selected--subtitle">
                            {movie.Year} • {movie.Genre} • {movie.Runtime}
                        </div>
                        <div className="movie__summary">
                        <h3 className="movie__summary--title">Summary</h3>
                        <p className="movie__summary--para">
                            {movie.Plot}
                        </p>
                        <button className="btn" onClick={watchTrailer}>
                            Watch Trailer
                        </button>
                        </div>
                    </div>
                </div>
            </div>


          </div>
        </div>
        <div className="recommends__section">
        <div className="row">
            <h2 className="movie__selected--title--top">Recommended Movies</h2>
            <div className="movie__list">
            {recommendedMovies.map((m) => (
                <div className="movie-card" key={m.imdbID}>
                <Link to={`/movie/${m.imdbID}`}>
                    <img src={m.Poster} alt={m.Title} />
                    <div className="movie-card__info">
                    <h3>{m.Title}</h3>
                    <p>{m.Year}</p>
                    </div>
                </Link>
                </div>
            ))}
            </div>
        </div>
        </div>
      </main>
    </div>
    );
}

export default MovieInfo;