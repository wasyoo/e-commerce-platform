import React from 'react';
import GoogleLogin from 'react-google-login';
import { withStyles, Button, Typography } from '@material-ui/core';

const styles = () => ({
  button: {
    width: 300,
    margin: '20px 0',
    height: 50,
    backgroundColor: '#e5462d',
  },
  typography: {
    color: '#fff',
  },
});

const SocialButton = ({ buttonTitle, onClick, classes }) => (
  <GoogleLogin
    clientId="717144037915-q3av2h43rs1l1rvp5uh9inu6q5gkqrmd.apps.googleusercontent.com"
    buttonText={`${buttonTitle} Google`}
    onSuccess={(response) => onClick(response)}
    onFailure={(response) => onClick(response)}
    render={(renderProps) => (
      <Button
        variant="contained"
        onClick={renderProps.onClick}
        className={classes.button}
        color="secondary"
      >
        <Typography component="div" className={classes.typography}>
          <i className="fab fa-google" />
          {`  ${buttonTitle} Google`}
        </Typography>
      </Button>
    )}
  />
);

export default withStyles(styles)(SocialButton);
