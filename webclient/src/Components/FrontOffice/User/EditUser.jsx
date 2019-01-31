import React from 'react';
import {
  Mutation, Query, compose, graphql,
} from 'react-apollo';
import { withStyles } from '@material-ui/core/styles';
import styles from '../../BackOffice/Product/ProductStyle';
import UserForm from './UserForm';
import EDIT_USER from '../../../graphql/mutations/user/editUser';
import ME from '../../../graphql/Client/queries/user/getMe';
import UPDATE_ME from '../../../graphql/Client/mutations/user/upadateMe';

const EditUser = ({ classes, history, updateMe }) => (
  <div className={classes.container}>
    <h1> Modifier votre profil </h1>
    <Mutation
      mutation={EDIT_USER}
    >
      {(editUser, { data, loading }) => {
        if (loading) return <h3>Modification en cours ...</h3>;
        if (data) {
          updateMe({
            variables: {
              user: data.editUser,
            },
          }).then(() => history.push('/'));
        }
        return (
          <Query query={ME}>
            {({ data }) => {
              if (data) {
                return <UserForm buttonText="Modifier" user={data.me.user} onSubmit={editUser} />;
              }
              return null;
            }}
          </Query>
        );
      }
      }
    </Mutation>
  </div>
);

export default compose(
  graphql(UPDATE_ME, { name: 'updateMe' }),
)(withStyles(styles)(EditUser));
