import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

const SearchedMovie = ({notFoundImg}) => {
    const API_KEY = 'e02d91c8';
    const [movie, setMovie] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const movieQuery = searchParams.get("s");

    function restSearch(){
        localStorage.removeItem("lastSearch");
        navigate("/searchedmovie");
    }

    function filterMovies(filter) {
        let sortedMovies = [...movie];

        if (filter === 'TITLE_ASC') {
            sortedMovies.sort((a, b) => a.Title.localeCompare(b.Title));
        } 
        else if (filter === 'TITLE_DESC') {
            sortedMovies.sort((a, b) => b.Title.localeCompare(a.Title));
        } 
        else if (filter === 'YEAR_NEWEST') {
            sortedMovies.sort((a, b) => {
                return parseInt(b.Year.split('–')[0]) - parseInt(a.Year.split('–')[0]);
            });
        } 
        else if (filter === 'YEAR_OLDEST') {
            sortedMovies.sort((a, b) => {
                return parseInt(a.Year.split('–')[0]) - parseInt(b.Year.split('–')[0]);
            });
        }

        setMovie(sortedMovies);
    }

    async function searchMovie(title) {
        setLoading(true);
        setErrorMessage("");
        try{
            const { data } = await axios.get(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${title || "trending"}`);

            if (data.Response === "True"){
                setMovie(data.Search);
            }else{
                setMovie([]);
                setErrorMessage(data.Error);
            }
        }catch(error){
            setErrorMessage("Something went wrong. Please try again later.");
        }
        setLoading(false);
    }

    useEffect(() => {
        searchMovie(movieQuery);
        if(movieQuery){
            localStorage.setItem("lastSearch", movieQuery);
        }
    }, [movieQuery]);

    return (
        <main id="movies__main">
            <section>   
                <div className="container">
                    <div className="row row__column">
                        <h2 className="movies__header--title">
                            Search results for: <span id="search-term" className="color__green">"{movieQuery || "Trending"}"</span>
                        </h2>
                        <div className="filter__container"> 
                            <select id="filter" defaultValue="DEFAULT" onChange={(event) => filterMovies(event.target.value)}>
                                <option value="DEFAULT" disabled>Sort</option>
                                <option value="TITLE_ASC">Name, A-Z</option>
                                <option value="TITLE_DESC">Name, Z-A</option>
                                <option value="YEAR_NEWEST">Year, Newest</option>
                                <option value="YEAR_OLDEST">Year, Oldest</option>
                            </select>
                            {movieQuery && (
                                <button className="btn btn__clear" onClick={restSearch}>
                                    Clear Search
                                </button>
                            )}
                        </div>
                        <div className="movie__container" id="movieList">
                            {loading ? (
                                new Array(8).fill(0).map((_, index) => (
                                    <div className="skeleton-card" key={index}></div>
                                ))
                            ) : errorMessage ?(
                                <div className="movies__no-results">
                                    <img src={notFoundImg} alt='No result'></img>
                                    <h2>Oops! {errorMessage}</h2>
                                    <p>We couldn't find any movies matching <span className="green">"{movieQuery}"</span>.</p>
                                    <p>Try checking your spelling or searching for a different title.</p>
                                </div>
                            ): (
                                movie.map((m) => (                                    
                                    <div className="movie-card" key={m.imdbID}>
                                        <Link to={`/movie/${m.imdbID}`}>
                                            <div className="movie-card__img--wrapper">
                                                <img 
                                                    src={m.Poster !== "N/A" ? m.Poster : "https://via.placeholder.com/300x450?text=No+Poster"} 
                                                    alt={m.Title} 
                                                    loading="lazy" 
                                                />
                                            </div>
                                            <div className="movie-card__info">
                                                <h3>{m.Title}</h3>
                                                <p className="color__green">{m.Year}</p>
                                            </div>
                                        </Link>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div> 
            </section>
        </main>
    );
};

export default SearchedMovie;