import gql from 'graphql-tag';

const ADD_ORDER = gql`
mutation ($input: InputOrder){
  addOrder(input: $input) {
    id
    items {
      product{
        id
        name
        quantity
        price
      }
      quantity
    }
    totalPrice
    totalQuantity
  }
}
`;

export default ADD_ORDER;
