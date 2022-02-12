import React from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import Form from '../Form/Form';
import '../Form/Form.css';
import logo from '../../images/logo.svg';
import { useFormWithValidation } from '../../utils/hooks/useFormWithValidation';

function Login( {onLogin, serverError} ) {

  const { 
    values, 
    handleChange, 
    errors, 
    isValid, 
    resetForm } 

= useFormWithValidation();

function handleSubmit(e) {

    e.preventDefault();
    const { email, password } = values;
    
    onLogin ({
        email,
        password,
    });

    resetForm();
}
  
  return (
    <main className="login">
        <Link to="/"><img className="login__logo" src={logo} alt="Лого проекта Синематека"/></Link>
        <Form 
            title="Рады видеть!"
            name='login'
            button='Войти'
            buttonClassName="login__button"
            titleClassName="login__title"
            disabled={!isValid}
            onSubmit={handleSubmit}
            errorMessage={serverError}
            >
            <p className="form__input form__input_label-position_top">
                <label className="form__input-copy form__input-label form__input-label_label-position_top" htmlFor="login-email">E-mail</label>
                <input className="form__input-copy form__input-field form__input-field_label-position_top" 
                  type="email" 
                  placeholder="Ваш email"
                  name="email" 
                  id="login-email"
                  value={values.email || ''}
                  onChange={handleChange}
                  minLength="2" 
                  required 
                />
           </p>
           {errors.email && <span className="form__input-error-message">{errors.email}</span>}
            <p className="form__input form__input_label-position_top">
                <label className="form__input-copy form__input-label form__input-label_label-position_top" htmlFor="login-password">Пароль</label>
                <input className="form__input-copy form__input-field form__input-field_label-position_top" 
                  type="password" 
                  placeholder="Ваш пароль" 
                  value={values.password || ''}
                  onChange={handleChange}
                  name="password" 
                  id="login-password" 
                  minLength="8" 
                  required 
                />
            </p>
            {errors.password && <span className="form__input-error-message">{errors.password}</span>}
        </Form>
        <p className="login__registration-label">Eщё не зарегистрированы? <Link to="signup" className="login__registration-link">Регистрация</Link></p>
    </main>
  );
}

export default Login;
