import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import styles from '../Product/ProductStyle';

class CategoryForm extends Component {
  static defaultProps = {
    category: {},
    buttonText: 'Valider',
  }

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    category: PropTypes.object,
    buttonText: PropTypes.string,
  }

  state = {
    id: this.props.category.id || '',
    name: this.props.category.name || '',
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  validateForm = () => {
    const {
      name,
    } = this.state;
    const isInvalid = name.trim() === '';
    return isInvalid;
  }

  render() {
    const { classes, onSubmit, buttonText } = this.props;
    const { name, id } = this.state;
    return (
      <form
        className={classes.form}
        noValidate
        autoComplete="off"
        onSubmit={
          (e) => {
            e.preventDefault();
            onSubmit({
              variables: {
                id,
                input: {
                  name,
                },
              },
            });
          }
        }
      >
        <TextField
          name="name"
          label="Libellé"
          type="text"
          required
          className={classes.textField}
          value={name}
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

export default withStyles(styles)(CategoryForm);
