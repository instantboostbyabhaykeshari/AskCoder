import {GET_USERS, GET_USER, UPDATE_USER, USER_ERROR} from './users.types';
import { usersData, profileData, updateProfileData } from '../../services/api/usersApi';
import getApiError from '../../utils/apiError';
import { setAlert } from '../alert/alert.actions';
import { UPDATE_AUTH_USER } from '../auth/auth.types';

// Get users
export const getUsers = () => async (dispatch) => {
  try {
    const res = await usersData();
    dispatch({
      type: GET_USERS,
      payload: res.data.data,
    });
  } catch (err) {
    const error = getApiError(err, 'Unable to load users');

    dispatch({
      type: USER_ERROR,
      payload: {msg: error.statusText, status: error.status},
    });
  }
};

// Get user
export const getProfile = (id) => async (dispatch) => {
  try {
    const res = await profileData(id);

    dispatch({
      type: GET_USER,
      payload: res.data.data,
    });
  } catch (err) {
    const error = getApiError(err, 'Unable to load profile');

    dispatch({
      type: USER_ERROR,
      payload: {msg: error.statusText, status: error.status},
    });
  }
};

export const updateProfile = (id, formData) => async (dispatch) => {
  try {
    const res = await updateProfileData(id, formData);

    dispatch({
      type: UPDATE_USER,
      payload: res.data.data,
    });

    dispatch({
      type: UPDATE_AUTH_USER,
      payload: {
        username: res.data.data.username,
        gravatar: res.data.data.gravatar,
      },
    });

    dispatch(setAlert(res.data.message || 'Profile updated successfully.', 'success'));

    return { success: true };
  } catch (err) {
    const error = getApiError(err, 'Unable to update profile. Please try again.');

    dispatch(setAlert(error.message, 'danger'));

    return { success: false };
  }
};
