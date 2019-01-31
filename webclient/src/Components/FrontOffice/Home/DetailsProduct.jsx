import React from 'react';
import { Query } from 'react-apollo';
import GET_PRODUCT from '../../../graphql/queries/product/getProduct';

const DetailsProduct = ({ match }) => (
  <div>
    <Query query={GET_PRODUCT} variables={{ id: match.params.id }}>
      {({ data, loading }) => {
        if (loading) return <h1> Chargement... </h1>;
        if (data) {
          const {
            id, name, image, description, price, quantity,
          } = data.product;
          return (
            <>
              <h1>{name}</h1>
              <p>{description}</p>
            </>
          );
        }
        return null;
      }}
    </Query>
  </div>
);

export default DetailsProduct;
