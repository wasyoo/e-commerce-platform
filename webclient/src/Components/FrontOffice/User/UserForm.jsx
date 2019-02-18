import React, { Component } from 'react';
import { withStyles, TextField, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import styles from '../../Shared/Styles/FormStyle';

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
      <ValidatorForm
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
                typeOfAuth: 'form',
              },
            },
          });
        }}
      >
        <TextValidator
          name="firstName"
          label="Prénom"
          type="text"
          className={classes.textField}
          value={firstName}
          onChange={this.handleChange}
          margin="normal"
          variant="outlined"
          validators={['required']}
          errorMessages={['Ce champ est requis']}
        />
        <TextValidator
          name="lastName"
          label="Nom"
          type="text"
          required
          className={classes.textField}
          value={lastName}
          onChange={this.handleChange}
          margin="normal"
          variant="outlined"
          validators={['required']}
          errorMessages={['Ce champ est requis']}
        />
        <TextValidator
          name="email"
          label="Email"
          type="email"
          className={classes.textField}
          value={email}
          onChange={this.handleChange}
          margin="normal"
          variant="outlined"
          validators={['required', 'isEmail']}
          errorMessages={['Ce champ est requis', 'L\'email n\'est pas valide']}
        />
        { buttonText === 'Enregistrer' && (
          <TextValidator
            name="password"
            label="Mot de passe"
            type="password"
            required
            className={classes.textField}
            value={password}
            onChange={this.handleChange}
            margin="normal"
            variant="outlined"
            validators={['required']}
            errorMessages={['Ce champ est requis']}
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
      </ValidatorForm>
    );
  }
}

export default withStyles(styles)(UserForm);
