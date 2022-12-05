import React from 'react';
import { NavLink } from 'react-router-dom';
import profileIcon from '../../images/profile-icon.svg'
import './Navigation.css';

function Navigation({loggedIn}) {

    const [menuOpened, setMenuOpened] = React.useState(false);

    const menuOpenedWrapperClassName = `${menuOpened ? 'nav__wrapper nav__wrapper_active' : 'nav__wrapper'}`;
    const menuOpenedButtonClassName = `${menuOpened ? 'nav__icon nav__icon_active' : 'nav__icon'}`;
    
    function handleButtonClick() {
        menuOpened ? setMenuOpened(false) : setMenuOpened(true);
    }

    function handleNavLinkClick(e) {
        setMenuOpened(false);
    }

  return (
    loggedIn ?
    (<nav className="nav">
        <button 
        className={menuOpenedButtonClassName}
        type="checkbox" 
        name="nav-icon" 
        id="nav-icon"
        onClick={handleButtonClick}
            >
            <span />
        </button>
        <div className={menuOpenedWrapperClassName}>
            <div className="nav__movies-tabs">
                <NavLink to="/" onClick={handleNavLinkClick} className="nav__main" activeClassName="nav__main_active">Главная</NavLink>
                <NavLink to="/movies" onClick={handleNavLinkClick} className="nav__movies" activeClassName="nav__movies_active">Фильмы</NavLink>
                <NavLink to="/saved-movies" onClick={handleNavLinkClick} className="nav__movies" activeClassName="nav__movies_active">Сохранённые фильмы</NavLink>
            </div>
            <NavLink to="/profile" onClick={handleNavLinkClick} className="nav__profile" activeClassName="nav__profile_active">
                <img src={profileIcon} alt="Иконка аккаунта пользователя" className="nav__profile-icon" />
                <p>Аккаунт</p>
            </NavLink>
        </div>
    </nav>) :
    (<nav className="nav">
        <NavLink to="/signup" className="nav__register">Регистрация</NavLink>
        <NavLink to="/signin" className="nav__login">Войти</NavLink>
    </nav>)
  );
}

export default Navigation;
