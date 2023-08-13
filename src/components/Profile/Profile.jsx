import React, { useState, useRef, useEffect } from 'react';
import './Profile.css';
import PropTypes from 'prop-types';
import Header from '../Header/Header';
import useForm from '../../hooks/useForm';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function Profile({
  changeProfile,
  logOut,
}) {
  const currentUser = React.useContext(CurrentUserContext);
  const [isEdit, setIsEdit] = useState(false);
  const refName = useRef();
  const {
    form,
    setForm,
    errors,
    handleChange,
    isFormValid,
    updateFormInput,
  } = useForm({
    name: currentUser.name,
    email: currentUser.email,
  });

  useEffect(() => {
    setForm((prevState) => ({
      ...prevState,
      name: currentUser.name,
      email: currentUser.email,
    }));
    setIsEdit(false);
  }, [currentUser]);

  const isEditHandler = () => {
    setIsEdit(!isEdit);
    refName.current.focus();
  };

  const submitProfileHandler = (e) => {
    e.preventDefault();
    changeProfile(form);
  };

  const escapeKeyHandler = (e) => {
    if (isEdit && e.key === 'Escape') {
      updateFormInput({
        name: currentUser.name,
        email: currentUser.email,
      });
      setIsEdit(false);
    }
  };

  useEffect(() => {
    if (isEdit) {
      refName.current.focus();
    }
    document.addEventListener('keydown', escapeKeyHandler);
    return () => {
      document.removeEventListener('keydown', escapeKeyHandler);
    };
  }, [isEdit, currentUser]);

  return (
    <>
      <Header />
      <main className="profile">
        <h2 className="profile__title">
          Привет,
          {' '}
          {currentUser.name}
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
            />
            <input
              type="button"
              className="profile__link profile__link_color_red"
              name="profile-logout"
              aria-label="Выйти из аккаунта"
              value="Выйти из аккаунта"
              onClick={logOut}
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
  changeProfile: PropTypes.func,
  logOut: PropTypes.func,
};

Profile.defaultProps = {
  changeProfile: () => { },
  logOut: () => { },
};

export default Profile;
