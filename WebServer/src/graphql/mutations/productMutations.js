export const productMutations = `
  addProduct(input: ProductInput): Product
  editProduct(id: ID!, input: ProductInput): Product
  deleteProduct(id: ID!): Product
`;

export const productResolvers = {
  addProduct: (_, { input }, { models }) => {
    const product = new models.Product({
      ...input,
    });
    return product.save();
  },
  editProduct: async (_, { id, input }, { models }) => {
    const product = await models.Product.findById(id);
    if (!product) {
      throw new Error(`Couldn't find product with id ${product}`);
    }
    return models.Product.findOneAndUpdate({ _id: id }, { ...input }, { new: true });
  },
  deleteProduct: async (_, { id }, { models }) => models.Product.findOneAndDelete({ _id: id }),
};
