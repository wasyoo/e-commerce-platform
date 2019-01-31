import gql from 'graphql-tag';

export default gql`
  mutation AddOneItem($input: ProductInput) {
    addOneItem(input: $input) @client
  }
`;
