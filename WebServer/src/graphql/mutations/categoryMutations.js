export const categoryMutations = `
  addCategory(input: InputCategory): Category,
  editCategory(id:ID! ,input: InputCategory): Category,
  deleteCategory(id: ID!): Category
`;

export const categoryResolvers = {
  addCategory: (_, { input }, { models }) => {
    const category = new models.Category({
      ...input,
    });
    return category.save();
  },
  editCategory: async (_, { id, input }, { models }) => {
    const category = await models.Category.findById(id);
    if (!category) {
      throw new Error(`Couldn't find category with id ${category}`);
    }
    return models.Category.findOneAndUpdate(
      { _id: id }, { ...input },
      { new: true }
    );
  },
  deleteCategory: async (_, { id }, { models }) => models.Category.findOneAndDelete({ _id: id }),
};
