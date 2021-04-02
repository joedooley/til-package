const sendgrid = require('@sendgrid/mail');

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

const createEmail = (to, subject, message, html) => {
  return {
    to,
    from: process.env.SENDGRID_SENDER,
    subject,
    text: message,
    html: html ?? `<p>${message}</p>`,
  };
};

const sendEmail = (to, subject, message, html) => {
  const email = createEmail(to, subject, message, html);
  console.log(`createEmail`, email);

  return sendgrid.send(email).then(
    response => {
      console.log(`sendgrid.send response`, response);
    },
    error => {
      console.error(error);

      if (error.response) {
        console.error(error.response.body);
      }
    }
  );
};

module.exports = { sendEmail };
