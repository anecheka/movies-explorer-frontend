import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';

function MoviesCardList({ 
  searchQuery, 
  moviesData, 
  handleShowMoreMovies, 
  moreButtonHidden, 
  searchResultsShown, 
  loading, 
  onSaveMovie, 
  isInAllMovies, 
  savedMoviesData, 
  onDeleteMovie 
  }) {

  const hideShowMoreButtonClassName = `movies-card-list__more-button ${searchQuery === '' || moreButtonHidden ? 'movies-card-list__more-button_hidden' : ''}`;
  const hideNoSearchQueryTitle = `movies-card-list__callout ${(searchQuery === '' && isInAllMovies) || savedMoviesData.length === 0 ? '' : 'movies-card-list__callout_hidden' }`;
  const hideSearchList = `movies-card-list__movies ${(searchQuery === '' && isInAllMovies) || searchResultsShown === false ? 'movies-card-list__movies_hidden' : ''}`

  let mainTitle 

  if (isInAllMovies && searchQuery === '') {
      mainTitle = `Нужно ввести ключевое слово`
  } else if (!isInAllMovies && savedMoviesData.length === 0) {
    mainTitle = `У вас нет сохраненных фильмов`
  } else if (isInAllMovies && searchQuery !== '' && moviesData.length === 0) {
    mainTitle = `Ничего не найдено`
  }

  return (
    <section className="movies-card-list">
      <h2 className={hideNoSearchQueryTitle}>{mainTitle}</h2>
       { searchResultsShown && 
        <ul className={hideSearchList}>
            { loading && <Preloader />}
            { !loading && 
              moviesData.map((card) => 
                    <MoviesCard
                        key={card.movieId} 
                        card={card}
                        onSaveMovie={onSaveMovie}
                        onDeleteMovie={onDeleteMovie}
                        isInAllMovies={isInAllMovies}
                        savedMoviesData={savedMoviesData}
                    />
                )
            }
        </ul>}
      <button onClick={handleShowMoreMovies} className={hideShowMoreButtonClassName}>Ещё</button>
    </section>
  );
}

export default MoviesCardList;