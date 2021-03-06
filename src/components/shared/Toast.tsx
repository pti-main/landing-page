import React from 'react';
import { useSpring, animated } from 'react-spring';

const Toast = ({active, success, message, onClick}:any) => {
    let crossSign:JSX.Element = <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" role="img" viewBox="0 0 352 512"><path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"/></svg>;
    let checkMark:JSX.Element = <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" role="img" viewBox="0 0 512 512"><path fill="currentColor" d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"/></svg>;
    const activeTransition = useSpring({
        transform: active ? "translateY(0%)" : "translateY(300%)",
        opacity: active ? 1 : 0
    });
    return (
        <animated.div onClick={onClick} style={activeTransition} className={`toast${success ? " success" : " failure"}`}>
            <div className="toast__icon">{success ? checkMark : crossSign}</div>
            <div className="toast__message">{message ? message : "Nie podano informacji."}</div>
        </animated.div>
    );
}

export default Toast;