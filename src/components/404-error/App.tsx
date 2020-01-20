import React from 'react';
import { Link, BrowserRouter as Router } from 'react-router-dom';

export default class App extends React.Component<any,any>{
    
    render() {
        return (
            <div className="pti__container" id="error-page">
                <span id="error-id">404</span><br/>
                {/*<code>{this.props.location.pathname}</code>*/}
                <code>Podana strona nie została odnaleziona.</code>
                <Link to={"/"}>
                    <div className="back-button">
                        Strona Główna
                    </div>
                </Link>
            </div>
        )
    }
}