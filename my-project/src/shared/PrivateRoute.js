import React from 'react';
import { Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const PrivateRoute = ({ element }) => {
    const [cookies] = useCookies(['user_id']);

    return cookies.user_id ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
