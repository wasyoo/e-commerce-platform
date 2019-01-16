const order = `
  type Order {
    id: ID!
    user: User
    items: [OrderItem]
  }

  type OrderItem{
    product: Product
    quantity: Int
  }
  
  input OrderItemInput {
    product: String!
    quantity: Int!
  }

  input InputOrder{
    items: [OrderItemInput]!
  }
`;

export default order;
