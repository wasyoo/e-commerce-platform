import { ApolloServer, gql } from 'apollo-server-express';
import Type from './types';
import { queriesType, queries } from './queries';
import { mutationsType, mutations } from './mutations';
import { verifyToken } from '../utils/jwt.utils.js';
import User from '../db/models/user';
import Product from '../db/models/product';
import Category from '../db/models/category';
import Order from '../db/models/order';
import Brand from '../db/models/brand';

const typeDefs = gql`
      ${Type}
      ${queriesType}
      ${mutationsType}
`;

const relations = {
  User: {
    order: (parent, $, { models }) => models.Order.find({ userId: parent.id }),
  },
  Product: {
    category: (parent, $, { models }) => models.Category.findById(parent.category),
    brand: (parent, $, { models }) => models.Brand.findById(parent.brand),
  },
  Category: {
    parent: (parent, $, { models }) => models.Category.findById(parent.parent),
    products: (parent, $, { models }) => models.Product.find({ category: parent.id }),
  },
  Order: {
    user: (parent, $, { models }) => models.User.findById(parent.userId),
  },
  OrderItem: {
    product: (parent, $, { models }) => models.Product.findById(parent.product),
  },
};

export default new ApolloServer({
  typeDefs,
  resolvers: Object.assign({ Query: queries }, { Mutation: mutations }, relations),
  context: ({ req }) => {
    const userId = verifyToken(req.headers.authorization);
    return {
      userId,
      models: {
        User,
        Product,
        Category,
        Order,
        Brand,
      },
    };
  },
});
