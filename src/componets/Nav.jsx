import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MMGLogo from '../images/Movie Motion Logo.png';

const Nav = () => {
    const navigate = useNavigate();
    const [isSearchExpanded, setIsSearchExpanded] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleSearch = (e) => {
        if (e.key === "Enter" && searchValue) {
            navigate(`/searchedmovie?s=${searchValue}`);
            setIsSearchExpanded(false);
        }
    }

    return (
        <nav className="nav">
            <div className="nav__container">
               
                <div className={`nav__branding ${isSearchExpanded ? "hide-mobile" : ""}`}>
                    <Link to='/' className="logo__link">
                        <img className="logo" src={MMGLogo} alt="Movie Motion G Logo" />
                        <h1 className="movie__title--header">
                            Movie Motion <span className='green'>G</span>
                        </h1>
                    </Link>
                </div>

              
                <div className={`nav__search--dynamic ${isSearchExpanded ? "expanded" : ""}`}>
                    <button 
                        className="search__icon--btn" 
                        onClick={() => setIsSearchExpanded(!isSearchExpanded)}
                    >
                        <FontAwesomeIcon icon="search" />
                    </button>
                    <input 
                        type="text" 
                        placeholder="Quick search..." 
                        className="search__input--dynamic"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        onKeyPress={handleSearch}
                        onBlur={() => setTimeout(() => setIsSearchExpanded(false), 200)}
                    />
                </div>

                
                <ul className={`nav__links ${isSearchExpanded ? "hide-mobile" : ""}`}>
                    <li><Link to="/" className="nav__link">Home</Link></li>
                    <li><Link to="/about" className="nav__link">About</Link></li>
                </ul>

               
                {!isSearchExpanded && (
                    <button className="btn__menu" onClick={() => setIsMenuOpen(true)}>
                        <FontAwesomeIcon icon="bars" />
                    </button>
                )}

              
                <div className={`menu__backdrop ${isMenuOpen ? "menu--open" : ""}`}>
                    <button className="btn__menu btn__menu--close" onClick={() => setIsMenuOpen(false)}>
                        <FontAwesomeIcon icon="times" />
                    </button>
                    <ul className="menu__links">
                        <li className="menu__list"><Link to="/" className="menu__link" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
                        <li className="menu__list"><Link to="/searchedmovie" className="menu__link" onClick={() => setIsMenuOpen(false)}>Movies!</Link></li>
                        <li className="menu__list"><Link to="/about" className="menu__link" onClick={() => setIsMenuOpen(false)}>About</Link></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Nav;