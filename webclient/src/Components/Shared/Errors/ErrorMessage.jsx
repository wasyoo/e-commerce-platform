import React from 'react';
import { withStyles } from '@material-ui/core';

const styles = {
  message: {
    padding: 20,
    background: 'red',
    borderRadius: '5px',
    width: 350,
    margin: 20,
    color: '#fff',
  },
};

const ErrorMessage = ({ error, classes }) => {
  const errorMsg = error.message.replace('GraphQL error: ', '');
  return (
    <strong className={classes.message}>
      <i className="fas fa-exclamation-circle" />
      {
        errorMsg.includes('E11000') ? ' Vous êtes déjà inscrit sur notre site' : errorMsg
      }
    </strong>
  );
};
export default withStyles(styles)(ErrorMessage);
