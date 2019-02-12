import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, TextField, Button } from '@material-ui/core';
import styles from './LoginStyle';

class LoginForm extends Component {
  state = {
    email: '',
    password: '',
  }

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  validateForm = () => {
    const { email, password } = this.state;
    const isInvalid = email.trim() === '' || password.trim() === '';
    return isInvalid;
  }

  handleSubmit = (event, onSubmit) => {
    event.preventDefault();
    onSubmit({
      variables: {
        input: {
          ...this.state,
        },
      },
    });
  }

  render() {
    const { classes, onSubmit } = this.props;
    const { email, password } = this.state;
    return (
      <form
        className={classes.form}
        noValidate
        autoComplete="off"
        onSubmit={(event) => this.handleSubmit(event, onSubmit)}
      >
        <TextField
          name="email"
          label="Email"
          type="email"
          required
          className={classes.textField}
          value={email}
          onChange={this.handleChange}
          margin="normal"
          variant="outlined"
        />
        <TextField
          name="password"
          label="Mot de passe"
          type="password"
          required
          className={classes.textField}
          value={password}
          onChange={this.handleChange}
          margin="normal"
          variant="outlined"
        />
        <Button
          type="submit"
          color="primary"
          className={classes.button}
          disabled={this.validateForm()}
        >
                S&apos;authentifier
        </Button>
      </form>
    );
  }
}

export default withStyles(styles)(LoginForm);
