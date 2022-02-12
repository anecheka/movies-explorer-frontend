import React from 'react';
import {useLocation, Link} from 'react-router-dom';
import logo from '../../images/logo.svg';
import './Header.css';
import Navigation from '../Navigation/Navigation';

function Header({loggedIn}) {

  const location = useLocation();
  const locationCheck = location.pathname === '/';

  return (
    <header className={`header ${locationCheck ? "header__landing" : ""}`}>
        <Link to="/"><img src={logo} alt="Лого проекта Синематeка" className="header__logo" /></Link>
        <Navigation loggedIn={loggedIn}/>
    </header>
  );
}

export default Header;
