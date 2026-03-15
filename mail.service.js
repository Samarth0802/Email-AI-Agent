import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.GMAIL_USER,
    clientId: process.env.GMAIL_CLIENT_ID,
    clientSecret: process.env.GMAIL_CLIENT_SECRET,
    refreshToken: process.env.GMAIL_REFRESH_TOKEN,
  },
});

const sendEmailService = async (to, subject, html) => {
  try {

    const info = await transporter.sendMail({
      from: `"AI Agent" <${process.env.GMAIL_USER}>`,
      to,
      subject,
      html
    });

    console.log("Email sent:", info.messageId);

    return `Email sent successfully to ${to}`;

  } catch (error) {

    console.error("Error sending email:", error);
    return "Failed to send email";

  }
};

export default sendEmailService;