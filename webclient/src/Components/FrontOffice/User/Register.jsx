import React from 'react';
import { Mutation, compose, graphql } from 'react-apollo';
import { withStyles } from '@material-ui/core/styles';
import REGISTER from '../../../graphql/mutations/user/register';
import UPDATE_NETWORK_STATUS from '../../../graphql/Client/mutations/user/udpdateNetworkState';
import UPDATE_ME from '../../../graphql/Client/mutations/user/upadateMe';
import styles from '../../BackOffice/Product/ProductStyle';
import UserForm from './UserForm';

const Register = ({
  classes, history, updateNeworkStatus, updateMe,
}) => (
  <div className={classes.container}>
    <h1> S&apos;inscrire </h1>
    <Mutation mutation={REGISTER}>
      {(register, { loading, data }) => {
        if (loading) return <h3>Chargement...</h3>;
        if (data) {
          updateMe({
            variables: {
              user: data.register.user,
            },
          });

          localStorage.setItem('token', data.register.token);

          updateNeworkStatus({
            variables: {
              isConnected: true,
              role: data.register.user.role,
            },
          }).then(() => history.push('/'));
        }
        return <UserForm buttonText="Enregistrer" onSubmit={register} />;
      }
      }
    </Mutation>
  </div>
);

export default compose(
  graphql(UPDATE_ME, { name: 'updateMe' }),
  graphql(UPDATE_NETWORK_STATUS, { name: 'updateNeworkStatus' }),
)(withStyles(styles)(Register));
