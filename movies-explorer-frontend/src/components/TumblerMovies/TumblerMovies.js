import React from 'react';
import './TumblerMovies.css';

function TumblerMovies() {

  const [on, setOn] = React.useState(false);

  const toggleSwitchClassName = `toggle__switch ${on ? 'toggle__switch_on' : ''}`;

  function handleClick(e) {
    on ? setOn(false) : setOn(true);
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