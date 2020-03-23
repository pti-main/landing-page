import React from 'react';

function Logo({darkVariant, scrolled}:any) {
    let logo_url;
    if (darkVariant) {
        logo_url = "/img/logo_pti.png";
    } else {
        logo_url = ((scrolled || scrolled === undefined) ? "/img/logo_pti-dark.png" : "/img/logo_pti.png");
    }

    return (
        <div className="logo">
            <img src={logo_url} alt="Logo PTI" />
        </div>
    );
}

export default React.memo(Logo);