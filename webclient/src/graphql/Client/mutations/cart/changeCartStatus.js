import gql from 'graphql-tag';

const CHANGE_CART_STATUS = gql`
  mutation ChangeCartStatus($open: Boolean) {
    changeCartStatus(open: $open) @client
  }
`;

export default CHANGE_CART_STATUS;
