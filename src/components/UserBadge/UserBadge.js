import React from 'react';
import './style.css'
import {useNavigate} from "react-router-dom";


const UserBadge = ({nickName, avatarUrl, id}) => {
    const navigate = useNavigate()

    console.log(nickName)
    const onUserBadgeClick = () => {
        navigate(`/${id}`)
    }

    return (
        <div className='cnUserBadgeRoot' onClick={onUserBadgeClick}>
            {avatarUrl ? <img src={avatarUrl} alt="logo" className='cnUserBadgeAvatar'/> : <div className='cnUserBadgePlaceholder'/>}
            <span className='cnUserBadgeName'>{nickName}</span>
        </div>
    );
};

export default UserBadge;