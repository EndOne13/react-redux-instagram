import React from 'react';
import UserCounter from "../UserCounter/UserCounter";

import './style.css'


const UserBio = ({ avatarUrl, nickname, subscribers, subscribed, firstName, lastName, description, url}) => {
    return (
        <div className='cnUserBioRoot'>
            <div>
                <img className='cnUserBioAvatar' src={avatarUrl} alt="avatar"/>
            </div>
            <div className='cnUserBioInfo'>
                <div className='cnUserBioRow'>
                    <span className='cnUserBioNickname'>{nickname}</span>
                </div>
                <div className='cnUserBioRow'>
                        <UserCounter count={5} text='Публикацей' className='cnUserBioCounter'/>
                        <UserCounter count={subscribers} text='Подписчиков' className='cnUserBioCounter'/>
                        <UserCounter count={subscribed} text='Подписок'/>
                </div>
                <div className='cnUserBioRow'>
                    <span className='cnUserBioName'>{firstName} {lastName}</span>
                </div>
                <div className='cnUserBioRow'>
                    <span >{description}</span>
                </div>
                <a href="">{url}</a>
            </div>
        </div>
    );
};

export default UserBio;