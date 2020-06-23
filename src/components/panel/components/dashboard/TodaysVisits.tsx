import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo';

import { AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area, ResponsiveContainer } from 'recharts';
import SummaryTile from './SummaryTile';
import { Link } from 'react-router-dom';
import Loader from '../../../shared/components/Loader';

let todaysVisitsQuery = gql`
    query($token: String!) {
        getTodayViews(token: $token) {
            success
            data
        }
    }
`;

const TodaysVisits = ({ userInfo }:any) => {
    let { loading, data, error } = useQuery(todaysVisitsQuery, {variables: {token: (userInfo) ? userInfo.token : ""}});
    
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


    let todaysVisits = JSON.parse(data.getTodayViews.data);

    return (
        <div className="tile visits">
                <SummaryTile
                    title="Dzisiejsze wizyty"
                    amount={todaysVisits.length}/>
                <div className="bottom__container">
                    <div className="charts"> {/* aspect: 6/3 (2) */}
                        <ResponsiveContainer id="todaysVisits" width="100%" aspect={2.25}>
                            <AreaChart data={todaysVisits.data} margin={{ left: -30 }}>
                                <defs>
                                    <linearGradient id="Grad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#f08080" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="#f08080" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="hour" />
                                <YAxis allowDecimals={false}/>
                                <CartesianGrid style={{opacity: 0.5}} />
                                <Tooltip labelFormatter={(h:any) => `Godzina: ${h}`} />
                                <Area type="monotone" dataKey="count" name="Wyświetleń" stroke="#f08080" fillOpacity={1} fill="url(#Grad)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                

                <Link className="cta" to="/panel/analytics">
                    Pokaż analityki
                </Link>
            </div>
        </div>
    );
}

export default TodaysVisits;
