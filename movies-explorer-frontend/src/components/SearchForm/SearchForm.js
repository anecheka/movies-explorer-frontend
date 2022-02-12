import React from 'react';
import './SearchForm.css';
import icon from '../../images/search.svg'

function SearchForm({ setSearchQuery }) {

  const [searchTyping, setSearchTyping] = React.useState('');

  const handleSearchQuery = (e) => {
    setSearchTyping(e.target.value);
  } 

  const submittedSearchQuery = () => {
    setSearchTyping(searchTyping);
  }

  const handleSubmit = (e) => {

    e.preventDefault();

    if (searchTyping === null) {
      setSearchQuery('')
      } else {
        submittedSearchQuery();
        setSearchQuery(searchTyping);
     }
  }
  
  return (
    <form className="search-form" name="search">
        <fieldset className="search-form__container">
            <input className="search-form__input"
              type="text" 
              name="search-query" 
              placeholder='Фильм'
              value={searchTyping}
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