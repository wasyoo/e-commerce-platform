import gql from 'graphql-tag';

const UPDATE_NETWORK_STATUS = gql`
  mutation UpdateNetworkStatus($isConnected: Boolean!, $role: String!, $typeOfAuth: String!) {
    updateNetworkStatus(isConnected: $isConnected, role:$role, typeOfAuth:$typeOfAuth) @client
  }
`;

export default UPDATE_NETWORK_STATUS;
