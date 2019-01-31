import gql from 'graphql-tag';

const DELETE_PRODUCT = gql`
mutation DeleteProduct($id: ID!) {
  deleteProduct(id: $id) {
    id
    name
  }
}
`;
export default DELETE_PRODUCT;
