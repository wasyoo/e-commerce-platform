import gql from 'graphql-tag';

const GET_ME = gql`
  query GetMe {
    me @client {
      user {
        id
        firstName
        lastName
        email
        phone
        address
        avatar
      }
    }
  }
`;

export default GET_ME;
