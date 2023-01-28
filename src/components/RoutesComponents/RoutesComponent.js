import React, {useEffect} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainPage from "../../pages/MainPage/MainPage";
import UserPage from "../../pages/UserPage/UserPage";
import NoAccessPage from "../../pages/NoAccessPage/NoAccessPage";
import {useDispatch, useSelector} from "react-redux";
import {getAuthorizedUser} from "../../redux/action/users";
import {Bars} from "react-loader-spinner";

import './style.css'

const authorizedRoutes = [
    {path: '/', element: <MainPage />, exact: true},
    {path: '/:id', element: <UserPage />, exact: true}
]

const RoutesComponent = () => {
    const dispatch = useDispatch()
    const authorizedUser = useSelector(state => state.users.authorizedUser)
    const isLoading = useSelector(state => state.users.isAuthorizedUserLoading)


    useEffect(() => {
        dispatch(getAuthorizedUser())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if(isLoading) {
        return (
            <div className='cnPageRoutesLoader'>
                <Bars  color='#000BFF' width={80} height={80}/>
            </div>
        )
    }

    return (
        <BrowserRouter>
            <Routes>
                {
                    authorizedUser ? authorizedRoutes.map((route) => <Route {...route} key={route.path}/>) : <Route path='/' element={<NoAccessPage />} exact/>
                }
            </Routes>
        </BrowserRouter>
    );
};

export default RoutesComponent;