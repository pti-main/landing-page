import React from 'react';
import { Link } from "react-scroll";

export default class Header extends React.Component<any, any> {
    constructor(props:any) {
        super(props);
        
        this.state = {
            panelURI: null, //"https://" + window.location.hostname,
            scrolled: (props.transparent) ? "header-scrolled" : (window.scrollY > 90) ? "header-scrolled" : "",
            menuOpened: false,
            openTimeout: null,
            offset: -75
        };


        window.addEventListener("resize", () => {
            if (window.innerWidth >= 840)
                document.getElementsByClassName('nav__menu')[0].setAttribute('style', 'transition: none; display: flex;');
        });

        if (!props.transparent)
            window.addEventListener('scroll', () => {
                this.setState({
                    scrolled: (window.scrollY > 90) ? "header-scrolled" : ""
                });
            });
    }
    
    componentDidMount() {
        if (window.location.hash.includes('-scroll'))
            window.scrollTo({
                top: document.querySelectorAll(window.location.hash.replace('-scroll', ''))[0].getBoundingClientRect().top + this.state.offset,
                behavior: "smooth"
            });
    }

    menu(open:boolean) {
        if (window.innerWidth <= 840) {
            if (open) {
                document.getElementsByClassName('nav__menu')[0].setAttribute('style', 'display: flex;');
                setTimeout(() => {
                    document.getElementsByClassName('nav__menu')[0].classList.add('menu--opened');
                    document.getElementsByClassName('nav__menu-open')[0].classList.add('menu--opened');
                    document.querySelector('html').classList.add("disable-scroll");
                    // document.querySelectorAll(".nav__menu-open .bar").forEach((el) => el.setAttribute('style', 'background: #1d1e22;'));
                }, 50);
            } else {
                document.getElementsByClassName('nav__menu')[0].classList.remove('menu--opened');
                document.getElementsByClassName('nav__menu-open')[0].classList.remove('menu--opened');
                document.querySelector('html').classList.remove("disable-scroll");
                
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
                    <Link to="hero" onClick={() => (window.location.pathname !== "/") ? window.location.pathname = "/" : null} spy={true} duration={700} smooth="easeInOutCubic"> 
                        <div className="logo">
                            <img src="/img/logo_pti.png" alt=""/>
                        </div>
                    </Link>
                    
                    <div className="nav__menu-open" onClick={() => this.menu((!this.state.menuOpened))}>
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                    </div>


                    <ul className="nav__menu">
                        <Link to="informations" spy={true} onClick={() => {
                            if (document.querySelector("#informations") === null)
                                window.location.href = "/#informations-scroll";

                            this.menu(false);
                        }} smooth="easeInOutCubic" offset={this.state.offset} duration={700}> 
                            <span className="header-button">Informacje</span>
                        </Link>
                            
                        
                        <a href="/galeria" style={{textDecoration: 'none'}}>
                            <span className="header-button">Galeria</span>
                        </a>

                        {/* <Link to="application" spy={true} smooth="easeInOutCubic" offset={this.state.offset} duration={700}>
                            <span className="header-button">O szkole</span>
                        </Link> */}

                        <a href="/aktualnosci" style={{textDecoration: 'none'}}>
                            <span className="header-button">Aktualności</span>
                        </a>

                        <Link to="contact" spy={true} onClick={() => {
                            if (document.querySelector("#contact") === null)
                                window.location.href = "/#contact-scroll";
                            
                            this.menu(false)
                        }} smooth="easeInOutCubic" offset={this.state.offset} duration={700}>
                            <span className="header-button">Kontakt</span>
                        </Link>

                        <a href="/aplikuj" style={{textDecoration: 'none'}}>
                            <button className="panel-login">
                                Aplikuj
                            </button>
                        </a>
                    </ul>
                </nav>
            </header>
        );
    }
}