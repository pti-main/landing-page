import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
const Error = (props:any) => {
    useEffect(() => {
        document.title = "404 - Prywatne Technikum Informatyczne";
    }, []);
    

    return (
        <div className="pti__container" id="error-page">
            <span id="error-id">404</span>
            <span className="error--title">Podana strona nie została odnaleziona.</span>
            <Link to="/">
                <div className="back-button">
                    Strona Główna
                </div>
            </Link>
        </div>
    );
}
export default Error;