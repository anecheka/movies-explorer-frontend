import React from 'react';
import { Link } from 'react-router-dom';
import './Register.css';
import Form from '../Form/Form';
import '../Form/Form.css';
import logo from '../../images/logo.svg';


function Register() {

  return (
    <main className="register">
        <Link to="/"><img className="register__logo" src={logo} alt="Лого проекта Синематека"/></Link>
        <Form 
            title="Добро пожаловать!"
            name='register'
            button='Зарегистрироваться'
            buttonClassName="register__button"
            titleClassName='register__title'
            // onSubmit={handleSubmit}
            >
            <p className="form__input form__input_label-position_top">
                <label className="form__input-copy form__input-label form__input-label_label-position_top" htmlFor="registration-name">Имя</label>
                <input className="form__input-copy form__input-field form__input-field_label-position_top" type="text" defaultValue="Ваше имя" /*onChange={handleChangeDescription}*/ name="registration-name" id="registration-name" minLength="2" required />
            </p>
            <span className="form__input-error-message"></span>
            <p className="form__input form__input_label-position_top">
                <label className="form__input-copy form__input-label form__input-label_label-position_top" htmlFor="registration-email">Email</label>
                <input className="form__input-copy form__input-field form__input-field_label-position_top" type="email" defaultValue="pochta@yandex.ru" /*onChange={handleChangeName}*/ name="registration-email" id="registration-email" minLength="2" required />
           </p>
           <span className="form__input-error-message"></span>
            <p className="form__input form__input_label-position_top">
                <label className="form__input-copy form__input-label form__input-label_label-position_top" htmlFor="registration-password">Пароль</label>
                <input className="form__input-copy form__input-field form__input-field_label-position_top" type="password" defaultValue="somepassword" /*onChange={handleChangeDescription}*/ name="registration-password" id="registration-password" minLength="2" required />
            </p>
            <span className="form__input-error-message"></span>
        </Form>
        <p className="register__login-label">Уже зарегистрированы? <Link to="/signin" className="register__login-link">Войти</Link></p>
    </main>
  );
}

export default Register;
