import gql from 'graphql-tag';

const UPDATE_PRODUCT = gql`
mutation EditPhoto(
  $id: ID!,
  $input: ProductInput,
) {
  editProduct(
    id: $id,
    input: $input,
  ) {
    id
    name
    description
    quantity
    price
    image
  }
}
`;

export default UPDATE_PRODUCT;
