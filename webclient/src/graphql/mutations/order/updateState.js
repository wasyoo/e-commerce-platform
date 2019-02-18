import gql from 'graphql-tag';

const UPDATE_STATE = gql`
  mutation EditOrder(
    $id: ID!, 
    $input: InputOrder
  ) {
    editOrder(id: $id, input: $input) {
      id
      state
    }
  }
`;

export default UPDATE_STATE;
