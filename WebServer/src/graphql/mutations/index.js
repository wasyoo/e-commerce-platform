import { userMutations, userResolvers } from './userMutations';
import { categoryMutations, categoryResolvers } from './categoryMutations';
import { productMutations, productResolvers } from './productMutations';
import { orderMutations, orderResolvers } from './orderMutations';
import { attachEmailMutations, attachEmailResolvers } from './attachEmailMutations';
import { emailMutations, emailResolvers } from './emailMutations';

export const mutationsType = `
  type Mutation {
    ${userMutations}
    ${categoryMutations}
    ${productMutations}
    ${orderMutations}
    ${attachEmailMutations}
    ${emailMutations}
  }
`;

export const mutations = Object.assign(
  userResolvers,
  categoryResolvers,
  productResolvers,
  orderResolvers,
  attachEmailResolvers,
  emailResolvers,
);
