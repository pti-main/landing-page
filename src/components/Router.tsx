import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './css/main.css';
import MainPage from './main-page/App';
import ApplicationPage from './application-page/App';
import NewsPage from './news-page/App';
import Page404 from './404-error/App';
import GalleryPage from './gallery-page/App';

import Analytics from './Analytics';
const Routes = () => {
    const [ darkTheme, setDarkTheme ] = useState(true);

    const getCookie = (name:string) => {
        let cookies = document.cookie.split(';');
        for (let i in cookies) {
            let c = cookies[i];

            while (c.charAt(0) === ' ') 
                c = c.substring(1, c.length);

            if (c.indexOf(name) === 0) 
                return (c.substring(`${name}=`.length,c.length) === "true") ? true : false;
        }
        return null;
    }

    const getUserTheme = () => {
        if (getCookie('darkmode') === null) {
            if (window.matchMedia("(prefers-color-scheme: dark)").matches)
                setDarkTheme(true);
            else if (window.matchMedia("(prefers-color-scheme: light)").matches)
                setDarkTheme(false);
        } else
            (getCookie('darkmode') === true) ? setDarkTheme(true) : setDarkTheme(false);
    }

    const addMediaListeners = () => {
        window.matchMedia("(prefers-color-scheme: dark)").addListener(e => e.matches && setDarkTheme(true));
        window.matchMedia("(prefers-color-scheme: light)").addListener(e => e.matches && setDarkTheme(false));
    }

    const removeMediaListeners = () => {
        window.matchMedia("(prefers-color-scheme: dark)").removeListener(e => e.matches && setDarkTheme(true));
        window.matchMedia("(prefers-color-scheme: light)").removeListener(e => e.matches && setDarkTheme(false));
    }

    useEffect(() => {
        //should run only as cDM
        getUserTheme();
        addMediaListeners();
        Analytics();
        let transitionTimeout = window.setTimeout(() => document.body.classList.remove('noTransition'), 500);
        return () => {
            //just in case, cleaning function
            //should run only as cWU
            removeMediaListeners();
            clearTimeout(transitionTimeout);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    const toggleTheme = () => {
        setDarkTheme(darkTheme => !darkTheme);
    }
    
    useEffect(() => {
        document.body.classList[(darkTheme) ? "add" : "remove"]("dark-theme");
    }, [darkTheme]);
    
    return (
        <Router>
            <div className="site__router">
                <Switch>
                    <Route exact path="/" render={(props:any) => <MainPage {...props} handleThemeChange={toggleTheme} darkTheme={darkTheme}/>} />
                    <Route path={"/aplikuj"} render={(props:any) => <ApplicationPage {...props} darkTheme={darkTheme}/>} />
                    <Route path={"/aktualnosci"} render={(props:any) => <NewsPage {...props} darkTheme={darkTheme}/>} />
                    <Route path={"/galeria"} render={(props:any) => <GalleryPage {...props} darkTheme={darkTheme}/>} />
                    <Route component={Page404}/>
                </Switch>
            </div>
        </Router>
    );
}
export default Routes;