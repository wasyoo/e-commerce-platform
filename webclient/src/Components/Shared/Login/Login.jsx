import React from 'react';
import { compose, graphql, Mutation } from 'react-apollo';
import { withStyles } from '@material-ui/core';
import styles from './LoginStyle';
import LoginForm from './LoginForm';
import LOGIN from '../../../graphql/mutations/user/login';
import UpdateNeworkStatus from '../../../graphql/Client/mutations/user/udpdateNetworkState';
import UpdateMe from '../../../graphql/Client/mutations/user/upadateMe';
import SocialLogin from '../../FrontOffice/SocialLogin/SocialLogin';
import Error from '../Errors/ErrorMessage';

const Login = ({
  history, updateNeworkStatus, updateMe, classes,
}) => (
  <div className={classes.container}>
    <h1> Connexion </h1>
    <Mutation mutation={LOGIN}>
      {
        (login, { data, loading, error }) => {
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
                typeOfAuth: data.login.user.typeOfAuth,
                role: data.login.user.role,
              },
            }).then(() => history.push('/'));
          }
          return (
            <>
              <SocialLogin />
              <div
                style={{
                  display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '20px 0',
                }}
              >
                <hr style={{ width: 100 }} />
                <span style={{ margin: '0 20px', fontSize: 20 }}>Ou</span>
                <hr style={{ width: 100 }} />
              </div>
              {error && (<Error error={error} />)}
              <LoginForm onSubmit={login} />
            </>
          );
        }
      }
    </Mutation>
  </div>
);

export default compose(
  graphql(UpdateMe, { name: 'updateMe' }),
  graphql(UpdateNeworkStatus, { name: 'updateNeworkStatus' }),
)(withStyles(styles)(Login));
