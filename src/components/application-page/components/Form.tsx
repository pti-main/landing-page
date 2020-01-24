import React from 'react';

export default class Form extends React.Component<any, any> {
	render() {
		let arrowRight = <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" viewBox="0 0 256 512"><path fill="currentColor" d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"/></svg>;
		let	arrowLeft = <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" viewBox="0 0 256 512"><path fill="currentColor" d="M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z"/></svg>;
		return (
			<div id="form">
				<div className="info">
					Aplikujesz na profil: 
					<span className="link">
						Administrator sieci
					</span>
				</div>
				<div className="centered">
					<div className="progress">0/5 questions</div>
					<div className="title">This is title</div>
					<div className="tiles">
						<div className="tile selected"></div>
						<div className="tile "></div>
						<div className="tile "></div>
					</div>
					<div className="buttons">
						<div className="prev button">
							<span className="arrow">{arrowLeft}</span>
							<span className="text">	
								Wróć
							</span>
						</div>
						<div className="next button">
							<span className="text">	
								Pogczmamp
							</span>
							<span className="arrow">{arrowRight}</span>
						</div>
					</div>
				</div>
			</div>
		);
	}
}