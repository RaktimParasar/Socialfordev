import api from '../utils/api';
import { 
    GET_POSTS, 
    GET_POST, 
    POST_ERROR, 
    UPDATE_LIKES, 
    DELETE_POST, 
    ADD_POST,
    ADD_COMMENT,
    REMOVE_COMMENT} from './types';
import { setAlert } from './alert';

//Get posts
export const getPosts = () => async dispatch => {
    try {
        const res = await api.get('/posts');

        dispatch({
            type: GET_POSTS,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        });
    }
};

//Add Like
export const addLike = id => async dispatch => {
    try {
        const res = await api.put(`/posts/like/${id}`);

        dispatch({
            type: UPDATE_LIKES,
            payload: { id, likes: res.data}
        });
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        });
    }
};

//Remove likes
export const removeLike = id => async dispatch => {
    try {
        const res = await api.put(`/posts/unlike/${id}`);

        dispatch({
            type: UPDATE_LIKES,
            payload: { id, likes: res.data}
        });
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        });
    }
};

//Delete post
export const deletePost = id => async dispatch => {
    try {
        await api.delete(`/posts/${id}`);

        dispatch({
            type: DELETE_POST,
            payload: id
        });

        dispatch(setAlert('Post Removed', 'success'));
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        });
    }
};

//Add post
export const addPost = formData => async dispatch => {

    try {   
        const res = await api.post('/posts', formData);

        dispatch({
            type: ADD_POST,
            payload: res.data
        });

        dispatch(setAlert('Post Created', 'success'));
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        });
    }
};

//Get single post
export const getPost = id => async dispatch => {
    try {
        const res = await api.get(`/posts/${id}`);

        dispatch({
            type: GET_POST,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        });
    }
};

//Add comment
export const addComment = (postId, formData) => async dispatch => {

    try {
        const res = await api.post(
        `/posts/comment/${postId}`,
        formData,
    );

    dispatch({
        type: ADD_COMMENT,
        payload: res.data
    });

    dispatch(setAlert('Comment Added', 'success'));
    } catch (err) {
        dispatch({
        type: POST_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
    });
    }
};


//Remove comment
export const deleteComment = (postId, commentId) => async dispatch => {
    try {
        await api.delete(`/posts/comment/${postId}/${commentId}`);

        dispatch({ 
            type: REMOVE_COMMENT,
            payload: commentId
        });

        dispatch(setAlert('Comment Removed', 'success'));
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        });
    }
};