import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {

    return (
      <section className="landing-page">
				<header>
					<h1 className="landing-page__heading">welcome to wine-y</h1>
					<h2 className="landing-page__tagline">beverages for your emotional needs</h2>
					<button type="button" className="landing-page__button"><Link to="/products">Shop wines</Link></button>
				</header>
      </section>
    );
}

export default HomePage;
