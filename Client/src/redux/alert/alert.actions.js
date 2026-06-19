import {v4 as uuidv4} from 'uuid';
import {SET_ALERT, REMOVE_ALERT} from './alert.types';
import {sanitizeMessage, FRIENDLY_FALLBACK} from '../../utils/apiError';

const MAX_TOASTS = 4;
const DEFAULT_TIMEOUT = 5000;

export const removeAlert = (id) => ({
  type: REMOVE_ALERT,
  payload: id,
});

export const setAlert =
  (msg, alertType = 'info', timeout = DEFAULT_TIMEOUT) =>
  (dispatch, getState) => {
    const normalizedMsg = sanitizeMessage(msg, FRIENDLY_FALLBACK);
    const normalizedType = alertType || 'info';
    const {alert: alerts} = getState();

    const isDuplicate = alerts.some(
      (item) => item.msg === normalizedMsg && item.alertType === normalizedType
    );

    if (isDuplicate) {
      return;
    }

    const id = uuidv4();

    dispatch({
      type: SET_ALERT,
      payload: {msg: normalizedMsg, alertType: normalizedType, id},
    });

    if (timeout > 0) {
      setTimeout(() => dispatch(removeAlert(id)), timeout);
    }
  };
