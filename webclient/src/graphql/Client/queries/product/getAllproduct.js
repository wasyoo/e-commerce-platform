import gql from 'graphql-tag';

export default gql`
query GetAllProduct {
  product @client {
    id
    name
    description
    price
    quantity
    image
  }
}
`;
