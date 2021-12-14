import nodemailer from 'nodemailer';

const sendEmail = (to, subject, body, html) => {
  const callback = (err, info) => {
    if (err) {
      console.log(err);
    }
    console.log(info);
  };
  const transporter = nodemailer.createTransport({
    host: 'mail.tiarg.net',
    port: 587,
    secure: false,
    auth: {
      user: 'noreply@tiarg.net',
      pass: 'Tiarg2021',
    },
  });
  transporter.sendMail(
    {
      from: 'noreply@tiarg.net',
      to: to,
      subject: subject,
      text: html ? null : body,
      html: html ? body : null,
    },
    callback,
  );
};

export default sendEmail;
