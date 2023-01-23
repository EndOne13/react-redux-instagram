import React from 'react';
import './style.css'

const Comment = ({nickname, text}) => {
    return (
        <div className='cnCommentRoot'>
            <span className='cnCommentRootName'>{nickname}:</span>
            <span>{text}</span>
        </div>
    );
};

export default Comment;