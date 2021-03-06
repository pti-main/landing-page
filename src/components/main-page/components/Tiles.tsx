import React from 'react';

export default function Tiles() {
    return (
        <div id="tiles">
            <div className="container">
                <div className="row">
                    <div className="title-tile">
                        <div className="text__tile">
                            Zgodnie z prognozami w 2020 roku na całym świecie będzie brakowało aż jednego miliona programistów.
                        </div>
                    </div>
                    {(navigator.userAgent.match(/Android/i)
                        || navigator.userAgent.match(/webOS/i)
                        || navigator.userAgent.match(/iPhone/i)
                        || navigator.userAgent.match(/iPad/i)
                        || navigator.userAgent.match(/iPod/i)
                        || navigator.userAgent.match(/BlackBerry/i)
                        || navigator.userAgent.match(/Windows Phone/i)) ? null : 
                    <div className="video-tile">
                        <iframe title="video-iframe" className="video-iframe" allowFullScreen src="https://www.youtube.com/embed/nKIu9yen5nc?feature=oembed&amp;autoplay=1&amp;start&amp;end&amp;wmode=opaque&amp;controls=0&amp;mute=1&amp;rel=0&amp;modestbranding=1&amp;loop=1&amp;playlist=nKIu9yen5nc"></iframe>
                    </div>}
                </div>

                <div className="row" id="second">
                    <div className="tile-container" id="classes">
                        {/* <img className="text__tile-image" id="classes"/> */}
                        <div className="text__tile-title">
                            Klasy profilowane
                        </div>
                        <div className="text__tile-description">
                            marchewka lorem ipsum, kino jest zdjęciem, zycie jest bledem elo.
                        </div>
                        <div className="text__tile-checkit">Sprawdź!</div>
                    </div>
                    <div className="tile-container" id="patronage">
                        <img className="text__tile-image" id="patronage" alt=""/>
                        <div className="text__tile-title">
                            Patronat Naukowy
                        </div>
                        <div className="text__tile-description">
                            marchewka lorem ipsum, kino jest zdjęciem, zycie jest bledem elo.
                        </div>
                        <div className="text__tile-checkit">Sprawdź!</div>
                    </div>
                    <div className="tile-container" id="technician">
                        <img className="text__tile-image" id="technician" alt=""/>
                        <div className="text__tile-title">
                            Technik Informatyk
                        </div>
                        <div className="text__tile-description">
                            marchewka lorem ipsum, kino jest zdjęciem, zycie jest bledem elo.
                        </div>
                        <div className="text__tile-checkit">Sprawdź!</div>
                    </div>
                </div>

                <div className="row">
                    <div className="tile-container" id="patronage1">
                        <img className="text__tile-image" id="patronage1" alt=""/>
                        <div className="text__tile-title">
                            Patronat Naukowy
                        </div>
                        <div className="text__tile-description">
                            marchewka lorem ipsum, kino jest zdjęciem, zycie jest bledem elo.
                        </div>
                        <div className="text__tile-checkit">Sprawdź!</div>
                    </div>
                </div>
            </div>
        </div>
    );
}