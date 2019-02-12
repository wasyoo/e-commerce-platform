import gql from 'graphql-tag';

const SEND_ATTACH_EMAIL = gql`
  mutation SendAttachEmail($input: InputAttachMail) {
    sendAttachEmail(input: $input) {
      email
      status
    }
  }
`;

export default SEND_ATTACH_EMAIL;
