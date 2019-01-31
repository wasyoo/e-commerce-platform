import gql from 'graphql-tag';

const EDIT_USER = gql`
mutation EditUser($input: UserInput) {
  editUser(input: $input) {
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
`;

export default EDIT_USER;
