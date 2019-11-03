import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import MainPage from './main-page/App';
import Noice from './main-page/components/Noice';

export default class App extends React.Component<any,any>{
    render(){
        return(
            <Router>
                <div className="site__router">
                        <Switch>
                            <Route exact path="/">
                                <MainPage/>
                            </Route>
                            <Route exact path="/panel">
                                <span>noice</span><br/>
                                {Noice}
                            </Route>
                        </Switch>
                </div>
            </Router>
        );
    }
}