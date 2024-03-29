import nodemailer from "nodemailer";

const sendEmail = (to, subject, body, html) => {
  const callback = (err, info) => {
    if (err) {
      console.log(err);
    }
    console.log(info);
  };
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  transporter.sendMail(
    {
      from: "contactoscinmobiliaria@gmail.com",
      to: "rubengianelli8@gmail.com",
      subject: subject,
      text: html ? null : body,
      html: html ? body : null,
    },
    callback
  );
};

export default sendEmail;
