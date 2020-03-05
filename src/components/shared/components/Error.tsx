import React, { useEffect } from 'react';

const Error = (props:any) => {
    let redirectTimeout:any;

    useEffect(() => {
        return () => clearTimeout(redirectTimeout);
    }, [redirectTimeout]);

    let redirectToMainPage = () => {
        redirectTimeout = window.setTimeout(() => props.history.push("/"), 5000);
    }

    return (
        <div className="error__wrapper">
            <div className="error__whilst__loading">
                <svg className="error__svg" x="0px" y="0px" viewBox="0 0 512 512">
                    <path d="M506.483,436.998L302.349,28.65C293.515,10.978,275.755,0,256,0s-37.515,10.978-46.35,28.65L5.518,436.998    c-8.091,16.184-7.242,35.035,2.27,50.426C17.299,502.812,33.777,512,51.866,512h408.268c18.089,0,34.566-9.187,44.078-24.576    C513.724,472.033,514.573,453.182,506.483,436.998z M470.186,466.394c-1.041,1.685-4.107,5.606-10.053,5.606H51.866    c-5.946,0-9.011-3.921-10.053-5.606c-1.042-1.687-3.18-6.185-0.518-11.51L245.428,46.536C248.377,40.637,253.804,40,256,40    c2.196,0,7.623,0.637,10.572,6.536l204.133,408.349C473.366,460.209,471.228,464.707,470.186,466.394z"/>
                    <path d="M256,180.063c-11.046,0-20,8.954-20,20v126.12c0,11.046,8.954,20,20,20s19.999-8.954,20-19.999V200.063    C276,189.017,267.046,180.063,256,180.063z"/>
                    <circle cx="255.99" cy="396.19" r="27"/>
                </svg>
                <div className="error__message">
                    Jest problem z połączeniem się z bazą danych. Przekierujemy cię do strony głównej.
                </div>
                { props.redirect && redirectToMainPage() }
            </div>
        </div>
    );
};

export default Error;