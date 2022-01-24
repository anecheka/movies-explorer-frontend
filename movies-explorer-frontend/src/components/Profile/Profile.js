import React from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';
import Form from '../Form/Form';
import '../Form/Form.css';

function Profile() {

 const [editMode, setEditMode] = React.useState(false);

 function handleEditClick () {
        setEditMode(true);
 }

 const buttonSubmitClassName = [
     "profile__button",
     !editMode && "profile__button_hidden"
 ].join(" ");
 
 const buttonEditClassName = [
    "profile__edit-link",
    editMode && "profile__edit-link_hidden"
 ].join(" ");


  return (
    <main className="profile">
        <Form 
            title="Привет, Виталий!"
            name='edit-profile'
            button='Сохранить'
            buttonClassName={buttonSubmitClassName}
            titleClassName="profile__title"
            // onSubmit={handleSubmit}
            >
            <p className="form__input form__input_no-border">
                <label className="form__input-copy form__input-label" htmlFor="name">Имя</label>
                <input className="form__input-copy form__input-field" type="text" defaultValue="Виталий" /*onChange={handleChangeName}*/ name="name" id="name" minLength="2" maxLength="40" required />
           </p>
           <span className="form__input-error-message"></span>
            <p className="form__input form__input_no-border">
                <label className="form__input-copy form__input-label" htmlFor="email">E-mail</label>
                <input className="form__input-copy form__input-field" type="email" defaultValue="pochta@yandex.ru" /*onChange={handleChangeDescription}*/ name="email" id="email" minLength="2" required />
            </p>
            <span className="form__input-error-message"></span>
        </Form>
        <button className={buttonEditClassName} onClick={handleEditClick}>Редактировать</button>
        <Link to="/" className="profile__sign-out">Выйти из аккаунта</Link>
    </main>
  );
}

export default Profile;
