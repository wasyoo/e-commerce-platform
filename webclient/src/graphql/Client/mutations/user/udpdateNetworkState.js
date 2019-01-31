import gql from 'graphql-tag';

const UPDATE_NETWORK_STATUS = gql`
  mutation UpdateNetworkStatus($isConnected: Boolean!, $role: String!) {
    updateNetworkStatus(isConnected: $isConnected, role:$role) @client
  }
`;

export default UPDATE_NETWORK_STATUS;
