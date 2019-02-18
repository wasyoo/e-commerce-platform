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
          user: process.env.AUTH_USER,
          pass: process.env.AUTH_PASSWORD,
        },
      });

      const mailOptions = {
        from: 'contact@cybershop.tn', // sender address
        to: input.email, // list of receivers
        subject: 'Bon de commande', // Subject line
        html: `Bonjour <strong>${input.name}</strong>
              <p>
                  Merci pour votre commande, 
                  Nous l'avons reçue et la traiterons dans les plus brefs délais
              </p>
              <p>
                veuillez trouver ci-joint votre bon de commande
              </p>
              <p>
                Vous remerciant de votre confiance, nous vous prions d’agréer,
                Madame, Monsieur, l’expression de nos cordiales salutations.
              </p>`, // plain text body
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
