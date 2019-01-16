export const orderQueries = `
  orders: [Order]
  order(id: ID!): Order
`;

export const orderResolvers = {
  orders: (_, $, { models }) => models.Order.find({}, {}, { sort: { createdAt: -1 } }),
  order: (_, { id }, { models }) => models.Order.findById(id),
};
