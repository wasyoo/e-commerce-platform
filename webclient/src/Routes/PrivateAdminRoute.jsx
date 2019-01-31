import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { Query } from 'react-apollo';
import getNetworkSatus from '../graphql/Client/queries/user/getNetworkStatus';

const PrivateAdminRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (
      <Query query={getNetworkSatus}>
        {({ data }) => {
          if (data.networkStatus.role !== 'admin') {
            return <Redirect to="/signin" />;
          }
          return <Component {...props} />;
        }}
      </Query>
    )}
  />
);

export default PrivateAdminRoute;
