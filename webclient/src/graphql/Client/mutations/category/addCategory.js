import gql from 'graphql-tag';

export default gql`
  mutation AddCategory($name: String) {
  addCategory(input: { name: $name }) @client{
      id
      name
    }
  }
`;
