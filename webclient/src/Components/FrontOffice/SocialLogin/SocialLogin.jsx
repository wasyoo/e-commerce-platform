import React from 'react';
import { withRouter } from 'react-router-dom';
import { Mutation, compose, graphql } from 'react-apollo';
import GoogleButton from './GoogleButton';
import FacebookButton from './FacebookButton';
import LOGIN from '../../../graphql/mutations/user/login';
import UpdateNeworkStatus from '../../../graphql/Client/mutations/user/udpdateNetworkState';
import UpdateMe from '../../../graphql/Client/mutations/user/upadateMe';
import ADD_MSG_FLASH from '../../../graphql/Client/mutations/flashMsg/addFlashMsg';
import handleError from '../../Shared/Errors/ErrorMessage';

const responseFacebook = (response, login) => {
  login({
    variables: {
      input: {
        email: response.email,
        password: response.id,
        typeOfAuth: 'facebook',
      },
    },
  });
};

const responseGoogle = (response, login) => {
  login({
    variables: {
      input: {
        email: response.profileObj.email,
        password: response.googleId,
        typeOfAuth: 'google',
      },
    },
  });
};

const SocialLogin = ({
  history, updateNeworkStatus, updateMe, addMsgFlash,
}) => (
  <Mutation mutation={LOGIN}>
    {
      (login, { data, loading, error }) => {
        if (loading) return <h1> Chargement... </h1>;
        if (error) {
          addMsgFlash({
            variables: {
              message: handleError(error),
              type: 'error',
              status: true,
            },
          });
        }
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
            <FacebookButton buttonTitle="Connexion avec" onClick={(response) => responseFacebook(response, login)} />
            <GoogleButton buttonTitle="Connexion avec" onClick={(response) => responseGoogle(response, login)} />
          </>
        );
      }
    }
  </Mutation>
);
export default compose(
  graphql(UpdateMe, { name: 'updateMe' }),
  graphql(UpdateNeworkStatus, { name: 'updateNeworkStatus' }),
  graphql(ADD_MSG_FLASH, { name: 'addMsgFlash' }),
)(withRouter(SocialLogin));
