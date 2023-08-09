import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Profile.css';
import Header from '../Header/Header';
import useForm from '../../hooks/useForm';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function Profile({
  logOut,
  changeProfile,
}) {
  const user = React.useContext(CurrentUserContext);
  const [isEdit, setIsEdit] = useState(false);
  const refName = useRef();
  const {
    form,
    errors,
    handleChange,
    isFormValid,
  } = useForm({
    name: user.name,
    email: user.email,
  });

  useEffect(() => { console.log(isFormValid); }, [isFormValid]);

  const isEditHandler = () => {
    setIsEdit(!isEdit);
    refName.current.focus();
  };

  useEffect(() => {
    if (isEdit) {
      refName.current.focus();
    }
  }, [isEdit]);

  const submitProfileHandler = (e) => {
    e.preventDefault();
    console.log(form);
    setIsEdit(!isEdit);
    changeProfile(form);
  };

  return (
    <>
      <Header />
      <main className="profile">
        <h2 className="profile__title">
          Привет,
          {' '}
          {user.name}
          !
        </h2>
        <form
          className="profile__form"
          onSubmit={submitProfileHandler}
          id="profileForm"
        >
          <label
            className={`profile__input-label ${isEdit ? 'profile__input-label_type_edit' : ''}`}
            htmlFor="name"
          >
            Имя
            <input
              ref={refName}
              type="text"
              className={`profile__input ${isEdit ? 'profile__input_type_edit' : ''}`}
              name="name"
              placeholder="Имя"
              required
              minLength="2"
              maxLength="30"
              id="profile-name-input"
              disabled={!isEdit}
              value={form.name}
              onChange={handleChange}
            />
            <span className="profile__input-error profile__input-error_type_name">
              {errors.name}
            </span>
          </label>

          <label
            className={`profile__input-label ${isEdit ? 'profile__input-label_type_edit' : ''}`}
            htmlFor="email"
          >
            E-mail
            <input
              type="email"
              className={`profile__input ${isEdit ? 'profile__input_type_edit' : ''}`}
              name="email"
              placeholder="E-mail"
              required
              minLength="2"
              maxLength="30"
              id="profile-email-input"
              disabled={!isEdit}
              value={form.email}
              onChange={handleChange}
            />
            <span className="profile__input-error profile__input-error_type_email">
              {errors.email}
            </span>
          </label>
        </form>
        {!isEdit ? (
          <div className="profile__buttons-container">
            <input
              type="button"
              className="profile__link"
              name="profile-change"
              aria-label="Редактировать профайл"
              value="Редактировать"
              onClick={isEditHandler}
            // disabled={() => { }}
            />
            <input
              type="button"
              className="profile__link profile__link_color_red"
              name="profile-logout"
              aria-label="Выйти из аккаунта"
              value="Выйти из аккаунта"
              onClick={logOut}
            // disabled={() => { }}
            />
          </div>
        ) : (
          <input
            type="submit"
            form="profileForm"
            className={`profile__button ${!isFormValid ? 'profile__button_disabled' : ''}`}
            name="profile-submit"
            aria-label="Сохранить изменения"
            value="Сохранить"
            disabled={!isFormValid}
          />
        )}

      </main>
    </>
  );
}

Profile.propTypes = {
  logOut: PropTypes.func,
  changeProfile: PropTypes.func,
};

Profile.defaultProps = {
  logOut: () => { },
  changeProfile: () => { },
};

export default Profile;
