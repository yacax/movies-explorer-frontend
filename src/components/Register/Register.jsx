import React from 'react';
import PropTypes from 'prop-types';
import useForm from '../../hooks/useForm';
import PageWithForm from '../PageWithForm/PageWithForm';

function Register({ registerUser }) {
  const {
    form,
    errors,
    isFormValid,
    handleChange,
  } = useForm({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = (evt) => {
    evt.preventDefault();
    registerUser(form);
  };

  return (
    <PageWithForm
      pageTitle="Добро пожаловать!"
      pageName="register"
      submitButtonText="Зарегистрироваться"
      pageNavigationLink="/signin"
      pageNavigationLinkText="Войти"
      pageNavigationLinkComment="Уже зарегистрированы?"
      isFormValid={isFormValid}
      onSubmit={handleSubmit}
    >
      <label
        className="page-with-form__input-label"
        htmlFor="name"
      >
        Имя
        <input
          type="text"
          autoComplete="name"
          className="page-with-form__input"
          name="name"
          placeholder="Имя"
          required
          minLength="2"
          maxLength="30"
          id="name"
          value={form.name}
          onChange={handleChange}
        />
        <span className="page-with-form__error-text">
          {errors.name}
        </span>
      </label>
      <label
        className="page-with-form__input-label"
        htmlFor="email"
      >
        E-mail
        <input
          type="email"
          autoComplete="email"
          className="page-with-form__input"
          name="email"
          placeholder="E-mail"
          required
          maxLength="30"
          id="email"
          value={form.email}
          onChange={handleChange}
        />
        <span className="page-with-form__error-text">
          {errors.email}
        </span>
      </label>

      <label
        className="page-with-form__input-label"
        htmlFor="password"
      >
        Пароль
        <input
          type="password"
          autoComplete="current-password"
          className="page-with-form__input"
          name="password"
          placeholder="Пароль"
          required
          minLength="8"
          maxLength="40"
          id="password"
          value={form.password}
          onChange={handleChange}
        />
        <span className="page-with-form__error-text">
          {errors.password}
        </span>
      </label>
      <label
        className="page-with-form__input-label"
        htmlFor="password"
      >
        Подтвердите пароль
        <input
          type="password"
          autoComplete="new-password"
          className="page-with-form__input"
          name="confirmPassword"
          placeholder="Подтвердите пароль"
          required
          minLength="8"
          maxLength="40"
          id="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
        />
        <span className="page-with-form__error-text">
          {errors.confirmPassword}
        </span>
      </label>
    </PageWithForm>
  );
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
};

export default Register;
