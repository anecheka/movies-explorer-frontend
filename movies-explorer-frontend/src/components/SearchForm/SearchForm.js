import React, { useState, useEffect} from 'react';
import './SearchForm.css';
import icon from '../../images/search.svg'

function SearchForm({ setSearchQuery, setSearchSavedQuery, isInAllMovies }) {

  const [searchTyping, setSearchTyping] = useState('');

  useEffect (() => {
    setSearchTyping(savedQuery)
  }, [setSearchQuery]);

  const handleSearchQuery = (e) => {
    setSearchTyping(e.target.value);
  } 

 const savedQuery = localStorage.getItem(isInAllMovies ? "query" : "savedQuery");

  const handleSubmit = (e) => {

    e.preventDefault();

    if (searchTyping === null) {
      setSearchQuery('')
      } else {
        isInAllMovies && setSearchQuery(searchTyping);
        !isInAllMovies && setSearchSavedQuery(searchTyping);
        if (isInAllMovies) {
          localStorage.setItem("query", searchTyping);
        } else {
          localStorage.setItem("savedQuery", searchTyping);
        }
     }
  }
  
  return (
    <form className="search-form" name="search">
        <fieldset className="search-form__container">
            <input className="search-form__input"
              type="text" 
              name="search-query" 
              placeholder='Фильм'
              value={searchTyping || ''}
              onChange={handleSearchQuery}
              required />
            <button className="search-form__button"
              type="submit"
              onClick={handleSubmit}
            >
                <img src={icon} alt="Иконка поиска" className=""/>
            </button>
        </fieldset>
    </form>
  );
}

export default SearchForm;