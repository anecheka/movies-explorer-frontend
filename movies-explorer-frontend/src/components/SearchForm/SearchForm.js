import React from 'react';
// import {Route, Switch, Link } from 'react-router-dom';
import './SearchForm.css';
import icon from '../../images/search.svg'

function SearchForm() {
  
  return (
    <form className="search-form" name="search">
        <fieldset className="search-form__container">
            <input className="search-form__input"
                type="text" 
                name="search-query" 
                placeholder="Фильм"
                // value={data.password}
                // onChange={handleChange}
                required />
            <button type="submit" className="search-form__button">
                <img src={icon} alt="Иконка поиска" className=""/>
            </button>
        </fieldset>
    </form>
  );
}

export default SearchForm;