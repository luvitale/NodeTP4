/** Dependencies */
// Nodemailer
import nodemailer from 'nodemailer'
import dotenv from 'dotenv-safe'

dotenv.config()

/** Email Functions Handler */
// REQUESTOR Noty Email
const sendMail2Requestor = async requestorEmail => {
  /** Env Variables */
  const {
      // Gmail's Email (Gmail Access)
      GMAIL_EMAIL = process.env.GMAIL_EMAIL,
      // Sender's Email
      SENDER_EMAIL = process.env.SENDER_EMAIL,
      // Gmail Client ID
      CLIENT_ID = process.env.GMAIL_CLIENT_ID,
      // Gmail Client Secret
      CLIENT_SECRET = process.env.GMAIL_CLIENT_SECRET,
      // Gmail Refresh Token
      REFRESH_TOKEN = process.env.GMAIL_REFRESH_TOKEN,
      ACCESS_TOKEN = process.env.GMAIL_ACCESS_TOKEN
  } = process.env
  
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        type: 'OAuth2',
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET
    }
  })

  return await transporter.sendMail({
      from: GMAIL_EMAIL,
      to: requestorEmail,
      subject: 'Message',
      text: 'I hope this message gets through!',
      auth: {
        user: GMAIL_EMAIL,
        refreshToken: REFRESH_TOKEN,
        accessToken: ACCESS_TOKEN,
        expires: 1484314697598
      }
  })
}

/** Export */
export default {
  sendMail2Requestor
}