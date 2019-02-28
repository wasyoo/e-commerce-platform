import gql from 'graphql-tag';

const GET_BRAND = gql`
  {
    brands {
      id
      name
      description
      filename
    }
  }
`;

export default GET_BRAND;
