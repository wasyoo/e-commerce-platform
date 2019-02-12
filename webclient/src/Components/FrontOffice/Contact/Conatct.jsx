import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { withStyles } from '@material-ui/core/styles';
import {
  TextField, Button, Grid, Paper,
} from '@material-ui/core';
import styles from './contactStyle';
import Map from '../Map/Map';
import Error from '../../Shared/Errors/ErrorMessage';
import SEND_EMAIL from '../../../graphql/mutations/email/sendEmail';


class Conatct extends Component {
  state = {
    name: '',
    email: '',
    phone: '',
    message: '',
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  validateForm = () => {
    const {
      name, email, message,
    } = this.state;
    const isInvalid = name.trim() === '' || email.trim() === '' || message.trim() === '';
    return isInvalid;
  }

  render() {
    const { classes, history } = this.props;
    const {
      name, email, phone, message,
    } = this.state;
    return (
      <div className={classes.container}>
        <h1> Contactez nous </h1>
        <Mutation
          mutation={SEND_EMAIL}
          variables={{
            input: {
              name, email, phone, message,
            },
          }}
        >
          {
            (sendEmail, { loading, error, data }) => {
              if (loading) return <h1>En cours d&apos;envoi</h1>;
              if (error) return <Error error={error} />;
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
                    sendEmail();
                  }}
                >
                  <Grid container spacing={16} className="field-input">
                    <Grid item xs={4}>
                      <TextField
                        name="name"
                        label="Nom"
                        type="text"
                        required
                        className={classes.textField}
                        value={name}
                        onChange={this.handleChange}
                        margin="normal"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={4}>
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
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        name="phone"
                        label="N° tel"
                        type="text"
                        className={classes.textField}
                        value={phone}
                        onChange={this.handleChange}
                        margin="normal"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        name="message"
                        label="Message"
                        type="text"
                        required
                        multiline
                        rows={4}
                        className={classes.textField}
                        value={message}
                        onChange={this.handleChange}
                        margin="normal"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        color="primary"
                        className={classes.button}
                        disabled={this.validateForm()}
                      >
                    Envoyer
                      </Button>
                    </Grid>
                    <Grid item xs={12}>
                      <Paper>
                        <Map />
                      </Paper>
                    </Grid>
                  </Grid>
                </form>
              );
            }
          }
        </Mutation>

      </div>
    );
  }
}

export default withStyles(styles)(Conatct);
