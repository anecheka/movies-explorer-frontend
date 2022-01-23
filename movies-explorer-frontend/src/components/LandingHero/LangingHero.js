import React from 'react';
import hero from '../../images/landing-hero.svg';
import './LandingHero.css';

function LandingHero() {
  
  return (
    <section className="landing-hero">
        <h1 className="landing-hero__title">Учебный проект студента факультета Веб-разработки.</h1>
        <img src={hero} alt="Настроенческая картинка лэндинг страницы" className="landing-hero__image" />
    </section>
  );
}

export default LandingHero;
