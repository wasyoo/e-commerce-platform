import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import styles from './LoginStyle';

class LoginForm extends Component {
  state = {
    email: '',
    password: '',
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
      <div className={classes.container}>
        <h1> Connexion </h1>
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
      </div>
    );
  }
}

export default withStyles(styles)(LoginForm);
