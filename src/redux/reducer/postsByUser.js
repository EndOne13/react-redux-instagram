import {GET_POSTS_FAILED, GET_POSTS_STARTED, GET_POSTS_SUCCESS} from "../actionCreators/postsByUser";

const initialState = {
    posts: [],
    isPostsLoading: false
}

export const postsByUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_POSTS_STARTED:
            return {
                ...state,
                isPostsLoading: true
            }
        case GET_POSTS_SUCCESS:
            return {
                ...state,
                posts: action.payload,
                isPostsLoading: false
            }
        case GET_POSTS_FAILED:
            return {
                ...state,
                isPostsLoading: false
            }
        default: {
            return {
                ...state
            }
        }
    }
}