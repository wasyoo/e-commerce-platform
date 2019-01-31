import gql from 'graphql-tag';

const GET_NETWORK_STATUS = gql`
  query GetNetworkStatus{
    networkStatus @client {
      isConnected
      role
    }
  }
`;

export default GET_NETWORK_STATUS;
