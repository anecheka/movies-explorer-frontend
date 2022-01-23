import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({moviesData, isLoggedIn}) {

  return (
    <section className="movies-card-list">
        <ul className="movies-card-list__movies">
            {
            moviesData.map((card) => 
                    <MoviesCard
                        key={card.id} 
                        card={card}
                        isLoggedIn={isLoggedIn}
                    />
                )
            }
        </ul>
        <button className="movies-card-list__more-button">Ещё</button>
    </section>
  );
}

export default MoviesCardList;