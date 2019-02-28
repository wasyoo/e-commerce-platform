import gql from 'graphql-tag';

const GET_PRODUCTS = gql`
  query {
    products {
      id
      name
      description
      price
      quantity
      image
      category {
        id
        name
      }
      brand {
        id
        name
        filename
      }
    }
  }
`;

export default GET_PRODUCTS;
