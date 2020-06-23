import React from 'react';
import { useCookies } from 'react-cookie';

const Information = ({isLastStage}:any) => {
    const [ cookies ] = useCookies();

    if (cookies["pti-application-names"] && !isLastStage) {
        let cookie = cookies["pti-application-names"].split(":");

        return (
            <div className="information">
                Wysłałeś już aplikacje dla uczni{cookie.length > 1 ? "ów" : "a"}: {cookie.join(", ")}
            </div>
        );
    }
    return null;
}

export default Information;