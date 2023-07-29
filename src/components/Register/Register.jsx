import React from 'react';
import './Register.css';
import useForm from '../../hooks/useForm';
import PageWithForm from '../PageWithForm/PageWithForm';

function Register() {
  const {
    form,
    errors,
    isFormValid,
    handleChange,
  } = useForm({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  return (
    <PageWithForm
      pageTitle="Добро пожаловать!"
      pageName="register"
      submitButtonText="Зарегистрироваться"
      pageNavigationLink="/signin"
      pageNavigationLinkText="Войти"
      pageNavigationLinkComment="Уже зарегистрированы?"
      isFormValid={isFormValid}
      onSubmit={() => { }}
    >
      <label
        className="page-with-form__input-label"
        htmlFor="username"
      >
        Имя
        <input
          type="text"
          autoComplete="name"
          className="page-with-form__input"
          name="username"
          required
          minLength="2"
          maxLength="30"
          id="username"
          value={form.username}
          onChange={handleChange}
        />
        <span className="page-with-form__error-text">
          {errors.username}
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

export default Register;
