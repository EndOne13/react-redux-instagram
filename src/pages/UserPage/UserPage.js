import React, {useEffect} from 'react';
import Layout from "../../components/Layout/Layout";
import {useDispatch, useSelector} from "react-redux";

import './style.css'
import UserBio from "../../components/UserBio/UserBio";
import Card from "../../components/Card/Card";
import {getPostsByUser, toggleLikeOnPost} from "../../redux/action/postsByUser";
import {useParams} from "react-router-dom";

const UserPage = () => {
    const dispatch = useDispatch()
    const authorizedUser = useSelector(state => state.users.authorizedUser)
    const posts = useSelector(state => state.postsByUser.posts)
    const params = useParams()

    useEffect(() => {
        dispatch(getPostsByUser(params.id))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const onLikeClick = (photoId) => {
        dispatch(toggleLikeOnPost(authorizedUser.id, photoId, params.id))
    }

    return (
        <Layout nickName={authorizedUser.nickname} id={authorizedUser.id} avatarUrl={authorizedUser.avatarUrl}>
            <div className='cnUserPageRoot'>
                <UserBio
                    nickname={authorizedUser.nickname}
                    avatarUrl={authorizedUser.avatarUrl}
                    subscribers={authorizedUser.subscribers.length}
                    subscribed={authorizedUser.subscribed.length}
                    firstName={authorizedUser.firstName}
                    lastName={authorizedUser.lastName}
                    description={authorizedUser.description}
                    url={authorizedUser.url}
                />

                <div className='cnUserPageRootContent'>
                    {posts.map(({comments, likes, imgUrl, id}) =>
                        <Card
                            imgUrl={imgUrl}
                            className='cnUserPageCard'
                            likes={likes.length}
                            comments={comments.length}
                            isLikeByYou={likes.includes(authorizedUser.id)}
                            onLikeClick={() => onLikeClick(id)}
                        />)}
                </div>
            </div>
        </Layout>
    );
};

export default UserPage;