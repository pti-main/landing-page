import React, { useState, useEffect } from 'react';
import { useHistory, Switch, Route } from 'react-router-dom';

import List from './List';
import { Redirect } from 'react-router-dom';

const Search = ({ path, data, filterFunction, sortFunction, inputProps, renderInput, emptyData, ...mainProps }:any) => {
    const [ searchValue, setSearchValue ] = useState("");
    const history = useHistory();

    useEffect(() => {
        if (searchValue !== "")
            history.push(`/panel/${path}/page/1`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ searchValue ]);

    let defaultEmptyDataFunc = () => (
        <div className="empty_search">
            <div className="empty_search_message">Brak rekordów w bazie danych.</div>
            <div className="empty_search_newButton">Stwórz nowy</div>
        </div>
    );

    if (data.length === 0)
        return (
            <div className="search">
                {(emptyData || defaultEmptyDataFunc)() }  {/* Na przyszlosc: co */}
            </div>
        );

    let modData = data.sort(sortFunction)
                .filter((e:any) => filterFunction(e, searchValue)); 

    return (
        <div className="search">
            { data.length !== 0 &&
                renderInput(<input {...inputProps} value={searchValue} onChange={(e:any) => setSearchValue(e.target.value)}/>) }

            <Switch>

                <Route path={`/panel/${path}/page/:page`} render={(props:any) => 
                        <List path={path} {...props} {...mainProps} data={modData}/>}/>

                <Route path={`/panel/${path}/page`} render={() => <Redirect to={`/panel/${path}/page/1`}/>}/>

                <Redirect to="/404"/>

            </Switch>
        </div>
    );
}

export default Search;