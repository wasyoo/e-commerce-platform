import gql from 'graphql-tag';

const EDIT_PASSWORD = gql`
  mutation EditPassword ($input: PasswordInput){
  editPasswordUser(input: $input){
    id
  }
}
`;

export default EDIT_PASSWORD;
