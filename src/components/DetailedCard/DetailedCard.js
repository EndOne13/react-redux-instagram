import React, {useState} from 'react';
import './style.css'
import UserBadge from "../UserBadge/UserBadge";
import Comment from "../Comment/Comment";
import cn from "classnames";
import {nanoid} from "nanoid";
import PhotoModal from "../PhotoModal/PhotoModal";
import TextArea from "../TextArea/TextArea";

const DetailedCard = ({
                          userName,
                          avatarUrl,
                          userId,
                          imgUrl,
                          likes,
                          isLikeByYou,
                          comments,
                          className,
                          onLikeClick,
                          id,
                          onCommentSendClick,
                          isMutateLoading
}) => {

    const [isCommentsShown, setIsCommentsShown] = useState(false)
    const [comment, setComment] = useState('')
    const [isModalVisible, setIsModalVisible] = useState(false)

    const handleSendCommentClick = () => {
        if (comment) {
            onCommentSendClick(id, comment)
            setComment('')
        }
    }

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

        return  comments.map(comment => <Comment{...comment} key={Math.random()}/>)

    }

    const onCloseModal = () => {
        setComment('')
        setIsModalVisible(false)
    }

    const onOpenModal = () => {
        setComment('')
        setIsModalVisible(true)
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
                <i className={`${isLikeByYou ? 'fa-solid' : 'fa-regular'} fa-heart cnDetailedCardIconLike`} onClick={() => onLikeClick(id)}/>
                <i className="fa-solid fa-comment cnDetailedCardIconComment" onClick={onOpenModal}/>
            </div>
            <div className='cnDetailedCardLikes'>
                {`Оценили ${likes} человек`}
            </div>
            <div className='cnDetailedCardComments'>
                {renderComments()}
            </div>
               <TextArea
                   value={comment}
                   onChange={setComment}
                   placeholder='Введите комментарий'
                   isLoading={isMutateLoading}
                   onSubmit={handleSendCommentClick}
                   buttonText='Отправить'
               />
            <PhotoModal
                imgUrl={imgUrl}
                isOpen={isModalVisible}
                onClose={onCloseModal}
                comments={comments}
                userName={userName}
                avatarUrl={avatarUrl}
                userId={userId}
                commentValue={comment}
                setCommentValue={setComment}
                onCommentSubmit={handleSendCommentClick}
                isCommentLoading={isMutateLoading}
                isLikeByYou={isLikeByYou}
                onLikeClick={() => onLikeClick(id)}
            />
        </div>
    );
};

export default DetailedCard;