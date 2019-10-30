import React from 'react';
import ReactDOM from 'react-dom';

export default function Header(){
    return (
        <header className="wrapper">
            <nav id="nav">
                <div className="logo"><img src="./content/img/logo.png" alt="jebać ikot"/></div>
                <ul>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </nav>

            <div id="hero__container">
                <h1>Kreatywny tekst</h1>
                <h2>*ikot.edu.pl* opis ale mi emmet nie dziala jprdl</h2>
                <div className="btn"></div>
            </div>
        </header>
    )
}