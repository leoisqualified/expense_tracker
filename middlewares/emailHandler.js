import nodemailer from "nodemailer";

const emailHandler = async (to, subject, text, html) => {
  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "b30fcddb84e218",
      pass: "cffcee68e1b401",
    },
  });

  transport.sendMail({
    to: to,
    from: "noreply@mailtrap.io",
    subject: subject,
    text: text,
    html: html,
  });

  res.status(200).json({ status: "Reset Email sent" });
};

export default emailHandler;
