import React from 'react';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import styles from '../../Shared/Styles/FormStyle';
import CategoryForm from './CategoryForm';
import UPDATE_CATEGORY from '../../../graphql/mutations/category/updateCategory';
import GET_GATEGORIES from '../../../graphql/queries/category/getAllCatergories';

const UpdateCategory = ({ history, classes, location: { category } }) => (
  <div className={classes.container}>
    <h1> Éditer la catégorie </h1>
    <Mutation
      mutation={UPDATE_CATEGORY}
      refetchQueries={GET_GATEGORIES}
    >
      {(editCategory, { loading, data }) => {
        if (loading) return <h1> Modification en cours ... </h1>;
        if (data) {
          history.push('/admin/categories');
        }
        return <CategoryForm category={category} onSubmit={editCategory} buttonText="Modifier" />;
      } }
    </Mutation>
  </div>
);

export default withStyles(styles)(withRouter(UpdateCategory));
