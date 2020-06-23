import React from 'react';
import Articles from './Articles';
import CodeElement from './CodeElement';
import { useLocation, useHistory, Redirect } from 'react-router-dom';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';

import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import Loader from '../../shared/components/Loader';
import Error from '../../shared/components/Error';

const readingTime = require('reading-time');
const ReactMarkdown = require('react-markdown/with-html');


const Article = (props:any) => {

    const location = useLocation();
    const history = useHistory();

    const query = gql`
    query($path: String!) {
        getArticle(path: $path) {
            id
            title
            date
            message
            thumbnail
            path
        }
    }`;

    const { loading, error, data } = useQuery(query, {
        variables: {
            path: location.pathname.substr(1).replace('aktualnosci/', '')
        }
    });

    if (loading) return <Loader/>
    if (error) return <Error redirect={true} history={history}/>

    if (data.getArticle === null) 
        return (<Redirect to="/404"/>)
    

    let article = data.getArticle;
    
    document.title = `${article.title} - Prywatne Technikum Informatyczne`;
    
    return (
        <div id="article" className="container">
            <div className="article-container">
                <div className="image-container">
                    <div className="img" style={{backgroundImage: `url(${article.thumbnail})`}}/>
                </div>
                <div className="article-info">
                    <div className="article-title">{article.title}</div>
                    <div className="reading-time">{new Date(article.date).toLocaleDateString("pl-PL", { year: 'numeric', month: 'long', day: 'numeric' })}, {(article.message.length > 200) ? Math.round(readingTime(article.message).minutes) : 1} min czytania</div>
                </div>

                <div className="message">
                    <ReactMarkdown source={article.message} escapeHtml={false} renderers={{ code: CodeElement, image: (props:any) => (
                        <LazyLoadImage
                            src={props.src}
                            alt={""} 
                            effect="blur"/>
                    ), paragraph: "div"}}/>
                </div>
                
                <hr/>
                <div className="read-more_title">Przeczytaj więcej</div> 
            </div>
            <Articles transparent={true} history={props.history} path={article.path}/>
        </div>
    );
}

export default Article;