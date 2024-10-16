import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';


const PrivateRoute: React.FC = () => {
    // const { isAuthenticated } = useSelector((state: RootState | any) => state.auth);
    const token = localStorage.getItem('authToken')
    return token ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;