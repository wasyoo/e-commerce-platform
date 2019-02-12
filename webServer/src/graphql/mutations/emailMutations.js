import nodemailer from 'nodemailer';

export const emailMutations = `
  sendEmail(input: InputEmail): Email
`;

export const emailResolvers = {
  sendEmail: async (_, { input }) => {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'nodemaileroyez@gmail.com',
          pass: 'nodemailer2019',
        },
      });

      const mailOptions = {
        from: input.email, // sender address
        to: 'nodemaileroyez@gmail.com', // list of receivers
        subject: 'Message from WebSite', // Subject line
        html: `<ul>
          <li> Nom: ${input.email}</li>
          <li> N° tel: ${input.phone}</li>
          <li> Message: ${input.message}</li>
        </ul>`, // plain text body
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
