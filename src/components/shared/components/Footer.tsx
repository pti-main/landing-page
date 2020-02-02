import React from 'react';
import { showVersion ,version, prealpha } from '../../../../package.json';

export default class Footer extends React.Component<any, any> {

    setCookie = (name:string, value:boolean) => 
      document.cookie = name + "=" + (value || "") + ";path=/";
  
    getCookie(name:string) {
      let cookies = document.cookie.split(';');
      for (let i in cookies) {
          let c = cookies[i];

          while (c.charAt(0) === ' ') 
              c = c.substring(1, c.length);

          if (c.indexOf(name) === 0) 
              return (c.substring(`${name}=`.length,c.length) === "true") ? true : false;
      }
      return null;
    }

    render() {
      return (
        <footer id="pti_footer" onClick={this.props.onClick}>
            {(showVersion) ? <span className="build-version">{version} {(prealpha) ? "PREALPHA VERSION" : null}</span> : null}
				<div className="dark-theme__input">
					<input id="themeChanger" type="checkbox" defaultChecked={this.getCookie('darkmode') || false} onChange={e => {
            //this.setCookie('darkmode', e.currentTarget.checked);
            
            //document.querySelector('header').classList[(e.currentTarget.checked)? 'remove' : 'add']('white');
						
						//document.body.classList[(e.currentTarget.checked) ? 'add' : 'remove']("dark-theme");
					}}/>
					<label htmlFor="themeChanger">dark-theme</label>
				</div>
        </footer>
      )
    }
}