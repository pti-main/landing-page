import React from 'react';

import gql from 'graphql-tag';
import { useQuery } from 'react-apollo';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';

import EditGallery from './gallery/EditGallery';
import GalleryListItem from './gallery/GalleryListItem';
import Search from './Search';

import Loader from '../../shared/components/Loader'; 

let allGalleryQuery = gql`
    query($token: String!) {
        getAllGallery(token: $token) {
            success
            data
        }
    }
`;

const Gallery = ({ userInfo, displayToast, darkTheme }:any) => {
    let { loading, data, error } = useQuery(allGalleryQuery, {variables: {token: (userInfo) ? userInfo.token : ""}});
    const history = useHistory();

    if (loading || error)
        return <Loader/>;

    return (
        <Switch>
            <Route path="/panel/gallery/edit/:id" render={(props:any) => 
                    <EditGallery images={JSON.parse(data.getAllGallery.data)} displayToast={displayToast} {...userInfo} darkTheme={darkTheme} {...props}/> }/>
 
            <Route exact path="/panel/gallery/new" render={(props:any) => 
                    <EditGallery images={JSON.parse(data.getAllGallery.data)} displayToast={displayToast} {...userInfo} newImage={true} darkTheme={darkTheme} {...props}/> }/>

            
            <Route path="/panel/gallery/page" render={(props:any) => (
                <div className="search_container">
                    <h1 className="search_title">Wszystkie zdjęcia</h1>
            
                    <Search
                        path="gallery" 
                        count={10}
                        filterFunction={(e:any, searchValue:any) => e.title.toLowerCase().indexOf(searchValue.toLowerCase()) > -1 || searchValue === ""} 
                        data={JSON.parse(data.getAllGallery.data)}

                        inputProps={{
                            placeholder: "Wyszukiwanie poprzez tytuł zdjęcia"
                        }}
                        renderInput={(Input:any) => (
                            <div className="search_input_wrapper withIcon">
                                {Input}
                                <div className="search_input_addButton" onClick={() => history.push("/panel/gallery/new")}>
                                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" viewBox="0 0 448 512"><path fill="currentColor" d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/></svg>
                                </div>
                            </div>
                        )}
                        listClass={"gallery-search_records"}
                        sortFunction={(a:any, b:any) => new Date(b.date).getTime() - new Date(a.date).getTime()}
                        buttonParser={null}
                        dataParser={(e:any) => <GalleryListItem data={e} key={e._id}/>}
                        emptyData={null}
                        emptySearch={"Nie znaleziono zdjęć o podanej nazwie."}
                        {...props}/>
                </div>)}/>

            <Route exact path="/panel/gallery" render={() => 
                    <Redirect to="/panel/gallery/page/1"/>}/>

            <Redirect to="/404"/>
        </Switch>
    )
}

export default Gallery;
