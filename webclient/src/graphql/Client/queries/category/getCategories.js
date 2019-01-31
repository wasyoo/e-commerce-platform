import gql from 'graphql-tag';

export default gql`
  query {
    categories @client{
    id
    name
    parent {
      id
    }
  }
  }
`;
