import React, { useState, useEffect} from 'react';
// import { useHistory } from 'react-router-dom';
import './SearchForm.css';
import icon from '../../images/search.svg'

function SearchForm({ searchQuery, searchSavedQuery, setSearchQuery, setSearchSavedQuery, isInAllMovies }) {

  // const history = useHistory();

  const [searchTyping, setSearchTyping] = useState('');

  useEffect (() => {
    isInAllMovies && setSearchTyping(savedQuery);
    // !isInAllMovies && setSearchSavedQuery('');
  }, []);

  // useEffect (() => {
  //   setSearchTyping(savedQuery);
  // }, [setSearchQuery]);
  // let placeholder 

  // if (searchQuery === '' || searchSavedQuery === '') {
  //   placeholder = `Нужно ввести ключевое слово`
  //     } else {
  //       placeholder = `Фильм`
  //     }

  const handleSearchQuery = (e) => {
    setSearchTyping(e.target.value);
  } 

 const savedQuery = localStorage.getItem("query");

  const handleSubmit = (e) => {

    e.preventDefault();

    if (searchTyping === null) {
      setSearchQuery('')
      } else {
        isInAllMovies && setSearchQuery(searchTyping);
        !isInAllMovies && setSearchSavedQuery(searchTyping);
        if (isInAllMovies) {
          localStorage.setItem("query", searchTyping);
        // } else {
        //   localStorage.setItem("savedQuery", searchTyping);
        // }
     }}
  }
  
  return (
    <form className="search-form" name="search">
        <fieldset className="search-form__container">
            <input className="search-form__input"
              type="text" 
              name="search-query" 
              placeholder="Фильм"
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