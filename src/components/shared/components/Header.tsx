import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import Logo from "./Logo";

const Header = (props:any) => {
    const [ menuOpened, setMenuOpened ] = useState(false);
    const [ scrolled, setScrolled ] = useState(false);
    const [ navClasses, setNavClasses ] = useState("");

    let resizeHandler = () => {
        if (window.innerWidth >= 768)
            document.querySelector('html').classList.remove("disable-scroll");
    }

    const scrollHandler = () => {
        let classes:string = (window.scrollY > 90 || props.transparent) ? "header-scrolled" : "";
        if ((!props.transparent ? window.scrollY > 90 : true) && !props.darkTheme) classes += " white";
        if (navClasses !== classes)
            setNavClasses(classes);
        if (scrolled !== (window.scrollY > 90))
            setScrolled((window.scrollY > 90));
    }

    const menu = (open:boolean) => {
        if (window.innerWidth > 768)
            return;
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

    const hideMenuHandler = () => menu(false);

    return (
        <header className={navClasses}>
            <nav id="nav" className="container">

                <HashLink to="/#hero" scroll={hashScrollHandler}>
                    <Logo scrolled={(props.transparent ? true : scrolled)} darkVariant={props.darkTheme} />
                </HashLink>
                
                <div className={`nav__menu-open${(menuOpened) ? " menu--opened" : ""}`} onClick={() => menu(!menuOpened)}>
                    <div className="bar"/>
                    <div className="bar"/>
                    <div className="bar"/>
                </div>


                <ul className={`nav__menu${(menuOpened) ? " menu--opened" : ""}`}>

                    <HashLink onClick={hideMenuHandler} to="/#informations" scroll={hashScrollHandler}>
                        <span className="header-button">Informacje</span>
                    </HashLink>
                        
                    
                    <Link onClick={hideMenuHandler} to="/galeria">
                        <span className="header-button">Galeria</span>
                    </Link>


                    <Link onClick={hideMenuHandler} to="/aktualnosci">
                        <span className="header-button">Aktualności</span>
                    </Link>

                    <HashLink onClick={hideMenuHandler} to="/#contact" scroll={hashScrollHandler}>
                        <span className="header-button">Kontakt</span>
                    </HashLink>

                    <Link onClick={hideMenuHandler} to="/aplikuj">
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