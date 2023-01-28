import React, {useEffect} from 'react';
import Modal from 'react-modal'
import UserBadge from "../UserBadge/UserBadge";

import './style.css'
import Comment from "../Comment/Comment";
import TextArea from "../TextArea/TextArea";
import {nanoid} from "nanoid";

const PhotoModal = ({
                        commentValue,
                        setCommentValue,
                        onCommentSubmit,
                        isCommentLoading,
                        isOpen,
                        onClose,
                        imgUrl,
                        userName,
                        avatarUrl,
                        userId,
                        comments,
                        isLikeByYou,
                        onLikeClick
                    }) => {

    useEffect(() => {
        const body = document.querySelector('body')

        if (isOpen) {
            body.classList.add('cnBodyOverflow')
        } else {
            body.classList.remove('cnBodyOverflow')
        }
    }, [isOpen])

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            className='cnModal'
            overlayClassName='cnModalOverlay'
            ariaHideApp={false}
        >
            <div className='cnModalRoot'>
                <div className='cnModalWrapper'>
                    <img src={imgUrl} alt="img" className='cnModalImg'/>
                </div>
                <div className='cnModalCommentsBlock'>
                    <div>
                        <div className='cnModalHeader'>
                            <UserBadge nickName={userName} avatarUrl={avatarUrl} id={userId}/>
                        </div>

                        <div className='cnModalComments'>
                            {comments.map(comments => <Comment {...comments} key={nanoid()}/>)}
                        </div>
                    </div>

                    <div>
                        <div className='cnModalIcons'>
                            <i onClick={onLikeClick} className={`${isLikeByYou ? 'fa' : 'far'} fa-heart cnModalLikeIcon`}/>
                        </div>

                        <TextArea
                            value={commentValue}
                            onChange={setCommentValue}
                            placeholder='Введите комментарий'
                            buttonText='Отправить'
                            onSubmit={onCommentSubmit}
                            isLoading={isCommentLoading}
                        />
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default PhotoModal;


