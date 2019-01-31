import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import styles from './ProductStyle';
import SelectCategory from './SelectCategory';

class ProductForm extends Component {
  static defaultProps = {
    product: {},
    buttonText: 'Valider',
  }

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    product: PropTypes.object,
    buttonText: PropTypes.string,
  }

  state = {
    id: this.props.product.id || '',
    name: this.props.product.name || '',
    price: this.props.product.price || '',
    quantity: this.props.product.quantity || '',
    description: this.props.product.description || '',
    category: (this.props.product.category && this.props.product.category.id) || '',
    image: this.props.product.image || '',
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  validateForm = () => {
    const {
      name, price, quantity,
    } = this.state;
    const isInvalid = name.trim() === '' || price.trim() === '' || quantity.trim() === '';
    return isInvalid;
  }

  render() {
    const { classes, onSubmit, buttonText } = this.props;
    const {
      name, price, quantity, description, image, id, category,
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
        }}
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
        <TextField
          name="price"
          label="Prix"
          type="number"
          required
          className={classes.textField}
          value={price}
          onChange={this.handleChange}
          margin="normal"
          variant="outlined"
        />
        <TextField
          name="quantity"
          label="Quantité"
          type="number"
          required
          className={classes.textField}
          value={quantity}
          onChange={this.handleChange}
          margin="normal"
          variant="outlined"
        />
        <TextField
          name="image"
          label="Image"
          type="text"
          className={classes.textField}
          value={image}
          onChange={this.handleChange}
          margin="normal"
          variant="outlined"
        />
        <TextField
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
        <SelectCategory value={category} onChange={(e) => this.handleChange(e)} />
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

export default withStyles(styles)(ProductForm);
