import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import MainPage from './main-page/App';

export default class App extends React.Component<any,any>{
    constructor(props:any){
        super(props);

    }

    render(){
        return(
            <Router>
                <div>
                    <Switch>
                        <Route exact path="/">
                            <MainPage/>
                        </Route>
                    </Switch>
                </div>
            </Router>
        );
    }
}