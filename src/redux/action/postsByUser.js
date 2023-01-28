import {getPostsFailed, getPostsStarted, getPostsSuccess} from "../actionCreators/postsByUser";
import {api} from "../../api/api";
import {getPhotoFromState, getUpdatedPhotoFromState, getUserPagePostData} from "../../utils/utils";
import {getPhotosSuccess, mutatePhotosFailed, mutatePhotosStarted, mutatePhotosSuccess} from "../actionCreators/photos";

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
        try {
            const posts = getState().postsByUser.posts;
            const { postForEdit, newPosts } = getUserPagePostData(posts, postId);

            if (postForEdit.likes.includes(userId)) {
                postForEdit.likes = postForEdit.likes.filter(like => like !== userId);
            } else {
                postForEdit.likes.push(userId);
            }

            const response = await api.postsByUser.mutatePosts({
                url: `/${postAuthorId}`,
                data: {
                    id: postAuthorId,
                    posts: newPosts
                }
            });

            dispatch(getPostsSuccess([...response.data.posts]));
        } catch (error) {
            console.log(error);
        }
    };
};

export const sendCommentOnUserPage = (nickname, postId, postAuthorId, text) => {
    return async (dispatch, getState) => {
        dispatch(mutatePhotosStarted())
        const posts = getState().postsByUser.posts
        const {postForEdit, newPosts} = getUserPagePostData(posts, postId)

        postForEdit.comments.push({nickname, text})

        try {
            const response =  await api.postsByUser.mutatePosts({
                url: `/${postAuthorId}`,
                data: {
                    id: postAuthorId,
                    posts: newPosts
                }
            })

            dispatch(getPhotosSuccess([...response.data.posts]))
            dispatch(mutatePhotosSuccess())
        } catch (error) {
            dispatch(mutatePhotosFailed(error));
        }
    }
}