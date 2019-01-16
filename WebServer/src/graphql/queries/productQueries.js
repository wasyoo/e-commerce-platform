export const productQueries = `
  products: [Product]
  product(id: ID!): Product
  productsByCategory(idCategory: ID): [Product]
`;

export const productResolvers = {
  products: (_, $, { models }) => models.Product.find({}, {}, { sort: { createdAt: -1 } }),
  product: (_, { id }, { models }) => models.Product.findById(id),
  productsByCategory: (_, { idCategory }, { models }) =>
    models.Product.find({ category: idCategory }, {}, { sort: { createdAt: -1 } }),
};
