import React from 'react';
import { Link } from 'react-router-dom';
import './Register.css';
import Form from '../Form/Form';
import '../Form/Form.css';
import logo from '../../images/logo.svg';
import { useFormWithValidation } from '../../utils/hooks/useFormWithValidation';


function Register( { serverError, onRegister }) {

    const { 
        values, 
        handleChange, 
        errors, 
        isValid, 
        resetForm } 

    = useFormWithValidation();

    function handleSubmit(e) {
    
        e.preventDefault();
        const { name, email, password } = values;
        
        onRegister ({
            name,
            email,
            password,
        });

        resetForm();
    }

  return (
    <main className="register">
        <Link to="/"><img className="register__logo" src={logo} alt="Лого проекта Синематека"/></Link>
        <Form 
            title="Добро пожаловать!"
            name='register'
            button='Зарегистрироваться'
            buttonClassName="register__button"
            titleClassName='register__title'
            disabled={!isValid}
            onSubmit={handleSubmit}
            errorMessage={serverError}
            >
            <p className="form__input form__input_label-position_top">
                <label className="form__input-copy form__input-label form__input-label_label-position_top" htmlFor="registration-name">Имя</label>
                <input className="form__input-copy form__input-field form__input-field_label-position_top"
                    type="text"
                    name="name"
                    placeholder="Ваше имя"
                    id="registration-name"
                    value={values.name || ''}
                    onChange={handleChange}
                    minLength="2"
                    pattern="[A-Za-zА-Яа-яЁё\s\-]{1,}"
                    required
                />
            </p>
            {errors.name && <span className="form__input-error-message">
            {
                    errors.name==="Введите данные в указанном формате." ? 
                    "Имя должно содержать только кириллицу, латиницу, пробел и дефис." : errors.name
                }
            </span>}
            <p className="form__input form__input_label-position_top">
                <label className="form__input-copy form__input-label form__input-label_label-position_top" htmlFor="registration-email">Email</label>
                <input className="form__input-copy form__input-field form__input-field_label-position_top" 
                    type="email"
                    name="email"
                    placeholder="example@example.com" 
                    id="registration-email"
                    value={values.email || ''}
                    onChange={handleChange}
                    minLength="2" 
                    required 
                />
           </p>
           {errors.email && <span className="form__input-error-message">{errors.email}</span>}
            <p className="form__input form__input_label-position_top">
                <label className="form__input-copy form__input-label form__input-label_label-position_top" htmlFor="registration-password">Пароль</label>
                <input className="form__input-copy form__input-field form__input-field_label-position_top" 
                    type="password"
                    name="password"
                    placeholder="Пароль"
                    id="registration-password"
                    value={values.password || ''}
                    onChange={handleChange}
                    minLength="8" 
                    required 
                />
            </p>
            {errors.password && <span className="form__input-error-message">{errors.password}</span>}
        </Form>
        <p className="register__login-label">Уже зарегистрированы? <Link to="/signin" className="register__login-link">Войти</Link></p>
    </main>
  );
}

export default Register;
