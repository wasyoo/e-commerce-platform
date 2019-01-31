import gql from 'graphql-tag';

const UPDATE_ME = gql`
  mutation UpdateMe($user: UserInput) {
    updateMe(user: $user) @client
  }
`;

export default UPDATE_ME;
