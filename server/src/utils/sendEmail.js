import nodemailer from 'nodemailer';

const sendEmail = async ({ subject, html }) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    secure: false, // true for 465, false for 587
    auth: {
      user: process.env.SMTP_USER, // your email (e.g. admin or company gmail)
      pass: process.env.SMTP_PASS, // app-specific password
    },
  });

  const mailOptions = {
    from: `"Siddhidatri TV Lead Engine" <${process.env.SMTP_USER}>`,
    to: process.env.ADMIN_ALERT_EMAIL || 'info@siddhidatritv.com',
    subject,
    html,
  };

  await transporter.sendMail(mailOptions);
};

export default sendEmail;