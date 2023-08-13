import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import mainApi from '../utils/MainApi';
import { AUTH_ERROR_MESSAGES, REGEXP } from '../utils/constants';

const jwtTest = (jwt) => {
  const jwtPattern = REGEXP.JWT_PATTERN;
  return jwtPattern.test(jwt.token);
};

const userTest = (id, name, email) => (!!(id && name && email));

const useAuth = (setCurrentUser) => {
  if (typeof setCurrentUser !== 'function') {
    throw new Error('setCurrentUser is not a function');
  }
  const navigate = useNavigate();
  const [token, setToken] = useState('');
  const [info, setInfo] = useState({
    isOpen: false,
    infoMessage: '',
    infoType: false,
  });

  const showInfoMessage = (message, MessageType = false) => {
    setInfo({
      ...info,
      isOpen: true,
      infoMessage: message,
      infoType: MessageType,
    });
  };

  useEffect(() => {
    let timer;
    if (info.isOpen) {
      timer = setTimeout(() => {
        setInfo({
          isOpen: false,
          infoMessage: '',
          infoType: false,
        });
      }, 5000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [info.isOpen]);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    setToken(jwt);
    mainApi.setToken(jwt);
  }, []);

  useEffect(() => {
    if (!token) {
      return;
    }
    mainApi.getUserData(token)
      .then((user) => {
        if (userTest(user.data._id, user.data.name, user.data.email)) {
          setCurrentUser((prevState) => ({
            ...prevState,
            _id: user.data._id,
            name: user.data.name,
            email: user.data.email,
            isLoggedIn: true,
          }));
        } else {
          showInfoMessage(AUTH_ERROR_MESSAGES.SERVER_RESP_ERROR);
        }
      })
      .catch((err) => {
        console.log(err);
        showInfoMessage(AUTH_ERROR_MESSAGES.SMTH_WENT_WRONG);
      });
  }, [token]);

  const registerUser = ({
    name,
    email,
    password,
  }) => {
    mainApi.register(name, email, password)
      .then((res) => {
        if (userTest(res._id, res.name, res.email)) {
          showInfoMessage(AUTH_ERROR_MESSAGES.SUCCESS_REGISTRATION, true);
        } else {
          showInfoMessage(AUTH_ERROR_MESSAGES.SERVER_RESP_ERROR);
          throw new Error(AUTH_ERROR_MESSAGES.SERVER_RESP_ERROR);
        }
        return {
          _id: res._id,
          name: res.name,
          email: res.email,
        };
      }).then(({ _id: resId, name: resName, email: resEmail }) => {
        mainApi
          .authorize(resEmail, password)
          .then((res) => {
            if (jwtTest(res)) {
              localStorage.setItem('jwt', res.token);
              mainApi.setToken(res.token);
              setCurrentUser((prevState) => ({
                ...prevState,
                _id: resId,
                name: resName,
                email: resEmail,
                isLoggedIn: true,
              }));
              navigate('/movies');
            } else {
              showInfoMessage(AUTH_ERROR_MESSAGES.SERVER_RESP_ERROR);
            }
          }).catch((err) => {
            console.log(err);
            showInfoMessage(AUTH_ERROR_MESSAGES.SMTH_WENT_WRONG);
          });
      })
      .catch((err) => {
        console.log(err);
        showInfoMessage(AUTH_ERROR_MESSAGES.SMTH_WENT_WRONG);
      });
  };

  const loginUser = ({ email, password }) => {
    mainApi
      .authorize(email, password)
      .then((res) => {
        if (jwtTest(res)) {
          localStorage.setItem('jwt', res.token);
          mainApi.setToken(res.token);
        } else {
          showInfoMessage(AUTH_ERROR_MESSAGES.SERVER_RESP_ERROR);
          throw new Error(AUTH_ERROR_MESSAGES.SERVER_RESP_ERROR);
        }
        return mainApi.getUserData(res.token);
      })
      .then((res) => {
        setCurrentUser((prevState) => ({
          ...prevState,
          _id: res.data._id,
          name: res.data.name,
          email: res.data.email,
          isLoggedIn: true,
        }));
        showInfoMessage(`Привет ${res.data.name}!`, true);
        navigate('/movies');
      })
      .catch((err) => {
        console.log(err);
        showInfoMessage(AUTH_ERROR_MESSAGES.SMTH_WENT_WRONG);
      });
  };

  const changeProfile = (user) => {
    mainApi.patchUserData(user.name, user.email)
      .then((res) => {
        if (userTest(res.data._id, res.data.name, res.data.email)) {
          setCurrentUser((prevState) => ({
            ...prevState,
            name: res.data.name,
            email: res.data.email,
          }));
          showInfoMessage(AUTH_ERROR_MESSAGES.SUCCESS, true);
        }
      })
      .catch((err) => {
        console.log(err);
        showInfoMessage(AUTH_ERROR_MESSAGES.SMTH_WENT_WRONG);
      });
  };

  const logOut = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('lastSearchDataLocalStorage');
    setToken('');
    setCurrentUser((prevState) => ({
      ...prevState,
      _id: '',
      name: '',
      email: '',
      isLoggedIn: false,
    }));
    navigate('/');
  };

  return {
    registerUser,
    loginUser,
    changeProfile,
    logOut,
    token,
    info,
  };
};

export default useAuth;
