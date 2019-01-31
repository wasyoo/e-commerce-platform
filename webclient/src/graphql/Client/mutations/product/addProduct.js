import gql from 'graphql-tag';

export default gql`
mutation AddProductClient(
  $id: ID
  $name: String
  $description: String
  $price: String
  $quantity: String
  $image: String
) {
  addProductClient(
    id: $id
    name: $name
    description: $description
    price: $price
    quantity: $quantity
    image: $image
  ) @client
}
`;
