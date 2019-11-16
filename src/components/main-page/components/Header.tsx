import React from 'react';
import { Link } from "react-scroll";

export default class Header extends React.Component<any, any> {
    constructor(props:any) {
        super(props);
        
        this.state = {
            panelURI: null, //"https://" + window.location.hostname,
            scrolled: (window.scrollY > 90) ? "header-scrolled" : "",
            menuOpened: false,
            openTimeout: null,
            offset: null
        };

        window.addEventListener("resize", () => {
            if (window.innerWidth >= 840)
                document.getElementsByClassName('nav__menu')[0].setAttribute('style', 'transition: none; display: flex;');
        });
        
        window.addEventListener('scroll', () => {
            this.setState({
                scrolled: (window.scrollY > 90) ? "header-scrolled" : ""
            });
        });
        
    }

    componentDidMount(){
        this.setState({offset: -document.getElementsByTagName("header")[0].clientHeight});
    }

    menu(open:boolean) {
        if (window.innerWidth <= 840) {
            if (open) {
                document.getElementsByClassName('nav__menu')[0].setAttribute('style', 'display: flex;');
                setTimeout(() => {
                    document.getElementsByClassName('nav__menu')[0].classList.add('menu--opened');
                    document.getElementsByClassName('nav__menu-open')[0].classList.add('menu--opened');
                    // document.querySelectorAll(".nav__menu-open .bar").forEach((el) => el.setAttribute('style', 'background: #1d1e22;'));
                }, 50);
            } else {
                document.getElementsByClassName('nav__menu')[0].classList.remove('menu--opened');
                document.getElementsByClassName('nav__menu-open')[0].classList.remove('menu--opened');
                
                clearTimeout(this.state.openTimeout);

                // document.querySelectorAll(".nav__menu-open .bar").forEach((el) => el.setAttribute('style', ''));
                this.setState({
                    openTimeout: setTimeout(() => document.getElementsByClassName('nav__menu')[0].setAttribute('style', 'display: none;'), 650)
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
                    <div className="logo" onClick={()=>{window.location.pathname = "/"}}>
                        <img src="./img/logo_pti.png" alt=""/>
                    </div>
                    
                    <div className="nav__menu-open" onClick={() => this.menu((!this.state.menuOpened))}>
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                    </div>

                    <ul className="nav__menu">
                        <Link to="informations" spy={true} onClick={() => this.menu(false)} smooth="easeInOutCubic" offset={this.state.offset} duration={700}>
                            <span className="header-button">Informacje</span>
                        </Link>
                        
                        <Link to="gallery" spy={true} smooth="easeInOutCubic" offset={this.state.offset} duration={700}>
                            <span className="header-button">Galeria</span>
                        </Link>

                        <Link to="contact" spy={true} smooth="easeInOutCubic" offset={this.state.offset} duration={700}>
                            <span className="header-button">Kontakt</span>
                        </Link>

                        <Link to="application" spy={true} smooth="easeInOutCubic" offset={this.state.offset} duration={700}>
                            <span className="header-button">Aplikuj</span>
                        </Link>

                        {/* TODO: tutaj chyba musi nastąpić redirect do innego serwera, bo stare eventlistenery dalej dzialaja */}
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