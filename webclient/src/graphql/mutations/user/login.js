import gql from 'graphql-tag';

const LOGIN = gql`
  mutation($input: loginInput){
    login(input: $input) {
      token
      user {
      id
      firstName
      lastName
      email
      phone
      role
      address
      order {
        id
        items {
          product {
            id
            name
            quantity
          }
          quantity
        }
      }
    }
  }
}`;
export default LOGIN;
