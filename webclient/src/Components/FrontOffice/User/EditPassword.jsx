import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';
import styles from '../../Shared/Styles/FormStyle';
import EDIT_PASSWORD from '../../../graphql/mutations/user/editPassword';
import Error from '../../Shared/Errors/ErrorMessage';

class EditPassword extends Component {
  state = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  validateForm = () => {
    const { oldPassword, newPassword, confirmPassword } = this.state;
    const isInvalid = oldPassword.trim() === '' || newPassword.trim() === '' || confirmPassword.trim() !== newPassword.trim();
    return isInvalid;
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { classes, history } = this.props;
    const { oldPassword, newPassword, confirmPassword } = this.state;
    return (
      <div className={classes.container}>
        <h1> Changez votre Mot de passe </h1>
        <Mutation
          mutation={EDIT_PASSWORD}
          variables={{ input: { oldPassword, newPassword } }}
        >
          {
            (editPasswordUser, { loading, data, error }) => {
              if (loading) return <h3>Modification en cours ...</h3>;
              if (data) {
                history.push('/');
              }
              return (
                <form
                  className={classes.form}
                  noValidate
                  autoComplete="off"
                  onSubmit={(e) => {
                    e.preventDefault();
                    editPasswordUser();
                  }}
                >
                  {error && (<Error error={error} />)}
                  <TextField
                    name="oldPassword"
                    label="Ancien mot de passe"
                    type="password"
                    required
                    className={classes.textField}
                    value={oldPassword}
                    onChange={this.handleChange}
                    margin="normal"
                    variant="outlined"
                  />
                  <TextField
                    name="newPassword"
                    label="Nouveau mot de passe"
                    type="password"
                    required
                    className={classes.textField}
                    value={newPassword}
                    onChange={this.handleChange}
                    margin="normal"
                    variant="outlined"
                  />
                  <TextField
                    name="confirmPassword"
                    label="confirmer mot de passe"
                    type="password"
                    required
                    className={classes.textField}
                    value={confirmPassword}
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
                  Valider
                  </Button>
                </form>
              );
            }
          }
        </Mutation>
      </div>
    );
  }
}

export default withStyles(styles)(EditPassword);
