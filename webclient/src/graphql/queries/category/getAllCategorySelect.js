import gql from 'graphql-tag';

const GET_ALL_CATEGORY_SELECT = gql`
{ 
  categories {
    id
    name
  }
}
`;
export default GET_ALL_CATEGORY_SELECT;
