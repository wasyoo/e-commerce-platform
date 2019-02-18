import gql from 'graphql-tag';

const GET_FLASH_MSG = gql`
  query GetFlashMsg{
    flashMsg @client {
      message
      type
      status
    }
}
`;

export default GET_FLASH_MSG;
