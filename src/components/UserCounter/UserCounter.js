import React from 'react';

import './style.css'

const UserCounter = ({text, count, className}) => {
    return (
        <div>
            <div className={className}>
                <span className='cnUserCounterCount'>{count}</span>
                <span className='cnUserCounterText'>{text}</span>
            </div>
        </div>
    );
};

export default UserCounter;