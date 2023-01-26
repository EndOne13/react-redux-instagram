import React, {useEffect, useState} from 'react';
import Layout from "../../components/Layout/Layout";
import DetailedCard from "../../components/DetailedCard/DetailedCard";
import {useDispatch, useSelector} from "react-redux";
import {getPhotos, sendComment, toggleLike} from "../../redux/action/photos";
import InfiniteScroll from "react-infinite-scroll-component";

import './style.css'
import {Bars} from "react-loader-spinner";

const MainPage = () => {
    const [page, setPage] = useState(1)
    const photos = useSelector(state => state.photos.photos)
    const loading = useSelector(state => state.photos.isPhotosLoading)
    const total = useSelector(state => state.photos.totalPhotos)
    const authorizedUser = useSelector(state => state.users.authorizedUser)
    const isMutateLoading = useSelector(state => state.photos.isMutateLoading)
    const dispatch = useDispatch()

    console.log(photos)
    console.log(loading)

    useEffect(() => {
        dispatch(getPhotos(page))
    }, [page])

    const nextHandler = () => {
        setPage(page + 1)
    }

    const onLikeClick = (photoId) => {
        dispatch(toggleLike(authorizedUser.id, photoId))
    }

    const onCommentSendClick = (photoId, comment) => {
        dispatch(sendComment(authorizedUser.nickname, photoId, comment))
    }

    return (

        <Layout nickName={authorizedUser.nickname} id={authorizedUser.id} avatarUrl={authorizedUser.avatarUrl}>
            <div className='cnMainPageRoot'>
                {loading ? (<div className="cnMainLoaderContainer">
                    <Bars color="#000BFF" height={80} width={80}/>
                </div>) : <InfiniteScroll
                    dataLength={photos.length}
                    next={nextHandler}
                    hasMore={photos.length < total}
                    loader={<div className="cnMainLoaderContainer">
                        <Bars color="#000BFF" height={25} width={25}/>
                    </div>}
                >
                    {photos.map(({author, imgUrl, id, likes, comments}) => (<DetailedCard
                        key={id}
                        id={id}
                        className='cnMainPageCard'
                        userName={author.nickname}
                        avatarUrl={author.avatarUrl}
                        userId={author.id}
                        imgUrl={imgUrl}
                        likes={likes.length}
                        isLikeByYou={likes.includes(authorizedUser.id)}
                        comments={comments}
                        onLikeClick={onLikeClick}
                        onCommentSendClick={onCommentSendClick}
                        isMutateLoading={isMutateLoading}
                    />))}
                </InfiniteScroll>}
            </div>
        </Layout>);
};

export default MainPage;