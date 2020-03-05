import React, { useEffect } from 'react';

import Header from '../shared/components/Header';
import Footer from '../shared/components/Footer';

import Informations from './components/Informations';
import Contact from './components/Contact';
import Hero from './components/Hero';
import Reasons from './components/Reasons';
import Tiles from './components/Tiles';

const App = (props:any) => {
    useEffect(() => {
        document.title = "Prywatne Technikum Informatyczne";
    }, []);

    return (
        <>
        <Header darkTheme={props.darkTheme}/>
            <div className="pti__container">
                <div id="main-page">
                    <Hero/>

                    <Informations/>

                    <Reasons/>
                    
                    <Tiles/>
                    
                    <Contact/>

                    <Footer onClick={props.handleThemeChange}/>
                </div>
            </div>
        </>
    );
}
export default App;
