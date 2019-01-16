export const userQueries = `
    me: User
    user(id: ID!): User
    users: [User]
`;

export const userResolvers = {
  me: (_, $, { userId, models }) => models.User.findById(userId),
  user: (_, { id }, { models }) => models.User.findById(id),
  users: (_, $, { models }) => models.User.find({}, {}, { sort: { createdAt: -1 } }),
};
