import gql from 'graphql-tag';

const UPLOAD_FILE = gql`
  mutation UploadFile($input: InputFile) {
    uploadFile(input: $input) {
      filename
    }
  }
`;

export default UPLOAD_FILE;
