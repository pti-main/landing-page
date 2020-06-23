import React from 'react';

import gql from 'graphql-tag';
import { useQuery } from 'react-apollo';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';

import EditArticles from './articles/EditArticles';
import ArticleListItem from './articles/ArticleListItem';
import Search from './Search';

import Loader from '../../shared/components/Loader'; 

let allArticlesQuery = gql`
    query($token: String!) {
        getAllArticles(token: $token) {
            success
            data
        }
    }
`;

const Articles = ({ userInfo, displayToast, darkTheme }:any) => {
    let { loading, data, error } = useQuery(allArticlesQuery, {variables: {token: (userInfo) ? userInfo.token : ""}});
    const history = useHistory();

    if (loading || error)
        return <Loader/>;

    return (
        <Switch>
            <Route path="/panel/articles/edit/:id" render={(props:any) => 
                    <EditArticles articles={JSON.parse(data.getAllArticles.data)} displayToast={displayToast} {...userInfo} darkTheme={darkTheme} {...props}/> }/>

            <Route exact path="/panel/articles/new" render={(props:any) => 
                    <EditArticles articles={JSON.parse(data.getAllArticles.data)} displayToast={displayToast} {...userInfo} newArticle={true} darkTheme={darkTheme} {...props}/> }/>

            
            <Route path="/panel/articles/page" render={(props:any) => (
                <div className="search_container">
                    <h1 className="search_title">Wszystkie artykuły</h1>
            
                    <Search
                        path="articles" 
                        count={5}
                        filterFunction={(e:any, searchValue:any) => e.title.toLowerCase().indexOf(searchValue.toLowerCase()) > -1 || searchValue === ""} 
                        data={JSON.parse(data.getAllArticles.data)}

                        inputProps={{
                            placeholder: "Wyszukiwanie poprzez tytuł artykułu"
                        }}
                        renderInput={(Input:any) => (
                            <div className="search_input_wrapper withIcon">
                                {Input}
                                <div className="search_input_addButton" onClick={() => history.push("/panel/articles/new")}>
                                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" viewBox="0 0 448 512"><path fill="currentColor" d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/></svg>
                                </div>
                            </div>
                        )}
                        
                        sortFunction={(a:any, b:any) => new Date(b.date).getTime() - new Date(a.date).getTime()}
                        buttonParser={null}
                        dataParser={(e:any) => <ArticleListItem key={e._id} data={e}/>}
                        emptyData={null}
                        emptySearch={"Nie znaleziono artykułów o podanej nazwie."}
                        {...props}/>
                </div>)}/>

            <Route exact path="/panel/articles" render={() => 
                    <Redirect to="/panel/articles/page/1"/>}/>

            <Redirect to="/404"/>
        </Switch>
    )
}

export default Articles;
