import React, {useState} from 'react';
import classNames from "classnames";

import './style.css'
import PhotoModal from "../PhotoModal/PhotoModal";

const Card = ({ imgUrl, className, likes, comments, isLikeByYou, onLikeClick, userData, onCommentSubmit, id, isMutateLoading }) => {
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [comment, setComment] = useState('')


    return (
        <div className={classNames('cnCardRoot', className)}>
            <img src={imgUrl} alt="image" className='cnCardImage'/>
            <div className='cnCardHover'/>
            <div className='cnCardIcons'>
                <i  className={classNames(`${isLikeByYou ? 'fa' : 'far'} fa-heart`, 'cnCardIcon')} onClick={onLikeClick}/>
                <span className='cnCardNumber cnCardLikes'>{likes}</span>
                <i className={classNames('far fa-comment', 'cnCardIcon')} onClick={() => setIsModalVisible(true)}/>
                <span className='cnCardNumber'>{comments.length}</span>
            </div>
            <PhotoModal
                imgUrl={imgUrl}
                isOpen={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                comments={comments}
                {...userData}
                commentValue={comment}
                setCommentValue={setComment}
                onCommentSubmit={() => onCommentSubmit(comment)}
                isCommentLoading={isMutateLoading}
                isLikeByYou={isLikeByYou}
                onLikeClick={() => onLikeClick(id)}
            />
        </div>
    );
};

export default Card;