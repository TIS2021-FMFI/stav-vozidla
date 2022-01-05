const nodemailer = require('nodemailer');
const { EMAIL_NAME, EMAIL_PASSWORD } = require(__dirname +
  '/../config/config.json');

const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      service: 'Gmail',
      port: 587,
      secure: true,
      auth: {
        user: EMAIL_NAME,
        pass: EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: 'stav.vozidla@gmail.com',
      to: email,
      subject: subject,
      text: text,
    });

    console.log('email sent sucessfully');
  } catch (error) {
    console.log(error, 'email not sent');
    throw error;
  }
};

module.exports = sendEmail;
