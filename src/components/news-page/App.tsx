import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Header from '../shared/components/Header';
import Footer from '../shared/components/Footer';

import Articles from './components/Articles';
import Article from './components/Article';


const News = (props:any) => {

    useEffect(() => {
        document.title = "Aktualności - Prywatne Technikum Informatyczne";
    }, []);

    return (
        <div className="pti__container" id="news-page">

            <Header darkTheme={props.darkTheme} transparent={true}/>
            
            <Switch location={props.location}>
                <Route exact path={"/aktualnosci"}>
                    <Articles/>
                </Route>

                <Route path={"/aktualnosci/:id"}>
                    <Article/>
                </Route>

                <Redirect to="/404"/>
            </Switch>

            <Footer onClick={props.handleThemeChange}/>
        </div>
    );
}

export default News;