import React from 'react';
import {
  Query, Mutation, compose, graphql,
} from 'react-apollo';
import CategoryTable from './CategoryList';
import GET_CATEGORIES from '../../../graphql/queries/category/getAllCatergories';
import DELETE_CATEGORIES from '../../../graphql/mutations/category/deleteCategory';
import ADD_MSG_FLASH from '../../../graphql/Client/mutations/flashMsg/addFlashMsg';

const CategoryBO = ({ addMsgFlash }) => (
  <div>
    <Mutation
      mutation={DELETE_CATEGORIES}
      refetchQueries={[{ query: GET_CATEGORIES }]}
    >
      {(deleteCategory, { data }) => {
        if (data) {
          console.log(data);
          addMsgFlash({
            variables: {
              message: `"${data.deleteCategory.name}" à été supprimé avec succès`,
              type: 'success',
              status: true,
            },
          });
        }
        return (
          <Query query={GET_CATEGORIES}>
            {({ loading, data: { categories } }) => {
              if (loading) return <h1> Chargement... </h1>;
              return <CategoryTable onDelete={deleteCategory} categories={categories} />;
            }
            }
          </Query>
        );
      }}
    </Mutation>
  </div>
);

export default compose(
  graphql(ADD_MSG_FLASH, { name: 'addMsgFlash' })
)(CategoryBO);
