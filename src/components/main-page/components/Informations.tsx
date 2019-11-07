import React from 'react';

export default class Informations extends React.Component<any, any> {
    
    constructor(props:any) {
        super(props);
        this.state = {
            carousel_items_length: 2,
            carousel_timeout_delay: 5000
        };
        window.addEventListener("load", () => setTimeout(() => this.carousel(0), this.state.carousel_timeout_delay));
    }

    carousel(lastInt:number) {

        /* 
        wiadomosc do hacksncode: 
            - carousela nie jest skrocona ani dokonczona, trzeba poprawic animacje itp. ale wstepnie to jest gotowe.
              dodatkowo ta carousela sie dziwnie resizeinguje przy zmienianiu tekstu wiec to tez trzeba zmienic.
            
            - troche namieszalem i zabrudzilem css'a z !importantami, trzeba jeszcze dorobic animacje dla mobileow.
                                                                                                        
                                                                                                            ~ Filip
        */

        document.querySelectorAll(`span#quote_${lastInt}`)[0].setAttribute('style', 'transform: translateX(-200%);');
        setTimeout(() => {
            let quoteSpan = document.querySelectorAll(`span#quote_${lastInt}`)[0],
                previousCompany = document.querySelectorAll(`a[target="${quoteSpan.getAttribute("itemtype")}"]`)[0],
                newInt = (lastInt === this.state.carousel_items_length) ? 0 : lastInt + 1,
                newQuoteSpan = document.querySelectorAll(`span#quote_${newInt}`)[0],
                newCompany = document.querySelectorAll(`a[target="${newQuoteSpan.getAttribute("itemtype")}"]`)[0];
            
            quoteSpan.classList.remove('companies__quotes_active');
            quoteSpan.setAttribute('style', '');

            previousCompany.classList.remove('companies__entry__active');
            newCompany.classList.add('companies__entry__active');

            newQuoteSpan.classList.add('companies__quotes_active');
            setTimeout(() => document.querySelectorAll(`span#quote_${newInt}`)[0].setAttribute('style', 'transform: translateX(0%);'), 10);

            setTimeout(() => this.carousel(newInt), this.state.carousel_timeout_delay);
        }, 250);
    }

    render() {
        return (
            <div id="informations" className="informations__background">         
                <div className="wrapper">
                    <span className="intro">Informacje</span>
                    <span className="companies__quotes">
                        <span id="quote_0" itemType="selleo" style={{transform: "translateX(0%)"}} className="companies__selleo_quote companies__quotes_active">
                            Programowanie aplikacji webowych otwiera drogę do podjęcia pracy w najlepszych firmach informatycznych w Polsce i na świecie. Razem z naszymi programistami podczas zajęć w PTI i w Selleo uczniowie poznają tajniki branży IT oraz mają szansę podjęcia zatrudnienia zaraz po zakończeniu szkoły.
                        </span>
                        <span id="quote_1" itemType="wsiz" className="companies__wsiz_quote">
                            Dzięki współpracy z Uczelnią uczniowie technikum mają dostęp do kadry profesorskiej i laboratoriów akademickich. Realizując pod okiem naszych wykładowców program rozszerzony z informatyki, mogą zaliczyć część przedmiotów prowadzonych w ramach studiów inżynierskich.
                        </span>
                        <span id="quote_2" itemType="4experience" className="companies__4experience_quote">
                            Polski rynek gier komputerowych wart jest ponad 500 mln dolarów. W ramach naszej specjalizacji będziemy pokazywać uczniom jak tworzyć gry i grafikę 3D, aby w przyszłości mogli podjąć pracę w tej dziedzinie.
                        </span>
                    </span>
                    <span className="logos">
                        <a href="https://selleo.com" target="selleo" className="companies__entry__active">
                            <img className="companies__selleo" src="/img/companies/selleo.png" alt=""/>
                            <div className="companies__container">
                                <span className="companies__author">Dariusz Wylon</span>
                                <span className="companies__author__description">CCO Selleo</span>
                            </div>
                        </a>

                        <a href="https://wsi.edu.pl" target="wsiz">
                            <img className="companies__smallIcon" src="/img/companies/wsiz.png" alt=""/>
                            <div className="companies__container">
                                <span className="companies__author">Piotr Marecki</span>
                                <span className="companies__author__description">Rektor WSIZ</span>
                            </div>
                        </a>

                        <a href="http://rekord.com.pl" target="rekord">
                            <img src="/img/companies/rekord.png" alt=""/>
                            <div className="companies__container">
                                <span className="companies__author">Brak danych</span>
                                <span className="companies__author__description">CEO Rekord</span>
                            </div>
                        </a>

                        <a href="https://4experience.co" target="4experience">
                            <img className="companies__smallIcon" src="/img/companies/4experience.png" alt=""/>
                            <div className="companies__container">
                                <span className="companies__author">Arkadiusz Kwaśny</span>
                                <span className="companies__author__description">CEO 4Experience</span>
                            </div>
                        </a>
                    </span>
                </div>
            </div>
        );
    }
}