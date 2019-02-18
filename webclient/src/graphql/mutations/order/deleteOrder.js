import gql from 'graphql-tag';

const DELETE_ORDER = gql`
mutation DeleteOrder($id: ID!) {
  deleteOrder(id: $id) {
    id
  }
}
`;
export default DELETE_ORDER;
