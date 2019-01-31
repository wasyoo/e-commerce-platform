import gql from 'graphql-tag';

const ADD_CATEGORY = gql`
mutation AddCategory($input: InputCategory) {
  addCategory(input: $input) {
    id
    name
  }
}
`;
export default ADD_CATEGORY;
