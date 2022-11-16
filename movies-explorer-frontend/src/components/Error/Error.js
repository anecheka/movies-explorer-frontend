import React from 'react';
import { useHistory } from 'react-router-dom';
import './Error.css';

function Error() {

  let history = useHistory(); 

  return (
    <main className="error">
        <div className="error__container">
            <h1 className="error__code">404</h1>
            <p className="error__message">Страница не найдена</p>
       </div>
       <button onClick={() => history.goBack()} className="error__back-button">Назад</button>
    </main>
  );
}

export default Error;
