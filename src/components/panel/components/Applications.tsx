import React from 'react'
import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';
import { Switch, Route, Redirect } from 'react-router-dom';

import EditApplication from './applications/EditApplication';
import Loader from '../../shared/components/Loader'; 
import Search from './Search';


const applicationsQuery = gql`
    query($token: String!) {
        getApplications(token: $token) {
            data
            success
            message
        }
    }
`;

const Applications = ({ userInfo, displayToast, darkTheme }:any) => {

    const { error, loading, data } = useQuery(applicationsQuery, {variables:{token: userInfo.token}});
    

    if (error || loading)
        return ( <Loader/>);

    return (
        <Switch>
            <Route path="/panel/applications/edit/:id" render={(props:any) => 
                    <EditApplication applications={JSON.parse(data.getApplications.data)} displayToast={displayToast} {...userInfo} darkTheme={darkTheme} {...props}/> }/>
            
            <Route path="/panel/applications/page" render={(props:any) => (
                <div className="search_container">
                    <h1 className="search_title">Wszystkie aplikacje</h1>
            
                    <Search
                        path="applications" 
                        count={10}
                        filterFunction={(e:any, searchValue:any) => (`${e.firstName} ${e.lastName} ${e.schoolYear}`).toLowerCase().indexOf(searchValue.toLowerCase()) > -1 || searchValue === ""}
                        data={JSON.parse(data.getApplications.data)}

                        inputProps={{
                            placeholder: "Wyszukiwanie poprzez imię lub nazwisko, bądź poprzez rok szkolny"
                        }}
                        renderInput={(Input:any) => (
                            <div className="search_input_wrapper">
                                {Input}
                            </div>
                        )}
                        listClass={"applications-search_records"}
                        sortFunction={undefined}
                        buttonParser={null}
                        dataParser={(dat:any) => (
                            <div key={dat._id}>
                                {dat.firstName} {dat.lastName} {dat.schoolYear}
                            </div>
                        )}
                        emptyData={null}
                        emptySearch={"Nie znaleziono aplikacji o podanym imieniu lub nazwisku, bądź po roku szkolnym."}
                        {...props}/>
                </div>)}/>

            <Route exact path="/panel/applications" render={() => 
                    <Redirect to="/panel/applications/page/1"/>}/>

            <Redirect to="/404"/>
        </Switch>
    );
}

export default Applications;
