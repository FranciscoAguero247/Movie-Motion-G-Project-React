import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Home = ({theater}) => {
    const [userInput, setUserInput] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!userInput) return;
    
    navigate(`/searchedmovie?s=${userInput}`);
  };
    return (
        <section id="landing">
            <header>
                <div className="header__container">
                    <div className="header__description">
                        <h1>Your info booth to the cosmic of cinema</h1>
                        <h2>Find your next movie night with Movie Motion <span className='green'>G</span></h2>
                          <form className="search-form" id="searchForm" onSubmit={handleSearch}>

                          <input type="text" id="myInput" placeholder="Search for movies..." required value={userInput} onChange={(e) => setUserInput(e.target.value)}></input>

                          <button type="submit" className="search-wrapper" id="searchBtn">
                              <FontAwesomeIcon icon={faSearch} />
                          </button>
                        </form>
                    </div>
                    <figure className="header__img--wrapper">
                        <img src={theater} alt='theater-seats'></img>
                    </figure>     
                </div>
            </header>
      </section>
    )
}

export default Home;