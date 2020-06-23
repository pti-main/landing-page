import React, { useEffect, useState } from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom'; 

import ProtectedRoute from './ProtectedRoute';
import Menu from './components/Menu';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Applications from './components/Applications';
import Articles from './components/Articles';
import Gallery from './components/Gallery'; 

import Toast from '../shared/Toast';
import { useCookies } from 'react-cookie';

const Panel = (props:any) => {
    const location = useLocation();
    
    const [ isLoggedIn, setLoggedIn ] = useState(false);
    const [ userInfo, setUserInfo ] = useState(null);
    const [ cookies, setCookie ] = useCookies();
    const [ menuOpened, setMenuOpened ] = useState(false);

    const [ toastActive, setToastActive ] = useState(false);
	const [ toastMessage, setToastMessage ] = useState(null);
	const [ toastSuccess, setToastSuccess ] = useState(false);
    const [ timeoutID, setTimeoutID ]:any = useState(0);
    
    let displayToast = (success:boolean, message:string) => {

        let display = () => {
            clearTimeout(timeoutID);

            setToastSuccess(success);
            setToastMessage(message);
            setToastActive(true);

            setTimeoutID(setTimeout(() => setToastActive(false), 5000));
        }

        if (toastActive) {
            setToastActive(false);
            setTimeout(display, 250);
        } else
            display();

    } 
 
    const handleConnectionChange = (e:any) => {
        let status = (e.type === "online");
        displayToast(status, status ? "Zostałeś ponownie połączony z serwerem." : "Utraciłeś połączenie z serwerem.");
    }
    useEffect(() => {
        document.title = "Panel - Prywatne Technikum Informatyczne";

        window.addEventListener('online', handleConnectionChange);
        window.addEventListener('offline', handleConnectionChange);

        return () => {
            window.removeEventListener('online', handleConnectionChange);
            window.removeEventListener('offline', handleConnectionChange);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    useEffect(() => {
        return () => {
            clearTimeout(timeoutID);
        }
    }, [timeoutID]);

    let con = new URLSearchParams(location.search).get("redirect");

    return (
        <div className={`panel-container${isLoggedIn ? "" : " login-screen"}`}>
            
            <div className="nav__menu-open" onClick={() => setMenuOpened(true)}>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
            </div>

            <Menu darkVariant={props.darkTheme} menuOpenedStuff={{menuOpened, setMenuOpened}} handleLogout={() => {
                if (cookies["pti-token"] !== "please_login_again") 
                    setCookie("pti-token", "please_login_again", {
                        path: "/"
                    });

                setUserInfo(null); 
                setLoggedIn(false);

                displayToast(true, "Pomyślnie wylogowano.");
            }} userInfo={userInfo} handleThemeChange={props.handleThemeChange} isLoggedIn={isLoggedIn}/>

            <Toast active={toastActive} onClick={() => { clearTimeout(timeoutID); setToastActive(false); }} success={toastSuccess} message={toastMessage}/>

            <div className="switch-container">
                <Switch>
                    <Route path={"/panel/login"} render={() => (isLoggedIn) ? ( <Redirect to={con !== null ? con : "/panel"}/> ) : (
                        <Login setLoggedIn={setLoggedIn} setUserInfo={setUserInfo} displayToast={displayToast}/>
                    )}/>

                    <ProtectedRoute isLoggedIn={isLoggedIn} exact path={"/panel"}>
                        <Redirect to="/panel/dashboard"/>
                    </ProtectedRoute>

                    <ProtectedRoute isLoggedIn={isLoggedIn} exact path={"/panel/dashboard"}>
                        <Dashboard userInfo={userInfo}/>
                    </ProtectedRoute>

                    <ProtectedRoute isLoggedIn={isLoggedIn} path={"/panel/analytics"}>
                        <div>
                            analytics
                        </div>
                    </ProtectedRoute>

                    <ProtectedRoute isLoggedIn={isLoggedIn} path={"/panel/articles"}>
                        <Articles darkTheme={props.darkTheme} displayToast={displayToast} userInfo={userInfo}/>
                    </ProtectedRoute>

                    <ProtectedRoute isLoggedIn={isLoggedIn} path={"/panel/gallery"}>
                        <Gallery darkTheme={props.darkTheme} displayToast={displayToast} userInfo={userInfo}/>
                    </ProtectedRoute>

                    <ProtectedRoute isLoggedIn={isLoggedIn} path={"/panel/applications"}>
                        <Applications userInfo={userInfo}/>
                    </ProtectedRoute>


                    <Redirect to="/404"/>

                </Switch>
            </div>
        </div>
    );
}

export default Panel;