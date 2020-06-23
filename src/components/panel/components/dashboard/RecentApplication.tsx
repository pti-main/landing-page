import React from 'react';
import SummaryTile from './SummaryTile';

import moment from 'moment';
import 'moment/locale/pl';

import Loader from '../../../shared/components/Loader'

import gql from 'graphql-tag';
import { useQuery } from 'react-apollo';
import { Link } from 'react-router-dom';

let lastApplicationQuery = gql`
    query($token: String!) {
        getLastApplication(token: $token) {
            success
            data
        }
    }
`;


const RecentApplication = ({ userInfo }:any) => {
    let { loading, data, error } = useQuery(lastApplicationQuery, {variables: {token: (userInfo) ? userInfo.token : ""}});

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


    let lastApplication = JSON.parse(data.getLastApplication.data).data;
    if (lastApplication[0])
        lastApplication[0].data = JSON.parse(lastApplication[0].data);
    
    moment.locale('pl');

    return (
        <div className="tile lastApplication">
            <SummaryTile
                title="Dzisiejsze aplikacje"
                amount={JSON.parse(data.getLastApplication.data).todaysApplications}/>
            <div className="bottom__container">
                    { lastApplication.length === 1 ? <>
                        <div className="title">
                            Ostatnia aplikacja:
                        </div>
                            <div className="row">
                                <div className="row_container">
                                    <div className="applicant__name">
                                        <div className="data__title">
                                            Imię i Nazwisko kandydata
                                        </div>
                                        {lastApplication[0].firstName} {lastApplication[0].lastName}
                                    </div>
                                    <div className="applicant__data">
                                        <div className="application__info">
                                            <div className="data__title">
                                                Zaaplikowano
                                            </div>
                                            { moment(lastApplication[0].date).fromNow() }
                                        </div>
                                        <div className="application__info">
                                            <div className="data__title">
                                                Adres email
                                            </div>
                                            { lastApplication[0].email }
                                        </div>
                                        <div className="application__info">
                                            <div className="data__title">
                                                Numer telefonu
                                            </div>
                                            { lastApplication[0].data.personalInfoValues.phone_number }
                                        </div>
                                        <div className="application__info">
                                            <div className="data__title">
                                                Data urodzenia
                                            </div>
                                            { lastApplication[0].data.personalInfoValues.birth_date } 
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Link className="cta" to={`/panel/applications/edit/${lastApplication[0]._id}`}>
                                Przejdź do tej aplikacji
                            </Link>
                        </> : 
                        <div className="empty">
                            <div className="title">
                                Brak ostatnich aplikacji.
                            </div>
                            <img style={{height: "100px", width: "auto"}} src="https://i.imgur.com/ltOZqzH.png" alt="monkaS"/> 
                            <Link className="cta" to="/panel/applications">
                                Przejdź do wszystkich aplikacji
                            </Link>
                        </div>}
            </div>
        </div>
    );
}

export default RecentApplication;