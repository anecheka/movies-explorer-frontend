import React from 'react';
import './Main.css';
import LandingHero from '../LandingHero/LangingHero';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';

function Main() {
  
  return (
    <main>
        <LandingHero />
        <AboutProject />
        <Techs />
        <AboutMe />
    </main>
  );
}

export default Main;
