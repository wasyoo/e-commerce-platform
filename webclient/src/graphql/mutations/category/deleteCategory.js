import gql from 'graphql-tag';

const DELETE_CATEGORIES = gql`
mutation DeleteCategory($id: ID!) {
  deleteCategory(id: $id) {
    id
    name
  }
}
`;
export default DELETE_CATEGORIES;
