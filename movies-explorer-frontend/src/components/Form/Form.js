import React from 'react';
import './Form.css';

function Form(props) {

    return (
        <form className="form" name={`${props.name}`} onSubmit={props.onSubmit}>
            <h2 className={`form__title ${props.titleClassName}`}>{props.title}</h2>
            <fieldset className="form__container">
                {props.children}
                <button type="submit" className={`form__submit-button ${props.buttonClassName}`} id={`submit-${props.name}`}>{props.button}</button>
            </fieldset>
        </form>
    );
  }

  export default Form;