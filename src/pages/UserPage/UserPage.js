import React from 'react';
import Layout from "../../components/Layout/Layout";
import {useSelector} from "react-redux";

import './style.css'
import UserBio from "../../components/UserBio/UserBio";

const UserPage = () => {
    const authorizedUser = useSelector(state => state.users.authorizedUser)


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
            </div>
        </Layout>
    );
};

export default UserPage;