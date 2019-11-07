import React from 'react';
import { version } from '../../../../package.json';

export default function Footer() {
    return(
        <div id="footer">
            <span>{version}</span>
        </div>
    );
}