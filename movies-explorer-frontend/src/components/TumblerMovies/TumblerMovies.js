import React from 'react';
import './TumblerMovies.css';

function TumblerMovies( {tumblerOn, handleShowShortMovies, handleShowShortSavedMovies, isInAllMovies}) {

  const toggleSwitchClassName = `toggle__switch ${tumblerOn ? 'toggle__switch_on' : ''}`;

  function handleClick(e) {
    if (!isInAllMovies) {
      handleShowShortSavedMovies();
    } else {
      handleShowShortMovies();
    }
}
  return (
    <div className="toggle">
      <button 
        type="checkbox" 
        className={toggleSwitchClassName} 
        name="toggle" 
        id="toggle"
        onClick={handleClick} />
      <label className="toggle__switch-label" htmlFor="toggle">
        Короткометражки
      </label>
</div>
  );
}

export default TumblerMovies;