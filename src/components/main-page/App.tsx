import React from 'react';

import Header from '../shared/components/Header';
import Footer from '../shared/components/Footer';

import Informations from './components/Informations';
import Contact from './components/Contact';
import Hero from './components/Hero';
import Reasons from './components/Reasons';
import Tiles from './components/Tiles';

export default class App extends React.Component<any,any>{
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

        getCount(document.body, true);

        */
    render() {
        return(
            <div className="pti__container" id="main-page">
                <Header/>

                <Hero/>

                <Informations/>

                <Reasons/>
                
                <Tiles/>
                
                <Contact/>

                <Footer/>
            </div>
        );
    }
}
