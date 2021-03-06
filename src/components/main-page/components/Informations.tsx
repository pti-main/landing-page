import React from 'react';

export default class Informations extends React.Component<any, any> {
    render() {
        return (
            <div id="informations" className="informations__background"> 
                <div className="container">
                    <span className="section-name">Informacje</span>
                    <div className="companies-quotes">
                        <div className="quote-container">
                            <span className="quote-span">
                                Programowanie aplikacji webowych otwiera drogę do podjęcia pracy w najlepszych firmach informatycznych w Polsce i na świecie. Razem z naszymi programistami podczas zajęć w PTI i w Selleo uczniowie poznają tajniki branży IT oraz mają szansę podjęcia zatrudnienia zaraz po zakończeniu szkoły.
                            </span>
                            <div className="quote-profile">
                                <a className="selleo-a" href="https://selleo.com">
                                    <div className="quote-company" id="selleo"></div>
                                </a>
                                <div className="quote-person">
                                    <a href="https://selleo.com/people/dariusz-wylon">
                                        <span className="quote-author">
                                            Dariusz Wylon
                                        </span>
                                    </a>
                                    <span className="quote-desc">
                                        CCO Selleo
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="quote-container">
                            <span className="quote-span">
                                Dzięki współpracy z Uczelnią uczniowie technikum mają dostęp do kadry profesorskiej i laboratoriów akademickich. Realizując pod okiem naszych wykładowców program rozszerzony z informatyki, mogą zaliczyć część przedmiotów prowadzonych w ramach studiów inżynierskich.
                            </span>
                            <div className="quote-profile">
                                <a href="https://wsi.edu.pl">
                                    <img className="quote-company" id="wsiz" src="/img/companies/wsiz.png" alt=""/>
                                </a>
                                <div className="quote-person">
                                    <span className="quote-author">
                                        Piotr Marecki
                                    </span>
                                    <span className="quote-desc">
                                        Rektor WSIZ
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="quote-container">
                            <span className="quote-span">
                                Marchewka lorem ipsum dolor sit amet, consectetur adipiscing elit. Nic nie jest smutny, ból elementem marchew. Lub zbiornik wygoda mikrofalowa. DUIs placerat ENIM id sodales Magna auctor. Fotografia filmu.
                            </span>
                            <div className="quote-profile">
                                <a href="https://rekord.com.pl">
                                    <img className="quote-company" id="rekord" src="/img/companies/rekord.png" alt=""/>
                                </a>
                                <div className="quote-person">
                                    <span className="quote-author">
                                        Albert Einstein
                                    </span>
                                    <span className="quote-desc">
                                        Rekord
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="quote-container">
                            <span className="quote-span">
                                Polski rynek gier komputerowych wart jest ponad 500 mln dolarów. W ramach naszej specjalizacji będziemy pokazywać uczniom jak tworzyć gry i grafikę 3D, aby w przyszłości mogli podjąć pracę w tej dziedzinie.
                            </span>
                            <div className="quote-profile">
                                <a href="https://4experience.co">
                                    <img className="quote-company" id="exp" src="/img/companies/4experience.png" alt=""/>
                                </a>
                                <div className="quote-person">
                                    <span className="quote-author">
                                        Arkadiusz Kwaśny
                                    </span>
                                    <span className="quote-desc">
                                        CEO 4Experience
                                    </span>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        );
    }
}