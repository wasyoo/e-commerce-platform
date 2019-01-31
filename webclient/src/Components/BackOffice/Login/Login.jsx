import React from 'react';
import { compose, graphql, Mutation } from 'react-apollo';
import LoginForm from './LoginForm';
import LOGIN from '../../../graphql/mutations/user/login';
import UpdateNeworkStatus from '../../../graphql/Client/mutations/user/udpdateNetworkState';
import UpdateMe from '../../../graphql/Client/mutations/user/upadateMe';

const Login = ({ history, updateNeworkStatus, updateMe }) => (
  <Mutation mutation={LOGIN}>
    {
      (login, { data, loading }) => {
        if (loading) return <h1> Chargement... </h1>;
        if (data) {
          updateMe({
            variables: {
              user: data.login.user,
            },
          });
          localStorage.setItem('token', data.login.token);
          updateNeworkStatus({
            variables: {
              isConnected: true,
              role: data.login.user.role,
            },
          }).then(() => history.push('/'));
        }
        return <LoginForm onSubmit={login} />;
      }
    }
  </Mutation>
);

export default compose(
  graphql(UpdateMe, { name: 'updateMe' }),
  graphql(UpdateNeworkStatus, { name: 'updateNeworkStatus' }),
)(Login);
