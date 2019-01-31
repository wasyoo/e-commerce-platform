import gql from 'graphql-tag';

const GET_CATEGORIES = gql`
query GetCategories {
  categories {
    id
    name
    parent {
      id
    }
    products {
      id
      name
      quantity
    }
  }
}
`;
export default GET_CATEGORIES;
