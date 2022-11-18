import * as api from "../api";
import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE, FETCH_POST } from "../constants/actionTypes";

export const getBlogs = (page) => async (dispatch) => {
  try {
    const { data } = await api.fetchBlogs(page);
    console.log(data)
    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const getBlog = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchBlog(id);
    console.log(data)
    dispatch({ type: FETCH_POST, payload: data });
  } catch (error) {
    console.log(error);
  }
}
export const createBlog = (blog) => async(dispatch) => {
  try {
    const { data } = await api.createBlog(blog);
    dispatch({ type: CREATE, payload: data.blogPosts });
  } catch (error) {
    console.log(error);
  }
};
export const updateBlog = (id, blog) => async (dispatch) => {
  try {
    const { data } = await api.updateBlog(id, blog);
    dispatch({ type: UPDATE, payload: data.blogPosts });
  } catch (error) {
    console.log(error.message);
  }
};
export const deleteBlog = (id) => async (dispatch) => {
  try {
    await api.deleteBlog(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const likeBlog = (id) => async(dispatch) => {
    try {
      const { data } = api.likeBlog(id);
      console.log(data)
      dispatch({type: LIKE, payload: data})
    } catch (error) {
      console.log(error)
    }
  }
