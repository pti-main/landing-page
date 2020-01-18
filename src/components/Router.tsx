import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import './css/main.css';
import MainPage from './main-page/App';
import ApplicationPage from './application-page/App';
import NewsPage from './news-page/App';
import Page404 from './404-error/App';

import Analytics from './Analytics';


export default class App extends React.Component<any,any>{

    componentWillMount() {
        document.body.classList['add']('dark-theme');
    }
    
    componentDidMount() {
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
                        <Route component={Page404}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}