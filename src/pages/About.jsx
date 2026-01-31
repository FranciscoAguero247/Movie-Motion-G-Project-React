import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div id="about__main">
      <section className="container">
        <div className="row">
          <div className="about__content">
            <div className="about__header">
              <h1 className="about__title">About <span className="green">Movie Motion G</span></h1>
              <p className="about__subtitle">Your ultimate gateway to the world of cinema.</p>
            </div>

            <div className="about__grid">
              <div className="about__card">
                <FontAwesomeIcon icon="search" className="about__card--icon" />
                <h3>Advanced Discovery</h3>
                <p>Powered by the OMDb API to bring you real-time data on over 300,000 titles.</p>
              </div>

              <div className="about__card">
                <FontAwesomeIcon icon="filter" className="about__card--icon" />
                <h3>Smart Filtering</h3>
                <p>Sort by release year or title to find exactly what you're looking for in seconds.</p>
              </div>

              <div className="about__card">
                <FontAwesomeIcon icon="mobile-alt" className="about__card--icon" />
                <h3>Responsive Design</h3>
                <p>A seamless "Search-Priority" experience optimized for every device screen.</p>
              </div>
            </div>

            <div className="about__footer">
              <h2>The Tech Stack</h2>
              <div className="tech__stack">
                <span className="tech__tag">React 18</span>
                <span className="tech__tag">React Router 6</span>
                <span className="tech__tag">FontAwesome</span>
                <span className="tech__tag">CSS3</span>
              </div>
              <Link to="/searchedmovie">
                <button className="btn about__btn">Start Exploring</button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;