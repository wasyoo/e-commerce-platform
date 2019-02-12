const attachMail = `
  type AttachMail{
    file: Upload
    email: String
    status: Boolean
  }
  
  input InputAttachMail{
    file: Upload!
    email: String!
  }
`;

export default attachMail;
