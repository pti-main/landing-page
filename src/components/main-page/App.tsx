import React from 'react';

import Header from '../shared/components/Header';
import Footer from '../shared/components/Footer';

import Informations from './components/Informations';
import Contact from './components/Contact';
import Hero from './components/Hero';
import Reasons from './components/Reasons';
import Tiles from './components/Tiles';

const App = (props:any) => {
    return (
        <div className="pti__container" id="main-page">
            <Header darkTheme={props.darkTheme}/>

            <Hero/>

            <Informations/>

            <Reasons/>
            
            <Tiles/>
            
            <Contact/>

            <Footer onClick={props.handleThemeChange}/>
        </div>
    );
}
export default App;
