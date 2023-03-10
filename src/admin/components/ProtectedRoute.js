/* eslint-disable prettier/prettier */
import { message } from 'antd';
import React, { useEffect, } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { HideLoading, ShowLoading } from 'src/redux/alertsSlice';
import { SetUser } from 'src/redux/usersSlice';
import { validateTokenFunction } from 'src/services/login.service';
import DefaultLayout from '../pages/DefaultLayout';



const ProtectedRoute = ({ children }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector(state => state.users);

    const validateToken = async () => {
        dispatch(ShowLoading())
        const response = await validateTokenFunction()
        dispatch(HideLoading())
        if (response.data.success) {
            dispatch(SetUser(response.data.data))
        } else {
            localStorage.removeItem("token")
            message.error(response.data.message)
            dispatch(HideLoading())
            navigate("/login");
        }
    }

    useEffect(() => {
        if (localStorage.getItem("token")) {
            validateToken();
        } else {
            navigate("/login")
        }
    }, [])

    return (
        <div>
            {user && <DefaultLayout>{children}</DefaultLayout>}
        </div>
    );
};

export default ProtectedRoute; 