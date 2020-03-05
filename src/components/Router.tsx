import React, { useEffect, useState } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';

import './css/main.css';
import MainPage from './main-page/App';
import ApplicationPage from './application-page/App';
import NewsPage from './news-page/App';
import Page404 from './404-error/App';
import GalleryPage from './gallery-page/App';

import Analytics from './Analytics';
const Routes = (props:any) => {
    const [ darkTheme, setDarkTheme ] = useState(true);
    const history = useHistory();

    const setCookie = (name:string, value:boolean) => 
      document.cookie = name + "=" + (value.toString() || "") + ";";

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
        setCookie('darkmode', !darkTheme);
        setDarkTheme(darkTheme => !darkTheme);
    }
    
    useEffect(() => {
        document.body.classList[(darkTheme) ? "add" : "remove"]("dark-theme");
    }, [darkTheme]);

    history.listen(() => {
        window.scrollTo(0, 0)
    });
    
    return (
        <div className="site__router">
            
                    <Switch>
                        <Route exact path="/" render={(props:any) => <MainPage {...props} handleThemeChange={toggleTheme} darkTheme={darkTheme}/>} />
                        <Route path={"/aplikuj"} render={(props:any) => <ApplicationPage {...props} darkTheme={darkTheme}/>} />
                        <Route path={"/aktualnosci"} render={(props:any) => <NewsPage {...props} handleThemeChange={toggleTheme} darkTheme={darkTheme}/>} />
                        <Route path={"/galeria"} render={(props:any) => <GalleryPage {...props} darkTheme={darkTheme}/>} />
                        
                        <Route path={"/404"} render={(props:any) => <Page404 {...props} darkTheme={darkTheme}/>} />
                        
                        <Redirect to={"/404"}/>
                    </Switch>
        </div>
    );
}
export default Routes;