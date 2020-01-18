import React from 'react';
import { showVersion ,version, prealpha } from '../../../../package.json';

export default class Footer extends React.Component<any, any> {
    render() {
      return (
        <footer id="pti_footer">
            {(showVersion) ? <span className="build-version">{version} {(prealpha) ? "PREALPHA VERSION" : null}</span> : null}
				<div className="dark-theme__input">
					<input id="themeChanger" type="checkbox" defaultChecked={true} onChange={e => {
						if (e.currentTarget.checked)
							document.body.classList.add("dark-theme");
						else
							document.body.classList.remove("dark-theme");
					}}/>
					<label htmlFor="themeChanger">dark-theme</label>
				</div>
        </footer>
      )
    }
}