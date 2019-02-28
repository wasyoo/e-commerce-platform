import gql from 'graphql-tag';

const ADD_BRAND = gql`
  mutation AddBrand($input: InputBrand){
    addBrand(input: $input){
      name
      description
      filename
    }
  }
`;

export default ADD_BRAND;
