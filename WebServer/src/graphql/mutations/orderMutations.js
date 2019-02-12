export const orderMutations = `
  addOrder(input: InputOrder): Order
  editOrder(id: ID!, input: InputOrder): Order
  deleteOrder(id: ID!):Order
`;

const updateProductQuantity = (items, models) => new Promise((resolve, reject) => {
  items.forEach(async (item) => {
    const product = await models.Product.findById(item.product);
    if (product.quantity >= item.quantity) {
      resolve(await models.Product.findOneAndUpdate(
        { _id: product.id },
        { quantity: (product.quantity - item.quantity) }
      ));
    } else {
      reject(new Error('la quantité n\'est pas disponible'));
    }
  });
});

export const orderResolvers = {
  addOrder: async (_, { input }, { userId, models }) => {
    // check quantity
    await updateProductQuantity(input.items, models);
    const order = new models.Order({
      userId,
      ...input,
    });
    return order.save();
  },

  editOrder: async (_, { id, input }, { models }) => {
    const order = await models.Order.findOne({ _id: id });
    if (!order) {
      throw new Error(`Impossible de trouver la commande avec l'identifiant ${order}`);
    }
    return models.Order.findOneAndUpdate(
      { _id: id }, { ...input },
      { new: true }
    );
  },

  deleteOrder: (_, { id }, { models }) => models.Order.findOneAndDelete({ _id: id }),
};
