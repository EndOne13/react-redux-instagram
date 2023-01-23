import React, {useState} from 'react';
import './style.css'
import UserBadge from "../UserBadge/UserBadge";
import Comment from "../Comment/Comment";
import cn from "classnames";
import {nanoid} from "nanoid";

const DetailedCard = ({userName, avatarUrl, userId, imgUrl, likes,isLikeByYou, comments, className}) => {

    const [isCommentsShown, setIsCommentsShown] = useState(false)
    console.log(userName)
    const renderComments = () => {
        if(comments.length > 2 && !isCommentsShown) {
            const commentsCopy = [...comments]
            const commentsForRender = commentsCopy.splice(comments.length - 2, 2)

            return (
                <>
                    <span className='cnDetailedCardCommentTitle' onClick={() => setIsCommentsShown(true)}>{`Показать еще ${comments.length - commentsForRender.length} комментариев`}</span>
                    {commentsForRender.map(comment => <Comment {...comment} key={nanoid()}/>)}
                </>
            )
        }

        return  comments.map(comment => <Comment{...comment} />)

    }


    return (
        <div className={cn('cnDetailedCardRoot', className)}>
            <div className='cnDetailedCardHeader'>
                <UserBadge
                    nickName={userName}
                    avatarUrl={avatarUrl}
                    id={userId}
                />
            </div>
            <div>
                <img src={imgUrl} alt="img" className='cnDetailedCardImg'/>
            </div>
            <div className='cnDetailedCardButtons'>
                <i className={`${isLikeByYou ? 'fa-solid' : 'fa-regular'} fa-heart cnDetailedCardIconLike`}/>
                <i className="fa-solid fa-comment cnDetailedCardIconComment" />
            </div>
            <div className='cnDetailedCardLikes'>
                {`Оценили ${likes} человек`}
            </div>
            <div className='cnDetailedCardComments'>
                {renderComments()}
            </div>
            <textarea className='cnDetailedCardTextArea' />
        </div>
    );
};

export default DetailedCard;