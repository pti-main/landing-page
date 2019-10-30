import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import HelloWorld1 from './main-page/App';

export default class App extends React.Component<any,any>{
    constructor(props:any){
        super(props);

    }

    render(){
        return(
            <Router>
                <div>
                    <Switch>
                        <Route path="/helloworld1">
                            <HelloWorld1/>
                        </Route>
                    </Switch>
                </div>
            </Router>
        );
    }
}