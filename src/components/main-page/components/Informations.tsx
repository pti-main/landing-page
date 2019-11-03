import React from 'react';

export default function Informations() {
    return (
        <div id="informations" className="informations__background">         
            <div className="wrapper">
                <span className="intro">No te *censoredy* nam zaplacily: </span>
                <span className="logos">
                    <a href="https://selleo.com" target="selleo">
                        <img className="companies__selleo" src="/img/companies/selleo.png" alt=""/>
                    </a>

                    <a href="https://wsi.edu.pl" target="wsiz">
                        <img className="companies__wsiz" src="/img/companies/wsiz.png" alt=""/>
                    </a>
                    
                    <a href="http://rekord.com.pl" target="rekord">
                        <img src="/img/companies/rekord.png" alt=""/>
                    </a>

                    <a href="https://4experience.co" target="4experience">
                        <img src="/img/companies/4experience.png" alt=""/>
                    </a>
                </span>
            </div>
        </div>
    );
}