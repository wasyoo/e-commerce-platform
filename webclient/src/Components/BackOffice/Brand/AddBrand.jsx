import React from 'react';
import { Mutation, compose, graphql } from 'react-apollo';
import { withStyles } from '@material-ui/core/styles';
import BrandForm from './BrandForm';
import ADD_BRAND from '../../../graphql/mutations/brand/addBrand';
import GET_BRAND from '../../../graphql/queries/brand/getBrands';
import ADD_MSG_FLASH from '../../../graphql/Client/mutations/flashMsg/addFlashMsg';
import styles from '../../Shared/Styles/FormStyle';

const AddBrand = ({ history, addMsgFlash, classes }) => (
  <div className={classes.container}>
    <h1> Ajouter une marque </h1>
    <Mutation
      mutation={ADD_BRAND}
      refetchQueries={[{ query: GET_BRAND }]}
    >
      {(addBrand, { data, loading }) => {
        if (loading) return <h1>Chargement...</h1>;
        if (data) {
          addMsgFlash({
            variables: {
              message: 'La marque a été ajouté avec succès',
              type: 'success',
              status: true,
            },
          });
          history.push('/admin/brands');
        }
        return <BrandForm buttonText="Ajouter" onSubmit={addBrand} />;
      }}
    </Mutation>
  </div>
);

export default compose(
  graphql(ADD_MSG_FLASH, { name: 'addMsgFlash' })
)(withStyles(styles)(AddBrand));
