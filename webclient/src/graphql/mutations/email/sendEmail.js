import gql from 'graphql-tag';

const SEND_EMAIL = gql`
mutation SendEmail($input: InputEmail){
  sendEmail(input: $input) {
    email
    status
  }
}
`;

export default SEND_EMAIL;
