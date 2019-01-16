import { userMutations, userResolvers } from './userMutations';
import { categoryMutations, categoryResolvers } from './categoryMutations';
import { productMutations, productResolvers } from './productMutations';
import { orderMutations, orderResolvers } from './orderMutations';

export const mutationsType = `
  type Mutation {
    ${userMutations}
    ${categoryMutations}
    ${productMutations}
    ${orderMutations}
  }
`;

export const mutations = Object.assign(
  userResolvers,
  categoryResolvers,
  productResolvers,
  orderResolvers,
);
