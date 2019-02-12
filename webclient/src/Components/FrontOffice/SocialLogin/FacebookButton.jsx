import React from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { Button, Typography } from '@material-ui/core';

const SocialButton = ({ buttonTitle, onClick }) => (
  <FacebookLogin
    appId="394839934612492"
    autoLoad={false}
    fields="first_name,last_name,email,picture,address"
    callback={(response) => onClick(response)}
    cssClass="my-facebook-button-class"
    icon="fa-facebook"
    render={(renderProps) => (
      <Button
        variant="contained"
        color="primary"
        onClick={renderProps.onClick}
        style={{ width: 300, margin: '20px 0', height: 50 }}
      >
        <Typography component="div" style={{ color: '#fff', padding: 0 }}>
          <i className="fab fa-facebook-f" />
          {`  ${buttonTitle} Facebook`}
        </Typography>
      </Button>
    )}
  />
);

export default SocialButton;
