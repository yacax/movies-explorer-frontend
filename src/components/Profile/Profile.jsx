import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import Header from '../Header/Header';
import useForm from '../../hooks/useForm';
import IsLoggedIn from '../../contexts/IsLoggedInContext';

function Profile() {
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const { setIsLoggedIn } = React.useContext(IsLoggedIn);
  const refName = useRef();
  const {
    form,
    errors,
    handleChange,
  } = useForm({
    username: 'Александр',
    email: 'mail@mail.com',
  });

  const isEditHandler = () => {
    setIsEdit(!isEdit);
    refName.current.focus();
  };

  useEffect(() => {
    if (isEdit) {
      refName.current.focus();
    }
  }, [isEdit]);

  const goExit = () => {
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <>
      <Header />
      <section className="profile">
        <h2 className="profile__title">
          Привет,
          {' '}
          {form.username}
          !
        </h2>
        <form
          className="profile__form"
        >
          <label
            className={`profile__input-label ${isEdit ? 'profile__input-label_type_edit' : ''}`}
            htmlFor="username"
          >
            Имя
            <input
              ref={refName}
              type="text"
              className={`profile__input ${isEdit ? 'profile__input_type_edit' : ''}`}
              name="username"
              placeholder=""
              required
              minLength="1"
              maxLength="30"
              id="profile-username-input"
              disabled={!isEdit}
              value={form.username}
              onChange={handleChange}
            />
            <span className="profile__input-error profile__input-error_type_name">
              {errors.username}
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
              placeholder=""
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
              onClick={goExit}
            // disabled={() => { }}
            />
          </div>
        ) : (
          <input
            type="submit"
            className="profile__button"
            name="profile-submit"
            aria-label="Сохранить изменения"
            value="Сохранить"
            onClick={isEditHandler}
          // disabled={() => { }}
          />
        )}
      </section>
    </>
  );
}
export default Profile;
