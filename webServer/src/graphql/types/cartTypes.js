const Cart = `
  type Cart {
    id: ID!
    user: User
    items: [OrderItem]
  }

  type CartItem{
    product: Product
    quantity: Int
  }
  
  input CartItemInput {
    product: String!
    quantity: Int!
  }

  input InputCart{
    items: [CartItemInput]!
  }
`;

export default Cart;
