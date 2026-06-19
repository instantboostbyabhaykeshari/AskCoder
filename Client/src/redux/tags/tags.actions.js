import {setAlert} from '../alert/alert.actions';
import {GET_TAG, GET_TAGS, TAG_ERROR} from './tags.types';
import { allTagsData, singleTagData } from '../../services/api/tagsApi';
import getApiError from '../../utils/apiError';

export const getTag = (tagName) => async (dispatch) => {
  try {
    const res = await singleTagData(tagName);

    dispatch({
      type: GET_TAG,
      payload: res.data.data,
    });
  } catch (err) {
    const error = getApiError(err, 'Unable to load tag');

    dispatch(setAlert(error.message, 'danger'));

    dispatch({
      type: TAG_ERROR,
      payload: {msg: error.statusText, status: error.status},
    });
  }
};

export const getTags = () => async (dispatch) => {
  try {
    const res = await allTagsData();

    dispatch({
      type: GET_TAGS,
      payload: res.data.data,
    });
  } catch (err) {
    const error = getApiError(err, 'Unable to load tags');

    dispatch(setAlert(error.message, 'danger'));

    dispatch({
      type: TAG_ERROR,
      payload: {msg: error.statusText, status: error.status},
    });
  }
};
