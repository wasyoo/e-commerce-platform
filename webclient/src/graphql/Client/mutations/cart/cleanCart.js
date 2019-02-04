import gql from 'graphql-tag';

export default gql`
  mutation CleanCart($items: OrderItem, $totalPrice: Int, $totalQuantity: Int){
    cleanCart(items: $items, totalPrice: $totalPrice, totalQuantity: $totalQuantity) @client
  }
`;
