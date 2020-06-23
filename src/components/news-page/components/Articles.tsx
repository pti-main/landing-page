import React from 'react';
import { Link,  useHistory} from 'react-router-dom';

import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Loader from '../../shared/components/Loader';
import Error from '../../shared/components/Error';


const Articles = (props:any) => {
    let history = useHistory();
    const getArticles = gql`
    query${props.path !== undefined ? `($path: String!)` : ""} {
        ${props.path !== undefined ? `getRandomArticles(path: $path)` : "getArticlesList"} {
            title
            thumbnail
            messageSnippet
            path
        }
    }`;

    let { loading, error, data } = useQuery(getArticles, {
        variables: {
            path: props.path
        }
    });


    if (loading) return <Loader/>
    if (error) return <Error redirect={false} history={history}/>

    data = data[(props.path !== undefined) ? "getRandomArticles": "getArticlesList"];
    
    return (
        <>
            { !props.transparent && <div className="title">Aktualności</div> }
            <div id="articles" className={props.transparent ? "" : "container"}>
                {(data.length > 0) ? 
                    data.map((a:any) => (
                        <div id="article-entry" key={a.title}>
                            <Link className="article-link" to={`/aktualnosci/${a.path}`}>
                                {(a.thumbnail !== null) ? 
                                    <div className="img" style={{backgroundImage: `url(${a.thumbnail})`}}/> : <></>}
                                    <div className="article-text">
                                        <div className="article-title">{(a.title.length > 30) ? `${a.title.substring(0, 30).replace(/\s+/g,' ').trim()}...` : a.title}</div>
                                        <div className="article-desc">{a.messageSnippet}</div>
                                    </div>
                            </Link>
                        </div>
                    )) :
                    <div className="message">Brak artykułów.</div>}
            </div>
        </>
    )
}

export default Articles;