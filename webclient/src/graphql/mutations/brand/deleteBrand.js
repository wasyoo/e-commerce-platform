import gql from 'graphql-tag';

const DELETE_BRAND = gql`
  mutation DeleteBrand($id: ID!){
    deleteBrand(id: $id){
      id
    }
  }
`;

export default DELETE_BRAND;
