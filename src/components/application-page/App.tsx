import React from 'react';

import Header from '../shared/components/Header';
import Footer from '../shared/components/Footer';
import Intro from './components/Intro';
import Tabs from './components/Tabs';

export default class App extends React.Component<any,any>{

    render() {
        return (
            <div className="pti__container" id="application-page">

                <Header transparent={true}/>

                <Intro/>

                <Tabs/>

                <Footer/>
            </div>
        )
    }
}