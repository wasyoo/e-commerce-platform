import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import styles from '../../BackOffice/Product/ProductStyle';

class UserForm extends Component {
  static defaultProps = {
    user: {},
    buttonText: 'Valider',
  }

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    user: PropTypes.object,
    buttonText: PropTypes.string,
  }

  state = {
    firstName: this.props.user.firstName || '',
    lastName: this.props.user.lastName || '',
    email: this.props.user.email || '',
    password: '',
    phone: this.props.user.phone || '',
    address: this.props.user.address || '',
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  validateForm = () => {
    const {
      firstName, lastName, email, password,
    } = this.state;
    const isInvalid = (
      firstName.trim() === ''
      || lastName.trim() === ''
      || email.trim() === ''
      || (this.props.buttonText === 'Enregistrer' && password.trim() === '')
    );
    return isInvalid;
  }

  render() {
    const { classes, onSubmit, buttonText } = this.props;
    const {
      firstName, lastName, email, password, phone, address,
    } = this.state;
    return (
      <form
        className={classes.form}
        noValidate
        autoComplete="off"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit({
            variables: {
              input: {
                firstName,
                lastName,
                email,
                password,
                phone,
                address,
              },
            },
          });
        }}
      >
        <TextField
          name="firstName"
          label="Prénom"
          type="text"
          required
          className={classes.textField}
          value={firstName}
          onChange={this.handleChange}
          margin="normal"
          variant="outlined"
        />
        <TextField
          name="lastName"
          label="Nom"
          type="text"
          required
          className={classes.textField}
          value={lastName}
          onChange={this.handleChange}
          margin="normal"
          variant="outlined"
        />
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
        { buttonText === 'Enregistrer' && (
          <TextField
            name="password"
            label="Mot de passe"
            type="password"
            className={classes.textField}
            value={password}
            onChange={this.handleChange}
            margin="normal"
            variant="outlined"
          />
        )}
        <TextField
          name="phone"
          label="N° de Téléphone"
          type="text"
          className={classes.textField}
          value={phone}
          onChange={this.handleChange}
          margin="normal"
          variant="outlined"
        />
        <TextField
          name="address"
          label="Adresse"
          type="text"
          className={classes.textField}
          value={address}
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
          {buttonText}
        </Button>
      </form>
    );
  }
}

export default withStyles(styles)(UserForm);
