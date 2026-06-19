import { loadUserData, registerUser, loginUser } from '../../services/api/authApi';
import setAuthToken from './auth.utils';
import {setAlert} from '../alert/alert.actions';
import getApiError from '../../utils/apiError';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from './auth.types';

// Load User
export const loadUser = () => async (dispatch) => {
  if (typeof window !== 'undefined' && localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await loadUserData();

    dispatch({
      type: USER_LOADED,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register User
export const register = ({ username, password }) => async (dispatch) => {
  try {
    const res = await registerUser(username, password);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data.data,
    });

    // Store token in localStorage and set axios header
    if (res.data.data.token) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', res.data.data.token);
      }
      setAuthToken(res.data.data.token);
    }

    dispatch(setAlert(res.data.message || 'Account created successfully.', 'success'));

    dispatch(loadUser());
    return {success: true};
  } catch (err) {
    const error = getApiError(err, 'Unable to register. Please try again.');

    dispatch(setAlert(error.message, 'danger'));

    dispatch({
      type: REGISTER_FAIL,
    });
    return {success: false};
  }
};

// Login User
export const login = ({username, password}) => async (dispatch) => {
  try {
    const res = await loginUser(username, password);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data.data,
    });

    // Store token in localStorage and set axios header
    if (res.data.data.token) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', res.data.data.token);
      }
      setAuthToken(res.data.data.token);
    }

    dispatch(setAlert(res.data.message || 'Logged in successfully.', 'success'));

    dispatch(loadUser());
    return {success: true};
  } catch (err) {
    const error = getApiError(err, 'Unable to log in. Please check your credentials.');

    dispatch(setAlert(error.message, 'danger'));

    dispatch({
      type: LOGIN_FAIL,
    });
    return {success: false};
  }
};

//LOGOUT
export const logout = () => (dispatch) => {
  dispatch(setAlert('You have been logged out successfully.', 'success'));
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
  }

  dispatch({type: LOGOUT});
};
