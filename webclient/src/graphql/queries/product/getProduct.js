import gql from 'graphql-tag';

const GET_PRODUCT = gql`
  query GetProduct($id: ID!){
  product(id: $id) {
    id
    name
    description
    quantity
    price
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

export default GET_PRODUCT;
