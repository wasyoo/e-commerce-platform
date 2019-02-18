const order = `
  type Order {
    id: ID!
    user: User
    items: [OrderItem]
    totalPrice: Float
    totalQuantity: Int
    createdAt: String
    updatedAt: String
    state: String
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
    items: [OrderItemInput]
    totalPrice: Float
    totalQuantity: Int
    state: String
  }
`;

export default order;
