import gql from 'graphql-tag';

export default gql`
  mutation MinusOneItem($id: ID) {
    minusOneItem(id: $id) @client
  }
`;
