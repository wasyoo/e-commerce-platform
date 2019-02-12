import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { withClientState } from 'apollo-link-state';
import { createUploadLink } from 'apollo-upload-client';
import { persistCache } from 'apollo-cache-persist';
import Router from './Routes/Router';
import { defaultState, resolvers } from './graphql/Client/resolvers';
import './App.css';

class App extends Component {
  state = {
    client: null,
    loaded: false,
  };

  componentDidMount = async () => {
    const cache = new InMemoryCache();

    const uploadLink = createUploadLink({
      uri: process.env.REACT_APP_GRAPHQL_URL,
    });

    const authLink = setContext((_, { headers }) => {
      const token = localStorage.getItem('token');
      return {
        headers: {
          ...headers,
          authorization: token,
        },
      };
    });

    const stateLink = withClientState({
      defaults: defaultState,
      resolvers,
      cache,
    });

    const client = new ApolloClient({
      link: ApolloLink.from([authLink, stateLink, uploadLink]),
      cache,
    });

    try {
      await persistCache({
        cache,
        storage: window.localStorage,
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error restoring Apollo cache', error);
    }
    this.setState({
      client,
      loaded: true,
    });
  }

  render() {
    const { client, loaded } = this.state;

    if (!loaded) {
      return <div>Chargement...</div>;
    }

    return (
      <ApolloProvider client={client}>
        <div className="App">
          <Router />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
