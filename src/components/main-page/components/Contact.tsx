import React from 'react';
import { version, prealpha } from '../../../../package.json';

export default function Contact() {
    return(
        <div id="contact">
            <div className="container">
                <div className="title">
                    Kontakt
                </div>
                <div className="description">
                    testowy opis zobaczyc jak to wyjdzie: marchewka lorem ipsum kino jest zdjęciem, zycie jest bledem elo. -- testowy opis zobaczyc jak to wyjdzie: marchewka lorem ipsum kino jest zdjęciem, zycie jest bledem elo.
                </div>

                <form action="#footer" onSubmit={() => {
                        let a = new Array();
                        document.querySelectorAll('input').forEach(d => a.push(d.classList, d.value));
                        alert(a);
                    }}>
                    <input className="input-title" type="text" placeholder="Tytuł"/>
                    <input className="input-email" required type="email" 
                        onChange={(e) => (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)+$/.test(e.currentTarget.value) || e.currentTarget.value == "") ? e.currentTarget.classList.remove('input-error') : e.currentTarget.classList.add('input-error')}
                        autoComplete="on" placeholder="E-Mail"/>
                    
                    <input className="input-tel" maxLength={12} minLength={9} 
                        onChange={(e) => (/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(e.currentTarget.value)|| e.currentTarget.value == "") ? e.currentTarget.classList.remove('input-error') : e.currentTarget.classList.add('input-error')}
                            type="tel" placeholder="Telefon"/>

                    <textarea className="input-message" required minLength={15} 
                        onChange={(e) => (e.currentTarget.value.length > 15 || e.currentTarget.value == "") ? e.currentTarget.classList.remove('input-error') : e.currentTarget.classList.add('input-error')}
                        placeholder="Wiadomość"/>
                        
                    <button type="submit" className="input-button">Wyślij</button>
                    <span className="input-privacy">
                        marchewka lorem ipsum kino jest zdjęciem, <a href="#privacy">zycie jest bledem</a> elo.
                    </span>
                </form>

                <div className="right-nav">
                    <div className="nav-title">
                        Lorem Ipsum
                    </div>
                    <div className="nav-description">
                        marchewka lorem ipsum kino jest zdjęciem, zycie jest bledem elo, marchewka lorem ipsum kino jest zdjęciem, zycie jest bledem elo, marchewka lorem ipsum kino jest zdjęciem, zycie jest bledem elo.
                    </div>
                </div>
            </div>



            <span className="build-version">{version} {(prealpha) ? "PREALPHA VERSION" : null}</span>
            <div className="dark-theme__input">
                <input id="themeChanger" type="checkbox" defaultChecked={true} onChange={e => {
                    if (e.currentTarget.checked)
                        document.body.classList.add("dark-theme");
                    else
                        document.body.classList.remove("dark-theme");
                }}/>
                <label htmlFor="themeChanger">dark-theme</label>
            </div>
        </div>
    );
}