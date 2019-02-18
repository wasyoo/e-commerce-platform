import gql from 'graphql-tag';

const GET_ORDERS = gql`
  {
    orders {
      id
      user {
        firstName
        lastName
        avatar
      }
      items {
        product {
          id
          name
          image
          price
        }
        quantity
      }
      state
      totalQuantity
      totalPrice
      createdAt
      updatedAt
    }
  }
`;

export default GET_ORDERS;
