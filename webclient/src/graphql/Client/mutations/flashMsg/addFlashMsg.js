import gql from 'graphql-tag';

export default gql`
  mutation AddMsgFlash($message: String, $type: String, $status: Boolean) {
    addMsgFlash(message: $message, type: $type, status: $status) @client
  }
`;
