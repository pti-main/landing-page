import React from 'react';
import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';

import Loader from './Loader';
import { Redirect, useHistory, Link } from 'react-router-dom';
import Logo from './Logo';

let getStatusQuery = gql`
    query($analyticsId: String!, $id: String!) {
        getApplicationStatus(analyticsId: $analyticsId, id: $id) {
            data
            success
            message
        }
    }
`;

const CheckStatus = ({ match, darkTheme }:any) => {
    const history = useHistory();

    let crossSign:JSX.Element = <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" role="img" viewBox="0 0 352 512"><path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"/></svg>;
    let checkMark:JSX.Element = <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" role="img" viewBox="0 0 512 512"><path fill="currentColor" d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"/></svg>;
    let questionMark:JSX.Element = <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" role="img" viewBox="0 0 384 512"><path fill="currentColor" d="M202.021 0C122.202 0 70.503 32.703 29.914 91.026c-7.363 10.58-5.093 25.086 5.178 32.874l43.138 32.709c10.373 7.865 25.132 6.026 33.253-4.148 25.049-31.381 43.63-49.449 82.757-49.449 30.764 0 68.816 19.799 68.816 49.631 0 22.552-18.617 34.134-48.993 51.164-35.423 19.86-82.299 44.576-82.299 106.405V320c0 13.255 10.745 24 24 24h72.471c13.255 0 24-10.745 24-24v-5.773c0-42.86 125.268-44.645 125.268-160.627C377.504 66.256 286.902 0 202.021 0zM192 373.459c-38.196 0-69.271 31.075-69.271 69.271 0 38.195 31.075 69.27 69.271 69.27s69.271-31.075 69.271-69.271-31.075-69.27-69.271-69.27z"/></svg>;

    let arrowRight: JSX.Element = <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" viewBox="0 0 256 512"><path fill="currentColor" d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"/></svg>;

    const { error, loading, data } = useQuery(getStatusQuery, {
        variables: {
            analyticsId: match.params.analyticsId,
            id: match.params.id
        }
    });

    if (loading)
        return <Loader/>;

    if (error)
        return (
            <div className="check-status">
                <div className="container">
                    <Link to="/">
                        <Logo darkVariant={darkTheme}/>
                    </Link>
                    <div className="inner__container">
                        <div className="state">
                            <div className={`icon error`}>
                                {crossSign}
                            </div>

                            <div className="text">
                                Wystąpił błąd podczas przetwarzania zapytania.
                            </div>
                        </div>

                        <div className="buttons">
                            <div className={`next button`} onClick={_ => history.push("/")}>
                                <span className="text">Strona główna</span>
                                <span className="arrow">{arrowRight}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

    if (data.getApplicationStatus.message === "application_not_found")
        return ( <Redirect to="/404"/> );

    let appData = JSON.parse(data.getApplicationStatus.data);

    const statusMessages:any = {
        1: "Twoja aplikacja jest dalej w stanie rozpatrywania przez dyrekcję.",
        2: "Twoja aplikacja została pomyślnie rozpatrzona.",
        3: "Twoja aplikacja została odrzucona."
    }

    return (
        <div className="check-status">
            <div className="container">
                <Link to="/">
					<Logo darkVariant={darkTheme}/>
				</Link>
                <div className="inner__container">
                    <div className="state">
                        <div className={`icon ${appData.status === 1 ? "unknown" : appData.status === 2 ? "success" : "error"}`}>
                            {appData.status === 1 ? questionMark : appData.status === 2 ? checkMark : crossSign}
                        </div>

                        <div className="text">
                            {(appData.message === null) ? statusMessages[appData.status] : appData.message} 
                        </div>
                    </div>

                    <div className="buttons">
                        <div className={`next button`} onClick={_ => history.push("/")}>
                            <span className="text">Strona główna</span>
                            <span className="arrow">{arrowRight}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckStatus;
