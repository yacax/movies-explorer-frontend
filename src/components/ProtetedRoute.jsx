import React from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
// import IsLoggedIn from '../contexts/IsLoggedInContext';
import CurrentUserContext from '../contexts/CurrentUserContext';

function ProtectedRoute({ component: Component, ...props }) {
  // const { isLoggedIn } = React.useContext(IsLoggedIn);
  const user = React.useContext(CurrentUserContext);
  // console.log(isLoggedIn);
  if (!user.isLoggedIn) {
    return <Navigate to="/" />;
  }
  return <Component {...props} />;
}

ProtectedRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  // isLoggedIn: PropTypes.bool,
};

// ProtectedRoute.defaultProps = {
//   isLoggedIn: false,
// };

export default ProtectedRoute;
