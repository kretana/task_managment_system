import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import {useSelector} from "react-redux";
import {RootState} from "../redux/store";

const PrivateRoute: React.FC = () => {
    const { isAuthenticated } = useSelector((state: RootState | any) => state.auth);
    const token = localStorage.getItem('authToken')
    return token ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;