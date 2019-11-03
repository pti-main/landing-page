import React from 'react';

import Header from './components/Header';
import Informations from './components/Informations';
import Footer from './components/Footer';
import Hero from './components/Hero';

require('./css/main.css');

export default class App extends React.Component<any,any>{
    constructor(props:any) {
        super(props);
        this.state = {
            scrolled: false,
        }
    }
    render() {
        return(
            <div className="container">
                <Header/>
                
                <Hero/>

                <Informations/>

                <Footer/>
            </div>
        );
    }
}