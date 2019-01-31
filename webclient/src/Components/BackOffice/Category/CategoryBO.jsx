import React from 'react';
import { Query, Mutation } from 'react-apollo';
import CategoryTable from './CategoryList';
import GET_CATEGORIES from '../../../graphql/queries/category/getAllCatergories';
import DELETE_CATEGORIES from '../../../graphql/mutations/category/deleteCategory';

const CategoryBO = () => (
  <div>
    <Mutation
      mutation={DELETE_CATEGORIES}
      refetchQueries={[{ query: GET_CATEGORIES }]}
    >
      {(deleteCategory) => (
        <Query query={GET_CATEGORIES}>
          {({ loading, data }) => {
            if (loading) return <h1> Chargement... </h1>;
            return <CategoryTable onDelete={deleteCategory} categories={data.categories} />;
          }
          }
        </Query>
      )}
    </Mutation>
  </div>
);

export default CategoryBO;
