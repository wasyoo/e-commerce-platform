import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import PropTypes from 'prop-types';
import styles from '../../Shared/Styles/FormStyle';
import SelectCategory from './SelectCategory';
import Error from '../../Shared/Errors/ErrorMessage';

class ProductForm extends Component {
  static defaultProps = {
    product: {},
    buttonText: 'Valider',
    error: '',
  }

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    product: PropTypes.object,
    buttonText: PropTypes.string,
    error: PropTypes.string,
  }

  state = {
    error: this.props.error || '',
    id: this.props.product.id || '',
    name: this.props.product.name || '',
    price: this.props.product.price || '',
    quantity: this.props.product.quantity || '',
    description: this.props.product.description || '',
    category: (this.props.product.category && this.props.product.category.id) || '',
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = async (event) => {
    const {
      name, price, quantity, description, id, category,
    } = this.state;

    const [files] = event.target.image.files;

    let image;

    if (files) {
      const data = new FormData();

      data.append('file', files);
      data.append('upload_preset', 'wy9jxzfu');

      const res = await fetch('https://api.cloudinary.com/v1_1/dahnj3ljv/image/upload', {
        method: 'POST',
        body: data,
      });

      const file = await res.json();
      if (!file.error) {
        image = file.secure_url;
      } else {
        this.setState({
          error: file.error,
        });
      }
    }

    this.props.onSubmit({
      variables: {
        id,
        input: {
          name,
          price,
          quantity,
          description,
          image,
          category,
        },
      },
    });

    return null;
  }

  validateForm = () => {
    const {
      name, price, quantity,
    } = this.state;
    const isInvalid = name.trim() === '' || price.trim() === '' || quantity.trim() === '';
    return isInvalid;
  }

  render() {
    const { classes, buttonText } = this.props;
    const {
      name, price, quantity, description, category, error,
    } = this.state;
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
        {error && (<Error error={error} />)}
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
          name="price"
          label="Prix"
          type="number"
          required
          className={classes.textField}
          value={price}
          onChange={this.handleChange}
          margin="normal"
          variant="outlined"
          validators={['required', 'minFloat:1']}
          errorMessages={['Ce champ est requis', 'Veuillez ne fournir que des chiffres positif']}
        />
        <TextValidator
          name="quantity"
          label="Quantité"
          type="number"
          required
          className={classes.textField}
          value={quantity}
          onChange={this.handleChange}
          margin="normal"
          variant="outlined"
          min="0"
          validators={['required', 'minNumber:1']}
          errorMessages={['Ce champ est requis', 'Veuillez ne fournir que des chiffres positif']}
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
          validators={['required']}
          errorMessages={['Ce champ est requis']}
        />
        <SelectCategory value={category} onChange={(e) => this.handleChange(e)} />
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

export default withStyles(styles)(ProductForm);
