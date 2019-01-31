import gql from 'graphql-tag';

export default gql`
  mutation DeleteItem($input: ProductInput) {
    deleteItem(input: $input) @client
  }
`;
