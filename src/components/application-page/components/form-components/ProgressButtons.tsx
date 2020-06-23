import React from 'react';
import {Link} from 'react-router-dom';

function ProgressButtons(props:any) {
    let arrowRight: JSX.Element = <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" viewBox="0 0 256 512"><path fill="currentColor" d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"/></svg>;
    let	arrowLeft: JSX.Element = <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" viewBox="0 0 256 512"><path fill="currentColor" d="M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z"/></svg>;
    
    let buttons: JSX.Element[] = [];
    let isOnLastPage:boolean = (props.currentStage === props.stagesLength - 1);
    let isOnSubmitPage:boolean = (props.currentStage === props.stagesLength - 2);

    let nextButton:JSX.Element = (
        <div className={`next button${isOnSubmitPage ? " submit" : ""}${(props.enabled[props.currentStage]) ? "" : " disabled"}`} onClick={_ => props.handleButtonClick('next', props.stagesLength)}>
          <span className="text">{isOnLastPage ? "Strona główna" : isOnSubmitPage ? "Zatwierdź" : "Dalej"}</span>
          <span className="arrow">{arrowRight}</span>
        </div>);

    if ( props.currentStage > 0 && !isOnLastPage) //back button
        buttons.push(
            <div key={"back"} className="prev button" onClick={_ => props.handleButtonClick('prev', props.stagesLength)}>
                <span className="arrow">{arrowLeft}</span>
                <span className="text">Wróć</span>
            </div>
        );
    
    buttons.push(
        <div key="nextElement">
            {isOnLastPage ? 
                <Link style={{textDecoration: "none"}} key={"nextLink"} to={"/"}>{nextButton}</Link> : 
                nextButton}
        </div>
    );
    
    return (
        <div className="buttons">
            { buttons }
        </div>
    );
}

export default React.memo(ProgressButtons);