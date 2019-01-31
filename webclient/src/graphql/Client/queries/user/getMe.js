import gql from 'graphql-tag';

const GET_ME = gql`
  query GetMe{
    me @client {
      user{
        id
        firstName
        lastName
        email
        phone
        address
        order {
          id
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
      }
    }
  }
}
`;

export default GET_ME;
