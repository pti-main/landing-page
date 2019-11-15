import React from 'react';
import { version } from '../../../../package.json';

export default function Footer() {
    return(
        <div id="footer">
            <span>{version}</span>
            <div style={{float: "right"}} className="dark-theme__input">
                <input type="checkbox" defaultChecked={true} onChange={e => {
                    if (e.currentTarget.checked)
                        document.body.classList.add("dark-theme");
                    else
                        document.body.classList.remove("dark-theme");
                }}/>
                dark-theme
            </div>
        </div>
    );
}