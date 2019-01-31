import gql from 'graphql-tag';

const GET_CART_STATUS = gql`
  query GetCartStatus{
    cartStatus @client {
      open
    }
}
`;

export default GET_CART_STATUS;
