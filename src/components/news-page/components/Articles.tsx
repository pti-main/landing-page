import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

const Articles = () => {
    const [ loading, setLoading ] = useState(false);
    const [ data, setData ] = useState(null);
    const [ error, setError ] = useState(null);

    useEffect(() => {
        setLoading(true);
        fetch(`http://${document.domain + ":3001"}/news/api/v1/list/`)
            .then(resp => {
                setLoading(false);
                if (resp.ok) return resp.json()
                else throw resp.status
            })
            .then(resp => setData(resp))
            .catch(err => setError(err));
        return () => {
            //cWU
        }
    }, []);

    return (<>
            { error && <div className="error">{error}</div> }
            { loading && 
                <>
                    <div className="loader">ładowaning się</div>
                    {/* insert spinner svg here, have this instead */}
                    <div className="spinner">*Krence se*</div>
                </> }
            { !error && <div className="title">Aktualności</div> }
            <div id="articles" className="container">
                { data &&
                    data.articles.map((a:any) => (
                        <div id="article-entry" key={a.title}>
                            <Link className="article-link" to={`/aktualnosci/${a.title.split(' ').join('_').toLowerCase()}`}>
                                {(a.thumbnail !== null) ? 
                                    <div className="img" style={{backgroundImage: `url(${a.thumbnail})`}}/> : <></>}
                                    <div className="article-text">
                                        <div className="article-title">{(a.title.length > 30) ? `${a.title.substring(0, 30).replace(/\s+/g,' ').trim()}...` : a.title}</div>
                                        <div className="article-desc">{(a.message.length > 65) ? `${a.message.substring(0, 65)}...` : a.message}</div>
                                    </div>
                            </Link>
                        </div>
                    ))}
            </div>
        </>
    );

}

export default Articles;