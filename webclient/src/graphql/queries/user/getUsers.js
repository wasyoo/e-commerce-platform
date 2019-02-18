import gql from 'graphql-tag';

const GET_USERS = gql`
  {
    users {
      id
      firstName
      lastName
      email
      phone
      address
      avatar
      order {
        id
      }
    }
  }
`;

export default GET_USERS;
