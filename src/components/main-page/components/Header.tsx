import React from 'react';
import { Link } from "react-scroll";

export default class Header extends React.Component<any, any> {
    constructor(props:any) {
        super(props);
        
        this.state = {
            panelURI: null, //"https://" + window.location.hostname,
            scrolled: (window.scrollY > 90) ? "header__scrolled" : "",
            menuOpened: false,
            openTimeout: null
        };

        window.addEventListener("resize", () => {
            if (window.innerWidth >= 840)
                document.querySelectorAll('.nav__menu')[0].setAttribute('style', 'transition: none; display: flex;');
        });
        
        window.addEventListener('scroll', () => {
            this.setState({
                scrolled: (window.scrollY > 90) ? "header__scrolled" : ""
            });
        });
    }
    
    menu(open:boolean) {
        if (window.innerWidth <= 840) {
            if (open) {
                document.querySelectorAll('.nav__menu')[0].setAttribute('style', 'display: flex;');
                setTimeout(() => {
                    document.querySelectorAll('.nav__menu')[0].classList.add('opened');
                    document.querySelectorAll('.menu__open')[0].classList.add('opened');
                    // document.querySelectorAll(".menu__open .bar").forEach((el) => el.setAttribute('style', 'background: #1d1e22;'));
                }, 50);
            } else {
                document.querySelectorAll('.nav__menu')[0].classList.remove('opened');
                document.querySelectorAll('.menu__open')[0].classList.remove('opened');
                
                clearTimeout(this.state.openTimeout);
                // document.querySelectorAll(".menu__open .bar").forEach((el) => el.setAttribute('style', ''));
                this.setState({
                    openTimeout: setTimeout(() => document.querySelectorAll('.nav__menu')[0].setAttribute('style', 'display: none;'), 650)
                });
            }
            this.setState({
                menuOpened: !this.state.menuOpened
            });
        }
    }
    
    render() {

        return (
            <header className={this.state.scrolled}>
                <nav id="nav" className="container">
                    <div className="logo">
                        <img src="./img/logo_pti.png" alt=""/>
                    </div>
                    
                    <div className="menu__open" onClick={() => this.menu((!this.state.menuOpened))}>
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                    </div>

                    <ul className="nav__menu">
                        <Link to="informations" spy={true} onClick={() => this.menu(false)} smooth="easeInOutCubic" offset={-75} duration={700}>
                            <span className="header-button">Informacje</span>
                        </Link>
                        
                        <Link to="gallery" spy={true} smooth="easeInOutCubic" offset={-75} duration={700}>
                            <span className="header-button">Galeria</span>
                        </Link>

                        <Link to="contact" spy={true} smooth="easeInOutCubic" offset={-75} duration={700}>
                            <span className="header-button">Kontakt</span>
                        </Link>

                        <Link to="application" spy={true} smooth="easeInOutCubic" offset={-75} duration={700}>
                            <span className="header-button">Aplikuj</span>
                        </Link>

                        {/* tutaj chyba musi nastąpić redirect do innego serwera, bo stare eventlistenery dalej dzialaja */}
                        <a href={this.state.panelURI} style={{textDecoration: 'none'}}>
                            <button className="panel-login" title="Funkcja 'Zaloguj' będzie prowadziła do panelu użytkownika.
                            Panel zostanie wprowadzony w nowszej wersji strony.">
                                Zaloguj
                            </button>
                        </a>
                    </ul>
                </nav>
            </header>
        );
    }
}