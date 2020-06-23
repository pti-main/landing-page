import React from 'react';

import SummaryTile from './SummaryTile';

import moment from 'moment';
import 'moment/locale/pl';

import gql from 'graphql-tag';
import { useQuery } from 'react-apollo';
import { Link } from 'react-router-dom';
import Loader from '../../../shared/components/Loader';

let lastArticlesQuery = gql`
    query($token: String!) {
        getLastArticles(token: $token) {
            success
            data
        }
    }
`;

const LastArticles = ({ userInfo }:any) => {
    let { loading, data, error } = useQuery(lastArticlesQuery, {variables: {token: (userInfo) ? userInfo.token : ""}});

    if (loading)
        return (
            <div className="bottom__container loading">
                <Loader/>
            </div>
        );

    if (error || !userInfo)
        return (
            <div className="tile">
                <div className="error bottom__container">
                    <img src="https://i.imgur.com/4Ce5xP0.jpg" alt="ragePipo"/>
                    <div className="title">
                        Wystąpił błąd przy ładowaniu komponentu
                    </div>
                </div>
            </div>
        );

    let articles = JSON.parse(data.getLastArticles.data);
    moment.locale('pl');

    return (
        <div className="tile articles">
            <SummaryTile title="Artykuły" amount={articles.length}/>
            <div className="bottom__container articles__tile" style={{
                    gridTemplateColumns: (articles.data.length === 2) ? "1fr 1fr" : "1fr"
                }}>
                { articles.data.length > 0 ? articles.data.map((p:any) => (
                    <div className="article__container" key={p._id}>
                        <div className="article__title">
                            <img className="article__title__image" src={p.thumbnail} alt=""/>
                            <div className="article__title__inner">{p.title}</div>
                        </div>
                        <div className="article__info">
                            <div className="article__info__views">Wyświetleń: {p.views}</div>
                            { p.lastEdit !== null && <div className="article__info__lastEdit">Ostatnia edycja: { p.lastEdit === null ? "nigdy" : moment(p.lastEdit).fromNow()}</div> }
                        </div>
                        <div className="article__body">
                            {p.message}
                        </div>
                        <Link className="cta" to={`/panel/articles/edit/${p._id}`}>
                            Edytuj
                        </Link>
                    </div>
                )) : <div className="title">Brak artykułów</div>}
            </div>
        </div>
    )
}

export default LastArticles;
