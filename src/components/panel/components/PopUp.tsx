import React, { useEffect} from 'react';

const PopUp = ({ show, message, reset=() => true, callback=() => true }:any) => {

    useEffect(() => {
        const handleKeyPress = (e:any) => {
            if (!show) return;
    
            let code = e.keyCode || e.which;
            e.preventDefault();
            
            if ( code === 27 ) {
                reset();
            } else if ( code === 13 ) {
                callback();
                reset();
            }
        }

        window.addEventListener('keydown', handleKeyPress)
        return () => window.removeEventListener('keydown', handleKeyPress)
    }, [show, reset, callback]);

    return (
        <div style={{display: show ? "flex" : "none"}} className="popup_wrapper_backdrop">
            <div className="popup_wrapper_insider">
                <div className="message">{ message }</div>
                <div className="cta cancel" onClick={reset}>Anuluj</div>
                <div className="cta confirm" onClick={() => {
                    callback();
                    reset();
                }}>Zatwierdź</div>
            </div>
        </div>
    );
}

export default PopUp;