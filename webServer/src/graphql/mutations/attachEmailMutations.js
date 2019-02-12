import nodemailer from 'nodemailer';

export const attachEmailMutations = `
  sendAttachEmail(input: InputAttachMail): AttachMail!
`;

const blobToFile = (theBlob, fileName) =>
  // A Blob() is almost a File() - it's just missing the two properties below which we will add
  ({
    ...theBlob,
    name: fileName,
    lastModifiedDate: new Date(),
  });
export const attachEmailResolvers = {
  async sendAttachEmail(parent, { input }) {
    try {
      const { createReadStream, filename } = await input.file;

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'nodemaileroyez@gmail.com',
          pass: 'nodemailer2019',
        },
      });

      const mailOptions = {
        from: 'contact@cybershop.tn', // sender address
        to: input.email, // list of receivers
        subject: 'Subject of your email', // Subject line
        html: '<h1>Your html here</h1>', // plain text body
        attachments: [
          {
            filename: 'Bon de commande.pdf',
            content: createReadStream(blobToFile(input.file, filename)),
          },
        ],
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log(err);
        }
        console.log(info);
        return true;
      });
    } catch (err) {
      return err;
    }
    return {
      email: input.email,
      status: true,
    };
  },
};
