import {getPhotosFailed, getPhotosStarted, getPhotosSuccess, setPhotosTotal} from "../actionCreators/photos";
import {api} from "../../api/api";

export const getPhotos = (page = 0) => {
    return async (dispatch,getState) => {
        try {
            const store = getState()
            console.log(store.photos.photos)
            dispatch(getPhotosStarted)
            const response = await api.photos.getPhotos({
                params: {
                    _page: page,
                    _limit: 5
                }
            })
            console.log(response.headers['x-total-count'])
            dispatch(setPhotosTotal(response.headers['x-total-count']))
            dispatch(getPhotosSuccess([...store.photos.photos, ...response.data]))
        } catch (error) {
            dispatch(getPhotosFailed(error))
        }
    }
}