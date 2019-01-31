import gql from 'graphql-tag';

const UPDATE_CATEGORY = gql`
mutation EditCategory($id: ID!, $input: InputCategory) {
  editCategory(id:$id, input: $input) {
    id
    name
  }
}
`;
export default UPDATE_CATEGORY;
