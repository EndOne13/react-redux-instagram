import React, {useEffect, useState} from 'react';
import Layout from "../../components/Layout/Layout";
import {useDispatch, useSelector} from "react-redux";

import './style.css'
import UserBio from "../../components/UserBio/UserBio";
import Card from "../../components/Card/Card";
import {getPostsByUser, sendCommentOnUserPage, toggleLikeOnPost} from "../../redux/action/postsByUser";
import {useParams} from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import {Bars} from "react-loader-spinner";
import {getUser} from "../../redux/action/users";

const UserPage = () => {
    const dispatch = useDispatch()
    const authorizedUser = useSelector(state => state.users.authorizedUser)
    const isUserLoading = useSelector(state => state.users.isUserLoading)
    const isPostLoading = useSelector(state => state.postsByUser.isPostsLoading)
    const isMutateLoading = useSelector(state => state.photos.isMutateLoading)
    const user = useSelector(state => state.users.user)
    const posts = useSelector(state => state.postsByUser.posts)
    const {id} = useParams()

    const [postsForRender, setPostsForRender] = useState([])
    const [page, setPage] = useState(1)

    useEffect(() => {
        const newPost = [...posts]
        if (newPost.length) {
            setPostsForRender(newPost.splice(0, 12))
        }
    }, [posts])

    useEffect(() => {
        dispatch(getPostsByUser(id))
        dispatch(getUser(id))
    }, [id])

    const onLikeClick = (photoId) => {
        dispatch(toggleLikeOnPost(authorizedUser.id, photoId, id))
    }

    const onCommentSendClick = (photoId, comment) => {
        dispatch(sendCommentOnUserPage(authorizedUser.nickname, photoId, user.id, comment))
    }


    function nextHandler() {
        const newPost = [...posts]
        const offset = 12 * (page + 1)

        setPostsForRender([...postsForRender, ...newPost.splice(offset, offset + 12)])
        setPage(page + 1)
    }

    return (
        <Layout nickName={authorizedUser.nickname} id={authorizedUser.id} avatarUrl={authorizedUser.avatarUrl}>
            {
                isPostLoading || isUserLoading ? <div className="cnMainLoaderContainer">
                    <Bars color="#000BFF" height={80} width={80} />
                </div> : <div className='cnUserPageRoot'>
                    <UserBio
                        nickname={user.nickname}
                        avatarUrl={user.avatarUrl}
                        subscribers={user.subscribers.length}
                        subscribed={user.subscribed.length}
                        firstName={user.firstName}
                        lastName={user.lastName}
                        description={user.description}
                        url={user.url}
                        isMyPage={id == authorizedUser.id}
                        isSubscribed={user.subscribers.includes(authorizedUser.id)}
                    />

                    <div className='cnUserPageRootContent'>
                        {postsForRender.length ? <InfiniteScroll
                            next={nextHandler}
                            hasMore={postsForRender.length < posts.length}
                            loader={
                                <div className="cnMainLoaderContainer">
                                    <Bars color="#000BFF" height={25} width={25}/>
                                </div>
                            }
                            dataLength={postsForRender.length}
                            className='cnUserPageScroll'
                        >
                            {postsForRender.map(({comments, likes, imgUrl, id}) =>
                                <Card
                                    key={id}
                                    imgUrl={imgUrl}
                                    className='cnUserPageCard'
                                    likes={likes.length}
                                    comments={comments}
                                    isLikeByYou={likes.includes(authorizedUser.id)}
                                    onLikeClick={() => onLikeClick(id)}
                                    userData={{
                                        userName: user.nickname,
                                        avatarUrl: user.avatarUrl,
                                        userId: user.id
                                    }}
                                    onCommentSubmit={(comment) => onCommentSendClick(id, comment)}
                                    isMutateLoading={isMutateLoading}
                                />)
                            }
                        </InfiniteScroll> : <p className='cnUserPageNotPost'>User not have posts!</p>}
                    </div>
                </div>
            }
        </Layout>
    );
};

export default UserPage;