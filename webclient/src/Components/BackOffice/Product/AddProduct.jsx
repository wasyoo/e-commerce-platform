import React from 'react';
import { Mutation, compose, graphql } from 'react-apollo';
import { withStyles } from '@material-ui/core/styles';
import ProductForm from './ProductForm';
import ADD_PRODUCT from '../../../graphql/mutations/product/addProduct';
import GET_PRODUCTS from '../../../graphql/queries/product/getProducts';
import ADD_MSG_FLASH from '../../../graphql/Client/mutations/flashMsg/addFlashMsg';
import styles from '../../Shared/Styles/FormStyle';

const AddProduct = ({ classes, history, addMsgFlash }) => (
  <div className={classes.container}>
    <h1> Ajouter un Produit </h1>
    <Mutation
      mutation={ADD_PRODUCT}
      refetchQueries={[{ query: GET_PRODUCTS }]}
    >
      {(addProduct, { loading, data }) => {
        if (loading) return <h3>Chargement...</h3>;
        if (data) {
          addMsgFlash({
            variables: {
              message: 'Le produit a été ajouté avec succès',
              type: 'success',
              status: true,
            },
          });
          history.push('/admin/product');
        }
        return <ProductForm buttonText="Ajouter" onSubmit={addProduct} />;
      }
      }
    </Mutation>
  </div>
);

export default compose(
  graphql(ADD_MSG_FLASH, { name: 'addMsgFlash' })
)(withStyles(styles)(AddProduct));
