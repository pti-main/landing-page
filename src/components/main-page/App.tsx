import React from 'react';

import Header from './components/Header';
import Informations from './components/Informations';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Why from './components/Why';

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
            <div className="pti__container">
                <Header/>
                
                <Hero/>

                <Informations/>

                <Why/>

                <Footer/>
            </div>
        );
    }
}