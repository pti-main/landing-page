import React from 'react';

const Loader = () => {
    return (
        <div className="loader__wrapper">
            <div className="pti__loader">
                <div className="loader__text" style={{textAlign: "center", opacity: .4, fontSize: "1.3rem"}}>
                    Ładowanie...
                </div>
                <svg className="loader__svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                    <circle cx="50" cy="50" r="30" strokeWidth="5" strokeDasharray="47.12388980384689 47.12388980384689" fill="none" strokeLinecap="round" transform="rotate(244.994 50 50)">
                    <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" keyTimes="0;1" values="0 50 50;360 50 50"/>
                    </circle>
                </svg>
            </div>
        </div>
    );
};

export default Loader;