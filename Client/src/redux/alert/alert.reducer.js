import {SET_ALERT, REMOVE_ALERT} from './alert.types';

const MAX_TOASTS = 4;
const InitialState = [];

export default function alert(state = InitialState, action) {
  switch (action.type) {
    case SET_ALERT: {
      const next = [...state, action.payload];
      return next.length > MAX_TOASTS ? next.slice(-MAX_TOASTS) : next;
    }
    case REMOVE_ALERT:
      return state.filter((item) => item.id !== action.payload);
    default:
      return state;
  }
}
