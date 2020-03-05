import React, { useEffect } from 'react';

import Form from './components/Form';

const Application = (props:any) => {
    useEffect(() => {
        document.title = "Aplikuj - Prywatne Technikum Informatyczne";
    }, []);

    return (
        <div className="pti__container" id="application-page">
            <Form {...props} darkTheme={props.darkTheme}/>
        </div>
    );
}

export default Application;