import React from 'react';
import './style.css'
import Navbar from "../Navbar/Navbar";

const Layout = ({nickName, avatarUrl, id, children}) => {
    return (
        <div className='cnLayoutRoot'>
            <Navbar
                nickName={nickName}
                avatarUrl={avatarUrl}
                id={id}
            />
            <div className='cnLayoutBody'>
                {children}
            </div>
        </div>
    );
};

export default Layout;