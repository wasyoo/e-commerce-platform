import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { compose, graphql } from 'react-apollo';
import getNetworkSatus from '../graphql/Client/queries/user/getNetworkStatus';

const PrivateRoute = ({ component: Component, networkStatus: { networkStatus }, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (
      networkStatus.isConnected
        ? <Component {...props} />
        : <Redirect to="/signin" />
    )}
  />
);
export default compose(
  graphql(
    getNetworkSatus, {
      props: ({ data: networkStatus }) => ({
        networkStatus,
      }),
    }
  )
)(PrivateRoute);
