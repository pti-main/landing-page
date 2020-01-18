import React from 'react';

import Header from '../shared/components/Header';
import Footer from '../shared/components/Footer';

import Articles from './components/Articles';
import Article from './components/Article';

export default class App extends React.Component<any, any> {

    render() {
        return (
            <div className="pti__container" id="news-page">
                <Header transparent={true}/>
                
                

                {(this.props.location.pathname.substr(1).replace('aktualnosci/', '') === "" || 
                  this.props.location.pathname.substr(1).replace('aktualnosci/', '') === "aktualnosci") 
                    ? <><div className="title">Aktualności</div><Articles/></> : <Article path={this.props.location.pathname}/>}

                <Footer/>
            </div>
        );
    }
}