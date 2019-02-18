const attachMail = `
  type AttachMail{
    file: Upload
    name: String
    email: String
    status: Boolean
  }
  
  input InputAttachMail{
    file: Upload!
    name: String!
    email: String!
  }
`;

export default attachMail;
