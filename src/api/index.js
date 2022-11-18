import axios from 'axios'
 
const API = axios.create({baseURL: 'https://blogheaven.herokuapp.com/'})

API.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile')){
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}` 
    }
    return req
})

export const fetchBlog = (id) => API.get(`/blogs/${id}`)
export const fetchBlogs = (page) => API.get(`/blogs?page=${page}`)
export const createBlog = (newBlog) => API.post('/blogs', newBlog)
export const updateBlog = (id, updatedBlog) => API.patch(`${'/blogs'}/${id}`, updatedBlog)
export const deleteBlog = (id) => API.delete(`${'/blogs'}/${id}`)
export const likeBlog = (id) => API.patch(`${'/blogs'}/${id}/likeBlog`)

export const signin = (formData) => API.post('/user/signin', formData);
export const signup = (formData) => API.post('/user/signup', formData);