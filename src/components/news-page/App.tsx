import React from 'react';
import {Route, Switch} from 'react-router-dom';

import Header from '../shared/components/Header';
import Footer from '../shared/components/Footer';

import Articles from './components/Articles';
import Article from './components/Article';

const News = (props:any) => {
    return (
        <div className="pti__container" id="news-page">
            <Header darkTheme={props.darkTheme} transparent={true}/>
            
            {/* {(this.props.location.pathname.substr(1).replace('aktualnosci/', '') === "" || 
                this.props.location.pathname.substr(1).replace('aktualnosci/', '') === "aktualnosci") 
                ? <><div className="title">Aktualności</div><Articles/></> : <Article path={this.props.location.pathname}/>}
            <Route path={} component={}> */}
            
            <Switch>
                <Route exact path={"/aktualnosci"} component={Articles}/>
                <Route path={"/aktualnosci/:id"} component={() => <Article path={props.location.pathname}/>}/>
            </Switch>

            <Footer/>
        </div>
    );
}

export default News;