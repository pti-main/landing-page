import React from 'react';
import { Route,  useLocation, Redirect } from 'react-router-dom';

const ProtectedRoute = ({children, isLoggedIn, ...props}:any) => {
    const location = useLocation();

    return (
        <Route {...props} render={() => isLoggedIn ?
            ( children ) :
            ( <Redirect to={`/panel/login?redirect=${location.pathname}`}/> )
        }/> 
    );
}

export default ProtectedRoute;
