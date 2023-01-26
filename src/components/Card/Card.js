import React from 'react';
import classNames from "classnames";

import './style.css'

const Card = ({ imgUrl, className, likes, comments, isLikeByYou, onLikeClick}) => {
    return (
        <div className={classNames('cnCardRoot', className)}>
            <img src={imgUrl} alt="image" className='cnCardImage'/>
            <div className='cnCardHover'/>
            <div className='cnCardIcons'>
                <i  className={classNames(`${isLikeByYou ? 'fa' : 'far'} fa-heart`, 'cnCardIcon')} onClick={onLikeClick}/>
                <span className='cnCardNumber cnCardLikes'>{likes}</span>
                <i className={classNames('far fa-comment', 'cnCardIcon')}/>
                <span className='cnCardNumber'>{comments}</span>
            </div>
        </div>
    );
};

export default Card;