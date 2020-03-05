import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { BrowserRouter as Router } from 'react-router-dom';

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import App from './components/Router';

const httpLink = createHttpLink({
    uri: `http://${document.domain + ":4000"}`
});
const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
});

ReactDOM.render(
    <Router>
        <ApolloProvider client={client}>
            <App/>
        </ApolloProvider>
    </Router>,
document.getElementById('pti__site'));