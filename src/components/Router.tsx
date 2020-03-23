import React, { useEffect, useState } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';

import './css/main.css';
import MainPage from './main-page/App';
import ApplicationPage from './application-page/App';
import NewsPage from './news-page/App';
import Page404 from './404-error/App';
import GalleryPage from './gallery-page/App';
import getVisitAnalytics from './VisitAnalytics';

import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useCookies } from 'react-cookie';

const analytics = gql`
mutation($type: String!, $data: String!, $id: String) {
    sendAnalytics(type: $type, data: $data, id: $id)
}`;

//ble funkcja

const getDomPath = (el:any) => {
    let stack = [];
    while ( el.parentNode !== null ) {
      
      if ( el.hasAttribute('id') && el.id !== '' ) 
        stack.unshift(el.nodeName.toLowerCase() + '#' + el.id);
      else
        stack.unshift(el.nodeName.toLowerCase());
      
      el = el.parentNode;
    }
  
    return stack.slice(1); // removes the html element
}


const Routes = (props:any) => {
    const [ darkTheme, setDarkTheme ] = useState(true);
    const history = useHistory();
    const [ postAnalytics ] = useMutation(analytics);
    const [ cookies, setCookie ] = useCookies();


    const getUserTheme = () => {
        console.log(cookies['darkmode'])
        if (cookies['darkmode'] === null) {
            if (window.matchMedia("(prefers-color-scheme: dark)").matches)
                setDarkTheme(true);
            else if (window.matchMedia("(prefers-color-scheme: light)").matches)
                setDarkTheme(false);
            else
                setDarkTheme(true);
        } else
            setDarkTheme(Boolean(cookies['darkmode']));
            // (getCookie('darkmode') === true) ? setDarkTheme(true) : setDarkTheme(false);
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
        let pA = async () => {
            await postAnalytics({
                variables: {
                    type: "visit",
                    data: await getVisitAnalytics(),
                    id: cookies["pti-analytics"]
                }
            }).then((a) => {
                setCookie("pti-analytics", a.data.sendAnalytics);

                // document.addEventListener("click", (e:any) => {
                //     postAnalytics({
                //         variables: {
                //             type: "click",
                //             data: JSON.stringify({
                //                 path: getDomPath(e.target),
                //                 location: window.location.pathname,
                //                 darkTheme: darkTheme
                //             }),
                //             id: cookies["pti-analytics"]
                //         }
                //     })
                // });
            });
        };
        pA();

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