import { setAlert } from "../alert/alert.actions";
import {
  GET_ANSWERS,
  ANSWER_ERROR,
  ADD_ANSWER,
  DELETE_ANSWER,
} from "./answers.types";
import { allAnswersData, createSingleAnswer, deleteSingleAnswer } from '../../services/api/answersApi';
import getApiError from "../../utils/apiError";

export const getAnswers = (id) => async (dispatch) => {
  try {
    const res = await allAnswersData(id);

    dispatch({
      type: GET_ANSWERS,
      payload: res.data.data,
    });
  } catch (err) {
    const error = getApiError(err, "Unable to load answers");

    dispatch({
      type: ANSWER_ERROR,
      payload: { msg: error.statusText, status: error.status },
    });
  }
};

// Add Answer
export const addAnswer = (postId, formData) => async (dispatch) => {
  try {
    const res = await createSingleAnswer(postId, formData);

    dispatch({
      type: ADD_ANSWER,
      payload: res.data.data,
    });

    dispatch(setAlert(res.data.message || 'Answer posted successfully.', 'success'));

    dispatch(getAnswers(postId));
    return {success: true};
  } catch (err) {
    const error = getApiError(err, 'Unable to post your answer. Please try again.');

    dispatch(setAlert(error.message, 'danger'));

    dispatch({
      type: ANSWER_ERROR,
      payload: { msg: error.statusText, status: error.status },
    });
    return {success: false};
  }
};

// Delete Answer
export const deleteAnswer = (AnswerId) => async (dispatch) => {
  try {
    const res = await deleteSingleAnswer(AnswerId);

    dispatch({
      type: DELETE_ANSWER,
      payload: AnswerId,
    });

    dispatch(setAlert(res.data.message || 'Answer deleted successfully.', 'success'));
  } catch (err) {
    const error = getApiError(err, 'Unable to delete this answer. Please try again.');

    dispatch(setAlert(error.message, "danger"));

    dispatch({
      type: ANSWER_ERROR,
      payload: { msg: error.statusText, status: error.status },
    });
  }
};
