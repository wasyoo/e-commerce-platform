import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Mutation, compose, graphql } from 'react-apollo';
import REGISTER from '../../../graphql/mutations/user/register';
import UPDATE_NETWORK_STATUS from '../../../graphql/Client/mutations/user/udpdateNetworkState';
import UPDATE_ME from '../../../graphql/Client/mutations/user/upadateMe';
import GoogleButton from './GoogleButton';
import FacebookButton from './FacebookButton';
import ADD_MSG_FLASH from '../../../graphql/Client/mutations/flashMsg/addFlashMsg';
import handleError from '../../Shared/Errors/ErrorMessage';

class SocialRegister extends Component {
  responseFacebook = (response, register) => {
    register({
      variables: {
        input: {
          email: response.email,
          firstName: response.first_name,
          lastName: response.last_name,
          address: response.address,
          avatar: response.picture.data.url,
          password: response.id,
          typeOfAuth: 'facebook',
        },
      },
    });
  };

  responseGoogle = (response, register) => {
    register({
      variables: {
        input: {
          email: response.profileObj.email,
          firstName: response.profileObj.givenName,
          lastName: response.profileObj.familyName,
          avatar: response.profileObj.imageUrl,
          password: response.googleId,
          typeOfAuth: 'google',
        },
      },
    });
  }


  render() {
    const {
      updateMe, updateNeworkStatus, history, addMsgFlash,
    } = this.props;
    return (
      <Mutation mutation={REGISTER}>
        {
          (register, { data, loading, error }) => {
            if (loading) return <h1>Chargement...</h1>;
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
                  user: data.register.user,
                },
              });
              localStorage.setItem('token', data.register.token);
              updateNeworkStatus({
                variables: {
                  isConnected: true,
                  typeOfAuth: data.register.user.typeOfAuth,
                  role: data.register.user.role,
                },
              }).then(() => history.push('/'));
            }
            return (
              <>
                <FacebookButton buttonTitle="S'inscrire via" onClick={(response) => this.responseFacebook(response, register)} />
                <GoogleButton buttonTitle="S'inscrire via" onClick={(response) => this.responseGoogle(response, register)} />
              </>
            );
          }
        }
      </Mutation>
    );
  }
}

export default compose(
  graphql(UPDATE_ME, { name: 'updateMe' }),
  graphql(UPDATE_NETWORK_STATUS, { name: 'updateNeworkStatus' }),
  graphql(ADD_MSG_FLASH, { name: 'addMsgFlash' }),
)(withRouter(SocialRegister));
