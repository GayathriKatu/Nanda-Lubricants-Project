import React from 'react';
import { Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const PrivateRoute = ({ element }) => {
    const [cookies] = useCookies(['user_id', 'user_type']);

    if (!cookies.user_id) {
        return <Navigate to="/login" />;
    }

    if (cookies.user_type === 'Retailer') {
        return <Navigate to="/" />;
    }

    return element;
};

export default PrivateRoute;
