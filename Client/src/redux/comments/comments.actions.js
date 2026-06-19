import { setAlert } from "../alert/alert.actions";
import {
  GET_COMMENTS,
  COMMENT_ERROR,
  ADD_COMMENT,
  DELETE_COMMENT,
} from "./comments.types";
import { allCommentsData, createSingleComment, deleteSingleComment } from '../../services/api/commentsApi';
import getApiError from "../../utils/apiError";

export const getComments = (id) => async (dispatch) => {
  try {
    const res = await allCommentsData(id);

    dispatch({
      type: GET_COMMENTS,
      payload: res.data.data,
    });
  } catch (err) {
    const error = getApiError(err, "Unable to load comments");

    dispatch({
      type: COMMENT_ERROR,
      payload: { msg: error.statusText, status: error.status },
    });
  }
};

// Add COMMENT
export const addComment = (postId, formData) => async (dispatch) => {
  try {
    const res = await createSingleComment(postId, formData);

    dispatch({
      type: ADD_COMMENT,
      payload: res.data.data,
    });

    dispatch(setAlert(res.data.message || 'Comment added successfully.', 'success'));

    dispatch(getComments(postId));
    return {success: true};
  } catch (err) {
    const error = getApiError(err, 'Unable to add your comment. Please try again.');

    dispatch(setAlert(error.message, 'danger'));

    dispatch({
      type: COMMENT_ERROR,
      payload: { msg: error.statusText, status: error.status },
    });
    return {success: false};
  }
};

// Delete Comment
export const deleteComment = (CommentId) => async (dispatch) => {
  try {
    const res = await deleteSingleComment(CommentId);

    dispatch({
      type: DELETE_COMMENT,
      payload: CommentId,
    });

    dispatch(setAlert(res.data.message || 'Comment deleted successfully.', 'success'));
  } catch (err) {
    const error = getApiError(err, 'Unable to delete this comment. Please try again.');

    dispatch(setAlert(error.message, "danger"));

    dispatch({
      type: COMMENT_ERROR,
      payload: { msg: error.statusText, status: error.status },
    });
  }
};
