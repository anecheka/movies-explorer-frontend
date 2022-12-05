import React from 'react';
import './Profile.css';
import Form from '../Form/Form';
import '../Form/Form.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormWithValidation } from '../../utils/hooks/useFormWithValidation';

function Profile( {onEditProfile, onSignOut, serverError}) {

 const currentUser = React.useContext(CurrentUserContext);

 const { 
    values, 
    handleChange, 
    errors, 
    isValid, 
    } 

= useFormWithValidation();

function handleSubmit(e) {

    e.preventDefault();
    const { name, email } = values;

    if (!values.email) {
        onEditProfile ({
            name,
            email: currentUser.email,
        })
        } else if (!values.name) {
            onEditProfile ({
                name: currentUser.name,
                email,
            });
            }  else {
                onEditProfile ({
                    name,
                    email,
                });
        }
}

  return (
    <main className="profile">
        <Form 
            title={`Привет, ${currentUser.name}!`}
            name='edit-profile'
            button='Сохранить'
            buttonClassName="profile__button"
            disabled={!isValid}
            titleClassName="profile__title"
            onSubmit={handleSubmit}
            errorMessage={serverError}
            >
            <p className="form__input form__input_no-border">
                <label className="form__input-copy form__input-label" htmlFor="name">Имя</label>
                <input className="form__input-copy form__input-field" 
                    type="text" 
                    value={values.name || currentUser.name}
                    onChange={handleChange} 
                    name="name" 
                    id="name" 
                    minLength="2" 
                    maxLength="40"
                    pattern="[A-Za-zА-Яа-яЁё\s\-]{1,}"
                    />
           </p>
           {errors.name && <span className="form__input-error-message">
           {
                    errors.name==="Введите данные в указанном формате." ? 
                    "Имя должно содержать только кириллицу, латиницу, пробел и дефис." : errors.name
                }
            </span>}
            <p className="form__input form__input_no-border">
                <label className="form__input-copy form__input-label" htmlFor="email">E-mail</label>
                <input className="form__input-copy form__input-field" 
                    type="email" 
                    value={values.email || currentUser.email} 
                    onChange={handleChange}
                    name="email" 
                    id="email" 
                    minLength="2"
                    pattern="^(\D)+(\w)*((\.(\w)+)?)+@(\D)+(\w)*((\.(\D)+(\w)*)+)?(\.)[a-z]{2,}$"
                    />
               </p>
            {errors.email && <span className="form__input-error-message">
                {
                        errors.email==="Введите данные в указанном формате." ? 
                        "Проверьте правильность написания E-mail." : errors.email
                    }

                </span>}
        </Form>
        <button className="profile__sign-out" onClick={onSignOut}>Выйти из аккаунта</button>
    </main>
  );
}

export default Profile;
