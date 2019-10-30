import React from 'react';
import ReactDOM from 'react-dom';

import Header from './components/Header';
import Content from './components/Content';
import Footer from './components/Footer';

if(location.pathname == "/"){
    require('./css/main.css');
}

export default class App extends React.Component<any,any>{
    render(){
        return(
            <div id="container">
                <Header/>
                
                <Content/>

                <Footer/>
            </div>
        );
    }
}