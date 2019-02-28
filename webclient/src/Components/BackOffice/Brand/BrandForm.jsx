import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { compose, graphql } from 'react-apollo';
import { Button } from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import PropTypes from 'prop-types';
import UPLOAD_FILE from '../../../graphql/mutations/file/uploadFile';
import styles from '../../Shared/Styles/FormStyle';

class BrandForm extends Component {
  state = {
    id: this.props.brand.id || '',
    name: this.props.brand.name || '',
    description: this.props.brand.description || '',
  }

  static defaultProps = {
    brand: {},
    buttonText: 'Valider',
  }

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    brand: PropTypes.object,
    buttonText: PropTypes.string,
  }

  handleSubmit = async (event) => {
    let filename;
    try {
      if (event.target.image.files.length) {
        const [file] = event.target.image.files;
        const { data } = await this.props.uploadFile({
          variables: {
            input: {
              file,
            },
          },
        });
        filename = data.uploadFile.filename;
      }

      const { name, description, id } = this.state;

      this.props.onSubmit({
        variables: {
          id,
          input: {
            name,
            description,
            filename,
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

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
    const { classes, buttonText } = this.props;
    const { name, description } = this.state;
    console.log(name, description);
    return (
      <ValidatorForm
        className={classes.form}
        noValidate
        autoComplete="off"
        onSubmit={(e) => {
          e.preventDefault();
          this.handleSubmit(e);
        }}
      >
        <TextValidator
          name="name"
          label="Libellé"
          type="text"
          required
          className={classes.textField}
          value={name}
          onChange={this.handleChange}
          margin="normal"
          variant="outlined"
          validators={['required']}
          errorMessages={['Ce champ est requis']}
        />
        <TextValidator
          name="image"
          label="Image"
          type="file"
          className={classes.textField}
          margin="normal"
          variant="outlined"
        />
        <TextValidator
          name="description"
          label="Description"
          type="text"
          multiline
          rows={4}
          className={classes.textField}
          value={description}
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

export default compose(
  graphql(UPLOAD_FILE, { name: 'uploadFile' }),
)(withStyles(styles)(BrandForm));
