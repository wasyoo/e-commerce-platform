import React from 'react';
import { Mutation } from 'react-apollo';
import { withStyles } from '@material-ui/core/styles';
import ProductForm from './ProductForm';
import ADD_PRODUCT from '../../../graphql/mutations/product/addProduct';
import GET_PRODUCTS from '../../../graphql/queries/product/getProducts';
import styles from './ProductStyle';

const AddProduct = ({ classes, history }) => (
  <div className={classes.container}>
    <h1> Ajouter un Produit </h1>
    <Mutation
      mutation={ADD_PRODUCT}
      refetchQueries={[{ query: GET_PRODUCTS }]}
    >
      {(addProduct, { loading, data }) => {
        if (loading) return <h3>Chargement...</h3>;
        if (data) {
          history.push('/admin/product');
        }
        return <ProductForm buttonText="Ajouter" onSubmit={addProduct} />;
      }
      }
    </Mutation>
  </div>
);

export default withStyles(styles)(AddProduct);
