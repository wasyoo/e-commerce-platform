export const brandMutations = `
  addBrand(input: InputBrand): Brand,
  editBrand(id:ID! ,input: InputBrand): Brand,
  deleteBrand(id: ID!): Brand
`;

export const brandResolvers = {
  addBrand: (_, { input }, { models }) => {
    const brand = new models.Brand({
      ...input,
    });
    return brand.save();
  },
  editBrand: async (_, { id, input }, { models }) => {
    const brand = await models.Brand.findById(id);
    if (!brand) {
      throw new Error(`Impossible de trouver la catégorie avec l'identifiant ${brand}`);
    }
    return models.Brand.findOneAndUpdate(
      { _id: id }, { ...input },
      { new: true }
    );
  },
  deleteBrand: async (_, { id }, { models }) => models.Brand.findOneAndDelete({ _id: id }),
};
