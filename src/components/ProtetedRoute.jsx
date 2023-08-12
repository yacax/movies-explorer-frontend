import React from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import CurrentUserContext from '../contexts/CurrentUserContext';

function ProtectedRoute({ component: Component, ...props }) {
  const currentUser = React.useContext(CurrentUserContext);
  if (!currentUser.isLoggedIn) {
    return <Navigate to="/" />;
  }
  return <Component {...props} />;
}

ProtectedRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
};

export default ProtectedRoute;
