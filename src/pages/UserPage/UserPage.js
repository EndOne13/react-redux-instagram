import React from 'react';
import Layout from "../../components/Layout/Layout";
import {useDispatch, useSelector} from "react-redux";

import './style.css'
import UserBio from "../../components/UserBio/UserBio";
import Card from "../../components/Card/Card";
import {toggleLike} from "../../redux/action/photos";

const UserPage = () => {
    const authorizedUser = useSelector(state => state.users.authorizedUser)
    const dispatch = useDispatch()

    const onLikeClick = (photoId) => {
        dispatch(toggleLike(authorizedUser.id, photoId))
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
                    <Card imgUrl='' className='cnUserPageCard' likes={10} comments={5} isLikeByYou={true} onLikeClick={() => onLikeClick('')}/>
                    <Card imgUrl='' className='cnUserPageCard' likes={10} comments={5} isLikeByYou={false}/>
                    <Card imgUrl='' className='cnUserPageCard' likes={10} comments={5} isLikeByYou={false}/>
                </div>
            </div>
        </Layout>
    );
};

export default UserPage;