import React from 'react';
import './style.css'
import UserBadge from "../UserBadge/UserBadge";

const Navbar = ({nickName, avatarUrl, id}) => {
    return (
        <div className='cnNavbarRoot'>
            <div className='cnNavbarWrapper'>
                <span>Rugram</span>
                <UserBadge
                    nickName={nickName}
                    avatarUrl={avatarUrl}
                    id={id}
                />
            </div>
        </div>
    );
};

export default Navbar;