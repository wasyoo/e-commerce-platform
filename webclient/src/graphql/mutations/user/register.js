import gql from 'graphql-tag';

const REGISTER = gql`
mutation Register($input: UserInput) {
  register(input: $input) {
    token
    user {
      id
      firstName
      lastName
      email
      avatar
      address
      phone
      role
      typeOfAuth
    }
  }
}
`;

export default REGISTER;
