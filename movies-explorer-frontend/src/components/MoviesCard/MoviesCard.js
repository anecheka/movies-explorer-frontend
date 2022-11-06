import React, { useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './MoviesCard.css';

function MoviesCard({ card, onSaveMovie, onDeleteMovie, isInAllMovies, savedMoviesData }) {

  const currentUser = useContext(CurrentUserContext);
  const isSaved = savedMoviesData.some(i => i.movieId === card.movieId);

  const saveClassName =
  `movies-card__save ${isSaved ? 'movies-card__save_saved' : ''}`;

  const handleClickLike = () => {

    if (currentUser && isSaved === true) {
      onDeleteMovie(savedMoviesData.find(i => i.movieId === card.movieId && i.owner === currentUser._id))
      } else {
      onSaveMovie(card)
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