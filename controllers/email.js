/** Dependencies */
// Nodemailer
import nodemailer from 'nodemailer'
import dotenv from 'dotenv-safe'
import {pugEngine} from 'nodemailer-pug-engine'

dotenv.config()

/** Email Functions Handler */
// REQUESTOR Noty Email
const sendMail2Requestor = async (requestorEmail, products, host) => {
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

  transporter.use('compile', pugEngine({
    templateDir: process.cwd() + '/views',
    pretty: true
  }))

  return await transporter.sendMail({
      from: `${process.env.SENDER_NAME} <${SENDER_EMAIL}>`,
      to: requestorEmail,
      template: 'email-list',
      ctx: { products, mail: true, root_url: host },
      subject: 'Lista de productos',
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