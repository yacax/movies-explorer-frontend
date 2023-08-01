import React from 'react';
import useForm from '../../hooks/useForm';
import PageWithForm from '../PageWithForm/PageWithForm';

function SignIn() {
  const {
    form,
    errors,
    isFormValid,
    handleChange,
  } = useForm({
    email: '',
    password: '',
  });

  return (
    <PageWithForm
      pageTitle="Рады видеть!"
      pageName="login"
      submitButtonText="Войти"
      pageNavigationLink="/signup"
      pageNavigationLinkText="Регистрация"
      pageNavigationLinkComment="Ещё не зарегистрированы?"
      isFormValid={isFormValid}
      onSubmit={() => { }}
    >

      <label
        className={`page-with-form__input-label  ${errors.email ? 'page-with-form__input-label_invalid' : ''}`}
        htmlFor="name"
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
          value={form.username}
          onChange={handleChange}
        />
        <span className="page-with-form__error-text">
          {errors.email}
        </span>
      </label>

      <label
        className={`page-with-form__input-label  ${errors.password ? 'page-with-form__input-label_invalid' : ''}`}
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
          maxLength="40"
          id="password"
          value={form.password}
          onChange={handleChange}
        />
        <span className="page-with-form__error-text">
          {errors.password}
        </span>
      </label>
    </PageWithForm>
  );
}

export default SignIn;
