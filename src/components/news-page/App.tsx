import React, { useEffect, useState, useRef } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Loader from '../shared/components/Loader';
import Error from '../shared/components/Error';

import Header from '../shared/components/Header';
import Footer from '../shared/components/Footer';
import { useTransition, useChain, animated } from 'react-spring';
import Articles from './components/Articles';
import Article from './components/Article';


const News = (props:any) => {

    //Loader Spring

    // //Error Message Spring
    // let errorTransitionRef = useRef(null);
    // let errorTransition = useTransition(error, null, {
    //     from: {opacity: 0, transform: 'scale(0.75)'},
    //     enter: {opacity: 1, transform: 'scale(1)'},
    //     leave: {opacity: 0, transform: 'scale(0.75)'},
    //     ref: errorTransitionRef
    // });

    useEffect(() => {
        document.title = "Aktualności - Prywatne Technikum Informatyczne";
    }, []);
    // useChain([loaderTransitionRef, errorTransitionRef]);
    
    return (
        <div className="pti__container" id="news-page">
            {/* <Query query={ApplicationData}>
                {({ loading, error, data }:any) => {
                    let dataTransition = useTransition(data, null, {
                        from: {opacity: 0},
                        enter: {opacity: 1},
                        leave: {opacity: 0},
                    });
                    if (error) return <div>error</div>;
                    if (loading) return <div>loading</div>;
                    console.info(data);
                    return (
                        data.getArticle.map((article:any) => (
                            
                            dataTransition.map(({item, key, props}) => {
                                return (
                                    item ? 
                                    <animated.div style={props} key={key}>
                                        <div>name: {article.title}</div>
                                        <div>id: {article.id}</div>
                                    </animated.div> : null
                                )
                            })
                        
                        ))
                    );
                }}
            </Query> */}
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

            {/* loaderTransition.map(({item, key, props}) => (
                (item && !error) ?
                <animated.div className="loader__wrapper" key={key} style={props}>
                    <Loader />
                </animated.div> : null 
            )) */}

            {/* errorTransition.map(({item, key, props:style}) => (
                item ?
                <animated.div className="error__wrapper" key={key} style={style}>
                    <Error redirect={true} history={props.history}/>
                </animated.div> : null 
            )) */}
            
            {/* data && 
                // <Switch location={props.location}>
                //     { articlesTranition.map(({item, key, props}) => (
                //         <animated.div key={key} style={props}>
                //             <Route exact path={"/aktualnosci"} component={(props:any) => <Articles data={data.articles} {...props}/>}/>
                //             <Route path={"/aktualnosci/:id"} component={(props:any) => <Article data={data.articles} path={props.location.pathname} {...props}/>}/>
                //         </animated.div>
                //         //wiesz co nwm jak to zrobic na article (YET)
                //         //TODO: Fix articles && add animation
                //         //initial animation: loader chained with showing of switch
                //         //then on normal load start not chained animation of switch
                //         //basically a page transition
                //         //switch inside btw
                //     )) }
                // </Switch>
                    // <animated.div className="article__absolute__wrapper" key={key} style={style}>
                    //     <Switch location={item}>
                    //         <Route exact path={"/aktualnosci"} component={(props:any) => <Articles data={data.articles} {...props}/>}/>
                    //         <Route path={"/aktualnosci/:id"} component={(props:any) => <Article data={data.articles} path={props.location.pathname} {...props}/>}/>
                    //     </Switch>
                    // </animated.div>
                <Switch>
                    <Route exact path={"/aktualnosci"} component={(props:any) => <Articles data={data.articles} {...props}/>}/>
                    <Route path={"/aktualnosci/:id"} component={(props:any) => <Article data={data.articles} path={props.location.pathname} {...props}/>}/>
                </Switch>
            */}
            <Footer onClick={props.handleThemeChange}/>
        </div>
    );
}

export default News;