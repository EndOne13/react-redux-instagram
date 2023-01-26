import {combineReducers} from "redux";
import {photosReducer} from "./photos";
import {usersReducer} from "./users";
import {postsByUserReducer} from "./postsByUser";


export const rootReducer = combineReducers({
    photos: photosReducer,
    users: usersReducer,
    postsByUser: postsByUserReducer
})