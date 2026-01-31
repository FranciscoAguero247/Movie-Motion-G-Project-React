import React from "react";
import {Link, useNavigate} from "react-router-dom";
import MMGLogo from '../images/Movie Motion Logo.png';

const Footer = () =>{
  const navigate = useNavigate();

    function returnHomeBtn(){
        navigate('/');
    }

    function aboutBtn(){
        navigate('/about');
    }

  return (
    <footer>
      <div className="container">
        <div className="row row__column">
          <a>
            <figure className="footer__logo">
              <Link to='/'>
                  <img className="logo" src={MMGLogo} alt="Movie Motion G Logo" />
              </Link>
            </figure>
          </a>
          <div className="footer__list">
            <a onClick={returnHomeBtn} className="footer__link"> Home</a>
            <a onClick={aboutBtn} className="footer__link"> About</a>
          </div>
          <div className="footer__copyright">Copyright &copy; {new Date().getFullYear()} Movie Motion <span className='green'>G</span></div>
        </div>
      </div>
    </footer>
    )
}

export default Footer;