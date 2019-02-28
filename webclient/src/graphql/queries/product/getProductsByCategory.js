import gql from 'graphql-tag';

const GET_PRODUCT_BY_CATEGORY = gql`
  query ProductByCategory($idCategory: ID ){
    productsByCategory(idCategory: $idCategory) {
      id
      name
      description
      price
      quantity
      image
    }
  }
`;

export default GET_PRODUCT_BY_CATEGORY;
