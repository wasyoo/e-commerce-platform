import gql from 'graphql-tag';

const UPDATE_BRAND = gql`
  mutation EditBrand($id: ID!, $input: InputBrand){
    editBrand(id: $id, input: $input){
      id
      name
      description
      filename
    }
  }
`;

export default UPDATE_BRAND;
