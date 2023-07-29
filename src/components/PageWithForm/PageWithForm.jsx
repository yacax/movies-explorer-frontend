import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import './PageWithForm.css';

import IsLoggedIn from '../../contexts/IsLoggedInContext';

function PageWithForm({
  pageName,
  pageTitle,
  submitButtonText,
  onSubmit,
  children,
  isFormValid,
  pageNavigationLink,
  pageNavigationLinkText,
  pageNavigationLinkComment,
}) {
  const navigate = useNavigate();
  const { setIsLoggedIn } = React.useContext(IsLoggedIn);
  const onClick = (evt) => {
    evt.preventDefault();
    setIsLoggedIn(true);
    navigate('/movies');
  };
  return (
    <div className={`page-with-form page-with-form_name_${pageName}`}>
      <div
        className="page-with-form__top-container"
      >
        <div className="page-with-form__logo" />
        <h2 className="page-with-form__title">{pageTitle}</h2>
        <form
          className="page-with-form__form"
          onSubmit={onSubmit}
          id={pageName}
        >
          {children}
        </form>
      </div>
      <div
        className="page-with-form__bottom-container"
      >
        <input
          type="submit"
          form={pageName}
          className={`page-with-form__button ${!isFormValid ? 'page-with-form__button_disabled' : ''}`}
          name="page-with-form__submit"
          value={submitButtonText}
          disabled={!isFormValid}
          onClick={onClick}
        />
        <nav
          className="page-with-form__navigation"
        >
          <span className="page-with-form__link-text">{pageNavigationLinkComment}</span>
          <NavLink
            to={pageNavigationLink}
            className="page-with-form__link"
          >
            {pageNavigationLinkText}
          </NavLink>
        </nav>
      </div>
    </div>
  );
}

PageWithForm.propTypes = {
  pageName: PropTypes.string.isRequired,
  pageTitle: PropTypes.string.isRequired,
  submitButtonText: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  isFormValid: PropTypes.bool.isRequired,
  pageNavigationLink: PropTypes.string.isRequired,
  pageNavigationLinkText: PropTypes.string.isRequired,
  pageNavigationLinkComment: PropTypes.string.isRequired,
};

export default PageWithForm;
