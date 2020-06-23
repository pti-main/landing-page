import React from 'react';
import { Link, useLocation } from 'react-router-dom'; 

const MenuPosition = ({title, icon, path}:any) => {
    const location = useLocation();

    return (
        <Link to={path} className={`menu-position${location.pathname.indexOf(path) !== -1 && path !== "/" ? " selected" : ""}`}>
            <div className="menu-position__icon">{icon}</div>
            <div className="menu-position__title">{title}</div>
        </Link>
    )
}

export default MenuPosition;