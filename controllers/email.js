// Nodemailer
import nodemailer from 'nodemailer'
import dotenv from 'dotenv-safe'
import pug from 'pug'
import fs from 'fs'

dotenv.config()

const emailFile = process.cwd() + '/correo.dat'

;(async () => {
  try {
    await fs.promises.access(emailFile)
  }

  catch (error) {
    return await setEmail(process.env.INITIAL_EMAIL)
  }
})()

const getEmail = async () => await fs.promises.readFile(emailFile, 'utf-8')

const setEmail = async email => await fs.promises.writeFile(emailFile, email)

/** Email Functions Handler */
// REQUESTOR Noty Email
const sendMail2Requestor = async products => {
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
      // Gmail Access Token
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

  const emailTemplate = pug.compileFile(process.cwd() + '/views/email-list.pug')

  requestorEmail = await getEmail()

  const mailOptions = {
    from: `${process.env.SENDER_NAME} <${SENDER_EMAIL}>`,
    to: requestorEmail,
    html: emailTemplate({products}),
    subject: 'Lista de productos',
    auth: {
      user: GMAIL_EMAIL,
      refreshToken: REFRESH_TOKEN,
      accessToken: ACCESS_TOKEN,
      expires: 1484314697598
    }
  }

  console.log(`Enviando correo electrónico a ${requestorEmail}`)

  return await transporter.sendMail(mailOptions)
}

/** Export */
export default {
  sendMail2Requestor,
  getEmail,
  setEmail
}