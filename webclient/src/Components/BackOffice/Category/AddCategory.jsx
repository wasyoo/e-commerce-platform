import React from 'react';
import { Mutation } from 'react-apollo';
import { withStyles } from '@material-ui/core/styles';
import ADD_CATEGORY from '../../../graphql/mutations/category/addCategory';
import GET_CATEGORIES from '../../../graphql/queries/category/getAllCatergories';
import CategoryForm from './CategoryForm';
import styles from '../../Shared/Styles/FormStyle';

const AddCategory = ({ classes, history }) => (
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
            history.push('/admin/categories');
          }
          return <CategoryForm onSubmit={addCategory} buttonText="Ajouter" />;
        }
      }
    </Mutation>
  </div>
);

export default withStyles(styles)(AddCategory);
