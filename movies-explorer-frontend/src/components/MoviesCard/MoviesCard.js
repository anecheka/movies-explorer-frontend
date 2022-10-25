import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './MoviesCard.css';

function MoviesCard({ card, onSaveMovie, onDeleteMovie, isInAllMovies, savedMoviesData, moviesData }) {

  const [isOwn, setIsOwn] = useState(false);
  const currentUser = useContext(CurrentUserContext);
  const history = useHistory();
  const [userMoviesData, setUserMoviesData] = useState([]);

  // const userMovies = (movies) => movies.filter((movie) => movie.owner === currentUser._id)

  // const isSaved = () => {
  //   if (savedMoviesData.includes(card._id)) {
  //   return true }
  //   else {
  //     return false
  //   }
  // }

  // //Функция для создания массива фильмов, сохраненных конкретным пользователем 
  // const getUserSavedMovies = (movies) => {
  //   let userMovies
  //   userMovies = movies.filter((movie) => movie.owner === currentUser._id)
  //   return userMovies
  // }

  // //Создаю массив фильмов, сохраненных конкретным пользователем
  // useEffect (() => {
  //   const userMovies = getUserSavedMovies(savedMoviesData);
  //   setUserMoviesData(userMovies);
  //   console.log(userMoviesData);
  //    // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [savedMoviesData]);


  // const checkMovie = () => {

    // const userMovies = getUserSavedMovies(savedMoviesData);
    // setUserMoviesData(userMovies);
    // console.log(userMoviesData);

  //   const getUserSavedMovies = (movies) => {
  //     let userMovies
  //     userMovies = movies.filter((movie) => movie.owner === currentUser._id)
  //     return userMovies
  //   }

  //   const userMovies = getUserSavedMovies(savedMoviesData);
  //   setUserMoviesData(userMovies);
  //   console.log(userMoviesData);

  //   for (let i = 0; i < userMoviesData.length; i++) {
  //     if (userMoviesData[i].movieId === card.movieId) {
  //     card._id = userMoviesData[i]._id
  //     return true;
  //   }
  // }}

  // useEffect (() => {
  //   if (savedMoviesData) {
  //    checkMovie();
  //   }
  //    // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [card]);

  // useEffect (() => {
  //   localStorage.setItem("saved", JSON.stringify(userMoviesData))
  // }, [savedMoviesData, userMoviesData]);

  // const isSaved = savedMoviesData.includes(card.movieId);
  const isSaved = savedMoviesData.some(i => i.movieId === card.movieId);

  const saveClassName =
  `movies-card__save ${isSaved ? 'movies-card__save_saved' : ''}`;

  const handleClickLike = () => {

    if (currentUser && isSaved === true) {
      onDeleteMovie(savedMoviesData.find(i => i.movieId === card.movieId && i.owner === currentUser._id))
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