import React from 'react';
import config from '../../../../package.json';

export default function Footer() {
    return(
        <div id="footer">
            <span>asasas span czy sie cos zmieni czy nie bo nie wiem xddd</span>
            <span className="build-version">{config.version}</span>
        </div>
    );
}