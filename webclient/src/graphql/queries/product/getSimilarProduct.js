import gql from 'graphql-tag';

const GET_SIMILAR_PRODUCT = gql`
  query SimilarProduct($idProduct: ID, $idCategory: ID) {
    similarProduct(idProduct: $idProduct, idCategory: $idCategory) {
      id
      name
      description
      price
      image
    }
  }
`;

export default GET_SIMILAR_PRODUCT;
