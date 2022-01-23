import React from 'react';
import './MoviesCard.css';

function MoviesCard({card, isLoggedIn}) {

    const [saved, setSaved] = React.useState(false);
  
    const saveClassName = [
        "movies-card__save",
        saved && "movies-card__save_saved",
        isLoggedIn && "movies-card__save-remove",
      ].join(" ");

    function handleClick() {
       saved ? setSaved(false) : setSaved(true);
    }

  return (
    <li className="movies-card">
      <h1 className="movies-card__name">{card.nameRU}</h1>
      <p className="movies-card__duration">{card.duration}</p>
      <button className={saveClassName} onClick={handleClick} />
      <img className="movies-card__thumbnail" src={card.thumbnail} alt={`Превью фильма ${card.nameRU}`}/>
    </li>
  );
}

export default MoviesCard;