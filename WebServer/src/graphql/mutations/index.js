import { userMutations, userResolvers } from './userMutations';
import { categoryMutations, categoryResolvers } from './categoryMutations';
import { productMutations, productResolvers } from './productMutations';
import { orderMutations, orderResolvers } from './orderMutations';
import { attachEmailMutations, attachEmailResolvers } from './attachEmailMutations';
import { emailMutations, emailResolvers } from './emailMutations';
import { fileMutations, fileResolvers } from './fileMutations';
import { brandMutations, brandResolvers } from './brandMutations';

export const mutationsType = `
  type Mutation {
    ${userMutations}
    ${categoryMutations}
    ${productMutations}
    ${orderMutations}
    ${attachEmailMutations}
    ${emailMutations}
    ${fileMutations}
    ${brandMutations}
  }
`;

export const mutations = Object.assign(
  userResolvers,
  categoryResolvers,
  productResolvers,
  orderResolvers,
  attachEmailResolvers,
  emailResolvers,
  fileResolvers,
  brandResolvers,
);
