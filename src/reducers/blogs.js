import {FETCH_ALL, LIKE, UPDATE, DELETE, CREATE, FETCH_POST} from '.././constants/actionTypes'

export default (state = [], action) => {
    switch (action.type) {
        case FETCH_ALL:
            return {
                ...state,
                blogs: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages
            }
        case CREATE:
            return {...state, blogs:action.payload}
        case LIKE:
        case UPDATE:
            return state.map((post)=>post.id._id === action.payload.id ? action.payload: post)
        case DELETE:
            return state.filter((post)=> post.id._id !== action.payload._id ? action.payload: post)
        case FETCH_POST:
            return {...state, blog:action.payload}
        default:
             return state;
    }
}