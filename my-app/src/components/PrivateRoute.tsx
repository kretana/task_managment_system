import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {RootState} from "../redux/store";


interface PrivateRouteProps {
    children: JSX.Element;
    allowedRoles: string[];
}

const PrivateRoute = ({ children, allowedRoles }: PrivateRouteProps) => {
    const { isAuthenticated, user } = useSelector((state: RootState | any) => state.auth);

    if (!isAuthenticated || (user && !allowedRoles.includes(user.role))) {
        return <Navigate to="/dashboard" />;
    }

    return children;
};

export default PrivateRoute;
