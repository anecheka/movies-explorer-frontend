import React from 'react';
import './App.css';
import Header from '../Header/Header';
import { Route, Switch, useLocation } from 'react-router-dom';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Footer from '../Footer/Footer';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Error from '../Error/Error';

function App() {

  const location = useLocation();
  
  return (
    <div className="root">
       {location.pathname !=='/signin' && location.pathname !=='/signup' && <Header /> }
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route path="/movies">
          <Movies />
        </Route>
        <Route path="/saved-movies">
          <SavedMovies />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/signin">
          <Login/>
        </Route>
        <Route path="/signup">
          <Register />
        </Route>
        <Route path="*">
          <Error />
        </Route>
      </Switch>
      {location.pathname !=='/signin' && location.pathname !=='/signup' && <Footer/> }
    </div>
  );
}

export default App;
