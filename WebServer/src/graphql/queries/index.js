import { userQueries, userResolvers } from './userQueries';
import { productQueries, productResolvers } from './productQueries';
import { categoryQueries, categoryResolvers } from './categoryQueries';
import { orderQueries, orderResolvers } from './orderQueries';

export const queriesType = `
type Query {
    ${userQueries}
    ${productQueries}
    ${categoryQueries}
    ${orderQueries}
}`;

export const queries = Object.assign(
  userResolvers,
  productResolvers,
  categoryResolvers,
  orderResolvers
);
