import React from 'react';
import { Mutation } from 'react-apollo';
import { withStyles } from '@material-ui/core/styles';
import ProductForm from './ProductForm';
import UPDATE_PRODUCT from '../../../graphql/mutations/product/upadateProduct';
import GET_PRODUCTS from '../../../graphql/queries/product/getProducts';
import styles from './ProductStyle';

const UpdateProduct = ({ classes, history, location: { product } }) => (
  <div className={classes.container}>
    <h1> Éditer le Produit </h1>
    <Mutation
      mutation={UPDATE_PRODUCT}
      refetchQueries={[{ query: GET_PRODUCTS }]}
    >
      {(EditPhoto, { data, loading }) => {
        if (loading) return <h3>Modification en cours ...</h3>;
        if (data) {
          history.push('/admin/product');
        }
        return <ProductForm buttonText="Modifier" product={product} onSubmit={EditPhoto} />;
      }
      }
    </Mutation>
  </div>
);

export default withStyles(styles)(UpdateProduct);
