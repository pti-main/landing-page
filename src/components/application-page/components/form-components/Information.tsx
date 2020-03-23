import React from 'react';
import { animated } from 'react-spring';
import { useCookies } from 'react-cookie';

const Information = ({fadeTransition}:any) => {
    const [ cookies ] = useCookies();
    if (cookies["pti-application-names"]) {
        let cookie = cookies["pti-application-names"].split(":");

        return (
            <animated.div style={fadeTransition} className="information">
                Wysłałeś już aplikacje dla uczni{cookie.length > 1 ? "ów" : "a"}: {cookie.join(", ")}
            </animated.div>
        );
    }
    return null;
}

export default Information;