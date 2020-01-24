import React from 'react';

export default class App extends React.Component<any,any>{
    
    render() {
        return (
            <div className="pti__container" id="error-page">
                <span id="error-id">404</span><br/>
                {/*<code>{this.props.location.pathname}</code>*/}
                <code>Podana strona nie została odnaleziona.</code>
                <a href="/">
                    <div className="back-button">
                        Strona Główna
                    </div>
                </a>
            </div>
        )
    }
}