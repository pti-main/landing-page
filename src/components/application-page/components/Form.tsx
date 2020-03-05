import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Link } from 'react-router-dom';
import { useTransition, animated } from 'react-spring';

import Logo from "../../shared/components/Logo";

import Tiles from "./form-components/Tiles";
import SecondStage from './form-components/SecondStage';
import ProgressButtons from './form-components/ProgressButtons';
import Summary from './form-components/Summary';
import Sent from './form-components/Sent';

const INIT_TILES = [{
		name: "Programowanie Aplikacji",
		selected: false,
		icon: <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" role="img" viewBox="0 0 640 512"><path fill="currentColor" d="M278.9 511.5l-61-17.7c-6.4-1.8-10-8.5-8.2-14.9L346.2 8.7c1.8-6.4 8.5-10 14.9-8.2l61 17.7c6.4 1.8 10 8.5 8.2 14.9L293.8 503.3c-1.9 6.4-8.5 10.1-14.9 8.2zm-114-112.2l43.5-46.4c4.6-4.9 4.3-12.7-.8-17.2L117 256l90.6-79.7c5.1-4.5 5.5-12.3.8-17.2l-43.5-46.4c-4.5-4.8-12.1-5.1-17-.5L3.8 247.2c-5.1 4.7-5.1 12.8 0 17.5l144.1 135.1c4.9 4.6 12.5 4.4 17-.5zm327.2.6l144.1-135.1c5.1-4.7 5.1-12.8 0-17.5L492.1 112.1c-4.8-4.5-12.4-4.3-17 .5L431.6 159c-4.6 4.9-4.3 12.7.8 17.2L523 256l-90.6 79.7c-5.1 4.5-5.5 12.3-.8 17.2l43.5 46.4c4.5 4.9 12.1 5.1 17 .6z"/></svg>
	},
	{
		name: "Administracja sieci",
		selected: false,
		icon: <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" role="img" viewBox="0 0 640 512"><path fill="currentColor" d="M640 264v-16c0-8.84-7.16-16-16-16H344v-40h72c17.67 0 32-14.33 32-32V32c0-17.67-14.33-32-32-32H224c-17.67 0-32 14.33-32 32v128c0 17.67 14.33 32 32 32h72v40H16c-8.84 0-16 7.16-16 16v16c0 8.84 7.16 16 16 16h104v40H64c-17.67 0-32 14.33-32 32v128c0 17.67 14.33 32 32 32h160c17.67 0 32-14.33 32-32V352c0-17.67-14.33-32-32-32h-56v-40h304v40h-56c-17.67 0-32 14.33-32 32v128c0 17.67 14.33 32 32 32h160c17.67 0 32-14.33 32-32V352c0-17.67-14.33-32-32-32h-56v-40h104c8.84 0 16-7.16 16-16zM256 128V64h128v64H256zm-64 320H96v-64h96v64zm352 0h-96v-64h96v64z"/></svg>
	},
	{
		name: "Grafika komputerowa",
		selected: false,
		icon: <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" role="img" viewBox="0 0 512 512"><path fill="currentColor" d="M167.02 309.34c-40.12 2.58-76.53 17.86-97.19 72.3-2.35 6.21-8 9.98-14.59 9.98-11.11 0-45.46-27.67-55.25-34.35C0 439.62 37.93 512 128 512c75.86 0 128-43.77 128-120.19 0-3.11-.65-6.08-.97-9.13l-88.01-73.34zM457.89 0c-15.16 0-29.37 6.71-40.21 16.45C213.27 199.05 192 203.34 192 257.09c0 13.7 3.25 26.76 8.73 38.7l63.82 53.18c7.21 1.8 14.64 3.03 22.39 3.03 62.11 0 98.11-45.47 211.16-256.46 7.38-14.35 13.9-29.85 13.9-45.99C512 20.64 486 0 457.89 0z"/></svg>
	},
	{
		name: "Web development",
		selected: false,
		icon: <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" role="img" viewBox="0 0 512 512"><path fill="currentColor" d="M464 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V80c0-26.51-21.49-48-48-48zM224 416H64V160h160v256zm224 0H288V160h160v256z"/></svg>
	}
];

const Form = (props:any) => {
	const [ selectedProfile, setSelectedProfile ] = useState(null); //useless (?)
	const [ currentStage, setCurrentStage ] = useState(0);  //will be used for animating
	const [ display, setDisplay ] = useState(true);  //also will be used for animating
	const [ tiles, setTiles ] = useState(INIT_TILES);

	const 

	const handleTileClick = (option:string) => {
		//again, useless?
		setSelectedProfile(option)
	} // done, nice to zrobiles

	let stages = [
		<Tiles tiles={tiles} onClick={handleTileClick}/>,
		<SecondStage/>,
		<Summary/>,
		<Sent success={false}/>
	];
	//idk gdzie jest blad ale nie dziala aplikuj xD
	const handleButtonClick = (action:string, stagesAmount:number) => {
		if (action === "next" && currentStage + 1 >= stagesAmount) // nocotam 
			return;
		setDisplay(false);
		
		setTimeout(() => {
			//useless will be handled by react-spring, rule: no timeouts
			if (action === "next")
				setCurrentStage((oldState:any) => ((oldState + 1) >= stagesAmount - 1 ) ? stagesAmount - 1 : oldState + 1 )
			else if (action === "prev")
				setCurrentStage((oldState:any) => ((oldState - 1) <= 0) ? 0 : oldState - 1 )
			setDisplay(true)
		}, 350);
	}
	
	return (
		<div id="form">
			<div className="container">
				<Link to="/">
					<Logo darkVariant={props.darkTheme}/>
				</Link>

				{ (currentStage + 1) <= (stages.length - 2) &&
					<CSSTransition
							in={display}
							timeout={350}
							classNames="fade"
							appear>
						<span className="formState">{`${currentStage + 1} / ${stages.length - 2} questions`}</span>
					</CSSTransition>}

				<div className="stage">
					<CSSTransition
						in={display}
						timeout={350}
						classNames="stage"
						appear>
							{ stages[currentStage] }
					</CSSTransition>
				</div>

				<div>
					<CSSTransition
							in={display}
							timeout={350}
							classNames="fade"
							appear>
							<div>
								<ProgressButtons selectedProfile={selectedProfile} handleButtonClick={handleButtonClick} currentStage={currentStage} stagesLength={stages.length}/>
							</div>
					</CSSTransition>
				</div>

			</div>
		</div>
	);
}
export default Form;