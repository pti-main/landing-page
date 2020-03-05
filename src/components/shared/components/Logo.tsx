import React from 'react';

function Logo(props:any) {
    let logo_url;
    if (props.darkVariant) {
        logo_url = "/img/logo_pti.png";
    } else {
        logo_url = ((props.scrolled || props.scrolled === undefined) ? "/img/logo_pti-dark.png" : "/img/logo_pti.png");
    }

    return (
        <div className="logo">
            <img src={logo_url} alt="Logo PTI" />
        </div>
    );
}

export default Logo;