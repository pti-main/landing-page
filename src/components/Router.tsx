import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import MainPage from './main-page/App';
//import Noice from './main-page/components/Noice';

import ApplicationPage from './application-page/App';

export default class App extends React.Component<any,any>{
    constructor(props:any) {
        super(props);

        fetch(`http://${document.domain + ":3001"}/analytics/api/v1/collect/data`, {
            method: "POST",
            cache: "no-cache",
            headers: {
                "x-analytics-req": "pti-analytics",
                "Content-Type": "application/json;charset=UTF-8"
            },
            body: JSON.stringify({
                    screen: {
                        width: window.screen.width,
                        height: window.screen.height,
                        pixelRatio: window.devicePixelRatio
                    },

                    window: {

                        timestamp: new Date().getTime(),
                        location: window.location,

                        inner: {
                            height: window.innerHeight,
                            width: window.innerWidth
                        },

                        outer: {
                            height: window.outerHeight,
                            width: window.outerWidth
                        }
                    },

                    user: {
                        agent: navigator.userAgent,
                        
                        platform: navigator.platform,
                        language: navigator.language,
                        vendor: navigator.vendor,

                        cookieEnabled: navigator.cookieEnabled,

                        browser: {
                            product: navigator.product,
                            version: navigator.appVersion
                        }
                    }
                })
            });
    }

    render(){
        return(
            <Router>
                <div className="site__router">
                        <Switch>
                            <Route exact path="/">
                                <MainPage/>
                            </Route>
                            <Route exact path="/aplikuj">
                                <ApplicationPage/>
                            </Route>
                            {/* <Route exact path="/panel">
                                {Noice}
                            </Route> */}
                        </Switch>
                </div>
            </Router>
        );
    }
}