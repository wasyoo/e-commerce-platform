export const categoryQueries = `
  categories: [Category]
  category(id: ID!): Category
`;

export const categoryResolvers = {
  categories: (_, $, { models }) => models.Category.find({}, {}, { sort: { createdAt: -1 } }),
  category: (_, { id }, { models }) => models.Category.findById(id),
};
