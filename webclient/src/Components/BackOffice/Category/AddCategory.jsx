import React from 'react';
import { Mutation, compose, graphql } from 'react-apollo';
import { withStyles } from '@material-ui/core/styles';
import ADD_CATEGORY from '../../../graphql/mutations/category/addCategory';
import GET_CATEGORIES from '../../../graphql/queries/category/getAllCatergories';
import ADD_MSG_FLASH from '../../../graphql/Client/mutations/flashMsg/addFlashMsg';
import CategoryForm from './CategoryForm';
import styles from '../../Shared/Styles/FormStyle';

const AddCategory = ({ classes, history, addMsgFlash }) => (
  <div className={classes.container}>
    <h1> Ajouter une categorie </h1>
    <Mutation
      mutation={ADD_CATEGORY}
      refetchQueries={[{ query: GET_CATEGORIES }]}
    >
      {
        (addCategory, { loading, data }) => {
          if (loading) return <h3>Chargement...</h3>;
          if (data) {
            addMsgFlash({
              variables: {
                message: 'La catégorie à été ajouté avec succès',
                type: 'success',
                status: true,
              },
            });
            history.push('/admin/categories');
          }
          return <CategoryForm onSubmit={addCategory} buttonText="Ajouter" />;
        }
      }
    </Mutation>
  </div>
);

export default compose(
  graphql(ADD_MSG_FLASH, { name: 'addMsgFlash' })
)(withStyles(styles)(AddCategory));
