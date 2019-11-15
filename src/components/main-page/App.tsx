import React from 'react';

import Header from './components/Header';
import Informations from './components/Informations';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Reasons from './components/Reasons';

require('./css/main.css');

export default class App extends React.Component<any,any>{
    constructor(props:any) {
        super(props);
        this.state = {
            scrolled: false,
        }

        /*

        [...document.styleSheets].filter(s => !s.disabled).map(s => [...s.rules].filter(r => r instanceof CSSStyleRule).length).reduce((a, b) => a + b);

        function getCount(parent, getChildrensChildren){
            var relevantChildren = 0;
            var children = parent.childNodes.length;
            for(var i=0; i < children; i++){
                if(parent.childNodes[i].nodeType != 3){
                    if(getChildrensChildren)
                        relevantChildren += getCount(parent.childNodes[i],true);
                    relevantChildren++;
                }
            }
            return relevantChildren;
        }

        getCount(document.body, true/false);

        */
    }
    render() {
        return(
            <div className="pti__container">
                <Header/>
                
                <Hero/>

                <Informations/>

                <Reasons/>

                <Footer/>
            </div>
        );
    }
}