import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
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
    const client = new ApolloClient({
      uri: process.env.REACT_APP_GRAPHQL_URL,
      cache,
      request: async (operation) => {
        operation.setContext({
          headers: {
            authorization: localStorage.getItem('token'),
          },
        });
      },
      clientState: {
        defaults: defaultState,
        resolvers,
      },
    });

    try {
      await persistCache({
        cache,
        storage: window.localStorage,
      });
    } catch (error) {
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
      return <div>Loading...</div>;
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
