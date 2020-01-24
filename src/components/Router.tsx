import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import './css/main.css';
import MainPage from './main-page/App';
import ApplicationPage from './application-page/App';
import NewsPage from './news-page/App';
import Page404 from './404-error/App';
import GalleryPage from './gallery-page/App';

import Analytics from './Analytics';


export default class App extends React.Component<any,any>{

    componentWillMount() {
        document.body.classList['add']('dark-theme');
    }

    getCookie(name:string) {
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
    
    componentDidMount() {
        
        if (this.getCookie('darkmode') === null) {

            if (new Date().getHours() >= 19 || new Date().getHours() <= 6)
                document.body.classList.add('dark-theme');
            else
                document.body.classList.remove('dark-theme');

            if (window.matchMedia("(prefers-color-scheme: dark)").matches)
                document.body.classList.add('dark-theme');
            else if (window.matchMedia("(prefers-color-scheme: light)").matches)
                document.body.classList.remove('dark-theme');


        } else
            document.body.classList[(this.getCookie('darkmode') === true) ? 'add' : 'remove']('dark-theme');

        window.matchMedia("(prefers-color-scheme: dark)").addListener(e => e.matches && document.body.classList.add('dark-theme'));
        window.matchMedia("(prefers-color-scheme: light)").addListener(e => e.matches && document.body.classList.remove('dark-theme'));
        
        setTimeout(_ => document.body.classList.remove('noTransition'), 500);

        
        Analytics();
    }
 
    render(){
        return(
            <Router>
                <div className="site__router">
                    <Switch>
                        <Route exact path="/" component={MainPage}/>
                        <Route path={"/aplikuj"} component={ApplicationPage}/>
                        <Route path={"/aktualnosci"} component={NewsPage}/>
                        <Route path={"/aktualnosci/:id"}>
                            <NewsPage/>
                        </Route>
                        <Route path={"/galeria"} component={GalleryPage}/>
                        <Route component={Page404}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}