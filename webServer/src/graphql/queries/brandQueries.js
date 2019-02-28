export const brandQueries = `
  brands: [Brand]
  brand(id: ID!): Brand
`;

export const brandResolvers = {
  brands: (_, $, { models }) => models.Brand.find({}, {}, { sort: { createdAt: -1 } }),
  brand: (_, { id }, { models }) => models.Brand.findById(id),
};
