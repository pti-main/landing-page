import React from 'react';
import { version, prealpha } from '../../../../package.json';

export default class Contact extends React.Component<any, any> {
    constructor(props:any) {
        super(props);

        this.state = {
            mapsHref: (((navigator.platform.indexOf("iPhone") != -1) || 
                        (navigator.platform.indexOf("iPad") != -1) || 
                        (navigator.platform.indexOf("iPod") != -1) ||
                        (navigator.platform.indexOf("Mac") != -1)) ? 
                
                        "maps://" : 
                        "https://") 
                        
                        + "maps.google.com/maps?q=43-300+Bielsko-Biała,+ul.+Legionów+81"
        }
    }

    render() {
        return(
            <div id="contact">
                <div className="container">
                    <div className="title">
                        Kontakt
                    </div>
                    <div className="description">
                        testowy opis zobaczyc jak to wyjdzie: marchewka lorem ipsum kino jest zdjęciem, zycie jest bledem elo. -- testowy opis zobaczyc jak to wyjdzie: marchewka lorem ipsum kino jest zdjęciem, zycie jest bledem elo.
                    </div>
                    <div className="form-grid">
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
                        <div className="nav-post">
                            <div className="nav-title">
                                Lorem Ipsum
                            </div>
                            <div className="nav-description">
                                marchewka lorem ipsum kino jest zdjęciem, zycie jest bledem elo, marchewka lorem ipsum kino jest zdjęciem, zycie jest bledem elo, marchewka lorem ipsum kino jest zdjęciem, zycie jest bledem elo.
                            </div>
                        </div>

                        <div className="nav-post">
                            <div className="nav-title">
                                Dane kontaktowe
                            </div>
                            <div className="nav-description">
                                <span className="contact-email">
                                    <a className="contact-link" href="mailto:pti.bielsko@gmail.com">pti.bielsko@gmail.com</a>
                                </span>
                                
                                <span className="contact-phonenumber">
                                    <a className="contact-link" href="tel:+48608413233">+48 608 413 233</a>
                                </span>

                                <span className="contact-phonenumber">
                                    <a className="contact-link" href="tel:+48328229070">+48 32 82 290 70</a>
                                </span>

                                <span className="contact-address">
                                    <a className="contact-link" href={this.state.mapsHref}>
                                        43-300 Bielsko-Biała,<br/>
                                        ul. Legionów 81
                                    </a>
                                </span>
                                
                                <div className="baseDeltaEgg" dangerouslySetInnerHTML={{__html: `<!-- PGxpY3plbmllRGVsdHk+IAogICAg4oiGID0gYl4yIC0gNGFjCiAgICDiiIYgPSAwIC0gNCAqIDggKC0gMikgPSA2NCAo4oiGIGRvZGF0bmlhID0+IDIgbWllanNjYSB6ZXJvd2UpCiAgICB4MSA9ICgwIC0g4oia4oiGKS8xNiA9IC0xLzI7CiAgICB4MiA9ICgwICsg4oia4oiGKS8xNiA9IDEvMjsKPC9saWN6ZW5pZURlbHR5Pg== -->`}}/>
                            </div>
                        </div>
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
}