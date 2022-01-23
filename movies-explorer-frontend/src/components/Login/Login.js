import React from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import Form from '../Form/Form';
import '../Form/Form.css';
import logo from '../../images/logo.svg';

function Login() {
  
  return (
    <main className="login">
        <Link to="/"><img className="login__logo" src={logo} alt="Лого проекта Синематека"/></Link>
        <Form 
            title="Рады видеть!"
            name='login'
            button='Войти'
            buttonClassName="login__button"
            titleClassName="login__title"
            // onSubmit={handleSubmit}
            >
            <p className="form__input form__input_label-position_top">
                <label className="form__input-copy form__input-label form__input-label_label-position_top" htmlFor="login-email">E-mail</label>
                <input className="form__input-copy form__input-field form__input-field_label-position_top" type="email" defaultValue="pochta@yandex.ru" /*onChange={handleChangeName}*/ name="login-email" id="login-email" minLength="2" required />
           </p>
           <span className="form__input-error-message"></span>
            <p className="form__input form__input_label-position_top">
                <label className="form__input-copy form__input-label form__input-label_label-position_top" htmlFor="login-password">Пароль</label>
                <input className="form__input-copy form__input-field form__input-field_label-position_top" type="password" defaultValue="somepassword" /*onChange={handleChangeDescription}*/ name="login-password" id="login-password" minLength="2" required />
            </p>
            <span className="form__input-error-message"></span>
        </Form>
        <p className="login__registration-label">Eщё не зарегистрированы? <Link to="signup" className="login__registration-link">Регистрация</Link></p>
    </main>
  );
}

export default Login;
