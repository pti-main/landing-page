import React from 'react';

import Header from '../shared/components/Header';
import Footer from '../shared/components/Footer';
import Menu from './components/Menu';
import Form from './components/Form';

export default class App extends React.Component<any,any>{
    render() {
        return (
            <div className="pti__container" id="application-page">
                <Menu/>
                <Form/>
            </div>
        )
    }
}