const file = `
  type File {
    file: Upload
    filename: String
    mimetype: String
    encoding: String
  }

  input InputFile {
    file: Upload!
  }
`;

export default file;
