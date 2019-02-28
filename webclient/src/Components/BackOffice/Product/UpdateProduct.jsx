import React from 'react';
import { Mutation, compose, graphql } from 'react-apollo';
import { withStyles } from '@material-ui/core/styles';
import ProductForm from './ProductForm';
import UPDATE_PRODUCT from '../../../graphql/mutations/product/upadateProduct';
import GET_PRODUCTS from '../../../graphql/queries/product/getProducts';
import ADD_MSG_FLASH from '../../../graphql/Client/mutations/flashMsg/addFlashMsg';
import styles from '../../Shared/Styles/FormStyle';

const UpdateProduct = ({
  classes, history, location: { product }, addMsgFlash,
}) => (
  <div className={classes.container}>
    <h1> Éditer le Produit </h1>
    <Mutation
      mutation={UPDATE_PRODUCT}
      refetchQueries={[{ query: GET_PRODUCTS }]}
    >
      {(EditPhoto, { data, loading }) => {
        if (loading) return <h3>Modification en cours ...</h3>;
        if (data) {
          addMsgFlash({
            variables: {
              message: 'Le produit a été mis à jour avec succès',
              type: 'success',
              status: true,
            },
          });
          history.push('/admin/product');
        }
        return <ProductForm buttonText="Modifier" product={product} onSubmit={EditPhoto} />;
      }
      }
    </Mutation>
  </div>
);

export default compose(
  graphql(ADD_MSG_FLASH, { name: 'addMsgFlash' })
)(withStyles(styles)(UpdateProduct));
