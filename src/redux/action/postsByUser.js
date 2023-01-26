import {getPostsFailed, getPostsStarted, getPostsSuccess} from "../actionCreators/postsByUser";
import {api} from "../../api/api";
import {getPhotoFromState} from "../../utils/utils";

export const getPostsByUser = (userId) => {
    return async (dispatch) => {
        try {
            dispatch(getPostsStarted())

            const response = await api.postsByUser.getPostsByUser({
                url: `/${userId}`
            })

            dispatch(getPostsSuccess(response.data.posts))
        } catch (error) {
            dispatch(getPostsFailed(error))
        }
    }
}


export const toggleLikeOnPost = (userId, postId, postAuthorId) => {
    return async (dispatch, getState) => {
        const posts = getState().postsByUser.posts

        const newPosts = [...posts]
        const newPostIndex = posts.findIndex(post => post.id === postId)
        const postForEdit = newPosts[newPostIndex]

        if (postForEdit.likes.includes(userId)) {
            postForEdit.likes = postForEdit.likes.filter(like => like !== userId)
        } else {
            postForEdit.likes.push(userId)
        }

        await api.postsByUser.mutatePosts({
            url: `/${postAuthorId}`,
            data: {
                id: postAuthorId,
                posts: newPosts
            }
        })
        dispatch(getPostsSuccess(newPosts))
    }
}