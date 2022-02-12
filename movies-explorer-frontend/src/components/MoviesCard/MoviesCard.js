import React, { useState, useEffect } from 'react';
import './MoviesCard.css';

function MoviesCard({ card, onSaveMovie, onDeleteMovie, isInAllMovies, savedMoviesData }) {

  const [isOwn, setIsOwn] = useState(false);

  const checkMovie = () => {

    for (let i = 0; i < savedMoviesData.length; i++) {
      if (savedMoviesData[i].movieId === card.movieId) {
      card._id = savedMoviesData[i]._id
      setIsOwn(true)
    }}
  }
  
  useEffect (() => {

    checkMovie();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOwn]);

  const saveClassName =
  `movies-card__save ${isOwn ? 'movies-card__save_saved' : ''}`;

  const handleClickLike = () => {

    if (isOwn) {
      onDeleteMovie(card)
      setIsOwn(false)

    } else {
    onSaveMovie(card)
    setIsOwn(true)
    }
  }  

  const handleClickDelete = () => {
    onDeleteMovie(card)
  }

  const getDurationFromMins = (mins) => {
      let hours = Math.trunc(mins/60);
      let minutes = mins % 60;
    return hours + 'ч ' + minutes + 'м';
  };


  return (
      <li className="movies-card">
        <div>
          <h1 className="movies-card__name">{card.nameRU}</h1>
          <p className="movies-card__duration">{getDurationFromMins(card.duration)}</p>
        </div>
        {isInAllMovies && <button className={saveClassName} onClick={handleClickLike} />}
        {!isInAllMovies && <button className="movies-card__save movies-card__save-remove" onClick={handleClickDelete} />}
        <a className="movies-card__trailer" href={card.trailer} target="_blank" rel="noreferrer">
          <img className="movies-card__thumbnail" src={card.thumbnail} alt={`Превью фильма ${card.nameRU}`}/>
        </a>
      </li>
  );
}

export default MoviesCard;