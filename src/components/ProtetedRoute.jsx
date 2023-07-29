import React from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import IsLoggedIn from '../contexts/IsLoggedInContext';

function ProtectedRoute({ component: Component, ...props }) {
  const { isLoggedIn } = React.useContext(IsLoggedIn);
  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }
  return <Component {...props} />;
}

ProtectedRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
};

export default ProtectedRoute;
