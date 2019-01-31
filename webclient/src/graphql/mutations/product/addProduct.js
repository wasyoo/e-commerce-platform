import gql from 'graphql-tag';

const ADD_PRODUCT = gql`
mutation AddProduct($input: ProductInput) {
  addProduct(input: $input) {
    id
    name
    description
    price
    quantity
    image
    category {
      id
    }
  }
}
`;

export default ADD_PRODUCT;
