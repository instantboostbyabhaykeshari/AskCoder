import { setAlert } from "../alert/alert.actions";
import {
  GET_POSTS,
  GET_POST,
  GET_TAG_POSTS,
  POST_ERROR,
  DELETE_POST,
  ADD_POST,
} from "./posts.types";
import {
  allPostsData,
  singlePostData,
  allTagPostsData,
  createSinglePost,
  deleteSinglePost
} from '../../services/api/postsApi';
import getApiError from "../../utils/apiError";

// Get posts
export const getPosts = () => async (dispatch) => {
  try {
    const res = await allPostsData();

    dispatch({
      type: GET_POSTS,
      payload: res.data.data,
    });
  } catch (err) {
    const error = getApiError(err, "Unable to load posts");

    dispatch(setAlert(error.message, "danger"));

    dispatch({
      type: POST_ERROR,
      payload: { msg: error.statusText, status: error.status },
    });
  }
};

// Get post
export const getPost = (id) => async (dispatch) => {
  try {
    const res = await singlePostData(id);

    dispatch({
      type: GET_POST,
      payload: res.data.data,
    });
  } catch (err) {
    const error = getApiError(err, "Unable to load this question");

    dispatch(setAlert(error.message, "danger"));

    dispatch({
      type: POST_ERROR,
      payload: { msg: error.statusText, status: error.status },
    });
  }
};

//GET TAG POSTS
export const getTagPosts = (tagName) => async (dispatch) => {
  try {
    const res = await allTagPostsData(tagName);

    dispatch({
      type: GET_TAG_POSTS,
      payload: res.data.data,
    });
  } catch (err) {
    const error = getApiError(err, "Unable to load tag questions");

    dispatch(setAlert(error.message, "danger"));

    dispatch({
      type: POST_ERROR,
      payload: { msg: error.statusText, status: error.status },
    });
  }
};

// Add post
export const addPost = (formData) => async (dispatch) => {
  try {
    const res = await createSinglePost(formData);

    dispatch({
      type: ADD_POST,
      payload: res.data.data,
    });

    dispatch(setAlert(res.data.message || 'Question posted successfully.', 'success'));

    dispatch(getPosts());
    return {success: true};
  } catch (err) {
    const error = getApiError(err, 'Unable to post your question. Please try again.');

    dispatch(setAlert(error.message, 'danger'));

    dispatch({
      type: POST_ERROR,
      payload: { msg: error.statusText, status: error.status },
    });
    return {success: false};
  }
};

// Delete post
export const deletePost = (id) => async (dispatch) => {
  try {
    const res = await deleteSinglePost(id);

    dispatch({
      type: DELETE_POST,
      payload: id,
    });

    dispatch(setAlert(res.data.message || 'Question deleted successfully.', 'success'));
  } catch (err) {
    const error = getApiError(err, 'Unable to delete this question. Please try again.');

    dispatch(setAlert(error.message, "danger"));

    dispatch({
      type: POST_ERROR,
      payload: { msg: error.statusText, status: error.status },
    });
  }
};
