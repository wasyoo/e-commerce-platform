import gql from 'graphql-tag';

const GET_CART = gql`
  query GetCart{
    cart @client {
      items {
        product {
          id
          name
          image
          quantity
          price
        }
        quantity
      }
      totalQuantity,
      totalPrice,
    }
}
`;

export default GET_CART;
