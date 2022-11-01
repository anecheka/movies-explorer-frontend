import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import TumblerMovies from '../TumblerMovies/TumblerMovies';

function SavedMovies({
  searchQuery,
  searchSavedQuery,
  setSearchSavedQuery, 
  handleShowMoreMovies, 
  moreButtonHidden, 
  searchResultsShown, 
  loading, 
  tumblerOn, 
  handleShowShortMovies, 
  onSaveMovie, 
  isInAllMovies, 
  moviesData,
  savedMoviesData,
  onDeleteMovie, 
  handleShowShortSavedMovies,
  }) {

  return (
    <main className="movies">
         <SearchForm
          searchSavedQuery={searchSavedQuery}
          setSearchSavedQuery={setSearchSavedQuery}
        />
        <TumblerMovies 
          tumblerOn={tumblerOn}
          handleShowShortSavedMovies={handleShowShortSavedMovies}
          handleShowShortMovies={handleShowShortMovies}
          isInAllMovies={isInAllMovies}
        />
        <MoviesCardList 
            loading={loading}
            searchQuery={searchQuery}
            searchSavedQuery={searchSavedQuery}
            moviesData={moviesData}
            savedMoviesData={savedMoviesData}
            handleShowMoreMovies={handleShowMoreMovies}
            moreButtonHidden={moreButtonHidden}
            searchResultsShown={searchResultsShown}
            onSaveMovie={onSaveMovie}
            isInAllMovies={isInAllMovies}
            onDeleteMovie={onDeleteMovie}
          />
    </main>
  );
}

export default SavedMovies;