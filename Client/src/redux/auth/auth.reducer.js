import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  UPDATE_AUTH_USER,
} from './auth.types';

const getStoredToken = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  return localStorage.getItem('token');
};

const setStoredToken = (token) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', token);
  }
};

const removeStoredToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
  }
};

const initialState = {
  token: getStoredToken(),
  isAuthenticated: null,
  loading: true,
  user: null,
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
      };

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      setStoredToken(action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      removeStoredToken();
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    case UPDATE_AUTH_USER:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
      };
    default:
      return state;
  }
}
