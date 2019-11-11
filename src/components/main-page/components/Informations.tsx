import React from 'react';

export default class Informations extends React.Component<any, any> {
    render() {
        return (
            <div id="informations" className="informations__background"> 
                <div className="container">
                    <span className="section__name">Informacje</span>
                    <div className="companies__quotes">
                        <div className="quote__container">
                            <span className="quote__span">
                                Programowanie aplikacji webowych otwiera drogę do podjęcia pracy w najlepszych firmach informatycznych w Polsce i na świecie. Razem z naszymi programistami podczas zajęć w PTI i w Selleo uczniowie poznają tajniki branży IT oraz mają szansę podjęcia zatrudnienia zaraz po zakończeniu szkoły.
                            </span>
                            <div className="quote__profile">
                                
                                <div className="quote__company" onClick={() => {window.location.href = "https://selleo.com";}} id="selleo"></div>
                                
                                <div className="quote__person">
                                    <a href="https://selleo.com/people/dariusz-wylon">
                                        <span className="quote__author">
                                            Dariusz Wylon
                                        </span>
                                    </a>
                                    <span className="quote__desc">
                                        CCO Selleo
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="quote__container">
                            <span className="quote__span">
                                Dzięki współpracy z Uczelnią uczniowie technikum mają dostęp do kadry profesorskiej i laboratoriów akademickich. Realizując pod okiem naszych wykładowców program rozszerzony z informatyki, mogą zaliczyć część przedmiotów prowadzonych w ramach studiów inżynierskich.
                            </span>
                            <div className="quote__profile">
                                <a href="https://wsi.edu.pl">
                                    <img className="quote__company" id="wsiz" src="/img/companies/wsiz.png" alt=""/>
                                </a>
                                <div className="quote__person">
                                    <span className="quote__author">
                                        Piotr Marecki
                                    </span>
                                    <span className="quote__desc">
                                        Rektor WSIZ
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="quote__container">
                            <span className="quote__span">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi corrupti placeat veniam, ullam tenetur aperiam eveniet odio consequuntur? Eaque, perspiciatis quod necessitatibus ipsum voluptates repellat nulla suscipit, consequuntur nobis corrupti accusamus accusantium, id praesentium rerum.
                            </span>
                            <div className="quote__profile">
                                <a href="https://rekord.com.pl">
                                    <img className="quote__company" id="rekord" src="/img/companies/rekord.png" alt=""/>
                                </a>
                                <div className="quote__person">
                                    <span className="quote__author">
                                        N/A
                                    </span>
                                    <span className="quote__desc">
                                        Rekord
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="quote__container">
                            <span className="quote__span">
                                Polski rynek gier komputerowych wart jest ponad 500 mln dolarów. W ramach naszej specjalizacji będziemy pokazywać uczniom jak tworzyć gry i grafikę 3D, aby w przyszłości mogli podjąć pracę w tej dziedzinie.
                            </span>
                            <div className="quote__profile">
                                <a href="https://4experience.co">
                                    <img className="quote__company" id="exp" src="/img/companies/4experience.png" alt=""/>
                                </a>
                                <div className="quote__person">
                                    <span className="quote__author">
                                        Arkadiusz Kwaśny
                                    </span>
                                    <span className="quote__desc">
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