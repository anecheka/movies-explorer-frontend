import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import TumblerMovies from '../TumblerMovies/TumblerMovies';
import Preloader from '../Preloader/Preloader';
import mockData from '../../utils/mock-data.json';

function Movies() {

  const [loading, setLoading] = React.useState(false);

  //написать функцию useEffect для прелоудера 

  return (
    <main className="movies">
        <SearchForm />
        <TumblerMovies />
        { 
        loading && <Preloader />
        }
        <MoviesCardList 
            moviesData={mockData}
            isLoggedIn={true}/>
    </main>
  );
}

export default Movies;