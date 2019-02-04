const order = `
  type Order {
    id: ID!
    user: User
    items: [OrderItem]
    totalPrice: Float
    totalQuantity: Int
  }

  type OrderItem{
    product: Product
    quantity: Int
  }
  
  input OrderItemInput {
    product: ID!
    quantity: Int!
  }

  input InputOrder{
    items: [OrderItemInput]!
    totalPrice: Float
    totalQuantity: Int
  }
`;

export default order;
