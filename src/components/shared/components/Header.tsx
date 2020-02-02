import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

const Header = (props:any) => {
    const [ menuOpened, setMenuOpened ] = useState(false);
    const [ navClasses, setNavClasses ] = useState("");

    let nav__menu = useRef(null);
    let nav__button = useRef(null);

    let resizeHandler = () => {
        if (window.innerWidth >= 768)
            document.querySelector('html').classList.remove("disable-scroll");
    }

    const scrollHandler = () => {
        let classes:string = (window.scrollY > 90 || props.transparent) ? "header-scrolled" : "";
        if ((!props.transparent ? window.scrollY > 90 : true) && !props.darkTheme) classes += " white";
        if (navClasses !== classes)
            setNavClasses(classes);
    }

    const menu = (open:boolean) => {
        if (window.innerWidth > 768) 
            return;

        let action:string = (open) ? "add" : "remove";
        
        nav__menu.current.classList[action]('menu--opened');
        nav__button.current.classList[action]('menu--opened');
        
        if (open)
            document.querySelector('html').classList.add("disable-scroll");
        else
            document.querySelector('html').classList.remove("disable-scroll");
        
        setMenuOpened(open);
    }

    scrollHandler();

    useEffect(() => {
        
        document.querySelector('html').classList.remove("disable-scroll");

        window.addEventListener("resize", resizeHandler, false);
        if (!props.transparent) window.addEventListener('scroll', scrollHandler, false);
        return () => {
            window.removeEventListener("resize", resizeHandler, false);
            if (!props.transparent) window.removeEventListener('scroll', scrollHandler, false);
        }
    });

    const hashScrollHandler = (el:any) => {
        if ((el.getBoundingClientRect().top - 75) !== 0)
            window.scrollTo({
                behavior: "smooth",
                top: el.getBoundingClientRect().top + window.pageYOffset - 75
            });
    }

    return (
        <header className={navClasses}>
            <nav id="nav" className="container">

                <HashLink to="/#hero" scroll={hashScrollHandler}>
                    <div className="logo">
                        <img alt="Logo PTI"/>
                    </div>
                </HashLink>
                
                <div ref={nav__button} className="nav__menu-open" onClick={() => menu(!menuOpened)}>
                    <div className="bar"/>
                    <div className="bar"/>
                    <div className="bar"/>
                </div>


                <ul ref={nav__menu} className="nav__menu">

                    <HashLink to="/#informations" scroll={hashScrollHandler}>
                        <span className="header-button">Informacje</span>
                    </HashLink>
                        
                    
                    <Link to="/galeria">
                        <span className="header-button">Galeria</span>
                    </Link>


                    <Link to="/aktualnosci">
                        <span className="header-button">Aktualności</span>
                    </Link>

                    <HashLink to="/#contact" scroll={hashScrollHandler}>
                        <span className="header-button">Kontakt</span>
                    </HashLink>

                    <Link to="/aplikuj">
                        <button className="panel-login">
                            Aplikuj
                        </button>
                    </Link>
                </ul>
            </nav>
        </header>
    );
}
export default Header;