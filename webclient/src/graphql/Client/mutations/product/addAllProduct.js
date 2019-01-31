import gql from 'graphql-tag';

export default gql`
mutation AddAllProductClient(
  $products: Array
) {
  addAllProductClient(
    products: $products
  ) @client
}
`;
