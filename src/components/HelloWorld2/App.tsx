import * as React from 'react';
import * as ReactDOM from 'react-dom';

if(location.pathname == "/helloworld2"){
    require('./css/main.css');
}

export default class App extends React.Component<any,any>{
    render(){
        return(
            <div id="container">
                <p>Hello world 2</p>
            </div>
        );
    }
}