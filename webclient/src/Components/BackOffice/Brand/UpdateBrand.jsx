import React from 'react';
import { Mutation, compose, graphql } from 'react-apollo';
import { withStyles } from '@material-ui/core/styles';
import BrandForm from './BrandForm';
import UPDATE_BRAND from '../../../graphql/mutations/brand/updateBrand';
import GET_BRAND from '../../../graphql/queries/brand/getBrands';
import ADD_MSG_FLASH from '../../../graphql/Client/mutations/flashMsg/addFlashMsg';
import styles from '../../Shared/Styles/FormStyle';

const UpdateBrand = ({
  classes, history, location: { brand }, addMsgFlash,
}) => (
  <div className={classes.container}>
    <h1> Éditer le Produit </h1>
    <Mutation
      mutation={UPDATE_BRAND}
      refetchQueries={[{ query: GET_BRAND }]}
    >
      {(editBrand, { data, loading }) => {
        if (loading) return <h3>Modification en cours ...</h3>;
        if (data) {
          addMsgFlash({
            variables: {
              message: 'La marque a été mise à jour avec succès',
              type: 'success',
              status: true,
            },
          });
          history.push('/admin/product');
        }
        return <BrandForm buttonText="Modifier" brand={brand} onSubmit={editBrand} />;
      }
      }
    </Mutation>
  </div>
);

export default compose(
  graphql(ADD_MSG_FLASH, { name: 'addMsgFlash' })
)(withStyles(styles)(UpdateBrand));
