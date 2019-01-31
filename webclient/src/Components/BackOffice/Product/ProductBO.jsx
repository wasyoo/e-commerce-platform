import React from 'react';
import { Query, Mutation } from 'react-apollo';
import ProductList from './ProductList';
import GET_PRODUCTS from '../../../graphql/queries/product/getProducts';
import DELETE_PRODUCT from '../../../graphql/mutations/product/deleteProduct';

const ProductBO = () => (
  <div>
    <Mutation
      mutation={DELETE_PRODUCT}
      refetchQueries={[{ query: GET_PRODUCTS }]}
    >
      {(deleteProduct) => (
        <Query query={GET_PRODUCTS}>
          {({ loading, data }) => {
            if (loading) return <h1> Chargement... </h1>;
            return <ProductList products={data.products} onDelete={deleteProduct} />;
          }
          }
        </Query>
      )}
    </Mutation>
  </div>
);

export default ProductBO;
