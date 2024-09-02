const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
const { apiUtil } = require('../../utils');
const { User } = require('../../model/user.model');
const httpStatus = require('http-status');


/**
 * Sends an email containing a One-Time Password (OTP) to the specified address.
 * Uses Nodemailer to send the email with an HTML template where the OTP is inserted.
 * The email is sent via Gmail using credentials stored in environment variables.
 *
 * @function
 * @param {string} email - The recipient's email address.
 * @param {string} OTP - The One-Time Password to include in the email.
 * @param {string} id - An identifier associated with the email, to be returned upon success.
 * @returns {Promise<Object>} A promise that resolves with an object containing the `id` if the email is sent successfully, or rejects with an error message if there is an issue.
 * @throws {Object} - Throws an object with a message property if there is an error reading the template or sending the email.
 */
const sendEmail = (email, OTP, id) => {
  return new Promise((resolve, reject) => {
    // Read the HTML file
    const filePath = path.join(__dirname, 'email-template.html');

    fs.readFile(filePath, { encoding: 'utf-8' }, (err, data) => {
      if (err) {
        return reject({ message: "Error reading email template", statusCode: httpStatus.INTERNAL_SERVER_ERROR });
      }

      // Replace the placeholder with the actual OTP
      const html = data.replace('{{OTP}}', OTP);

      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.SENDERS_EMAIL2,
          pass: process.env.SENDERS_GMAIL_APP_PASSWORD2,
        },
      });

      const mail_configs = {
        from: process.env.SENDERS_EMAIL2,
        to: email,
        subject: "Ebazar PASSWORD RECOVERY",
        html,
      };

      transporter.sendMail(mail_configs, function (error, info) {
        if (error) {
          return reject({ message: `Error occurred in sending email`, statusCode: httpStatus.INTERNAL_SERVER_ERROR });
        }
        return resolve({ id });
      });
    });
  });
};

const createUser = async (rest, password, salt) => {
  try {
    const data = await User.create({ ...rest, password, salt: salt })
    if (!data) throw new apiUtil.ApiError(httpStatus.NOT_FOUND, 'Error creating user')
    return data

  } catch (error) {
    if (error.code === 11000) { // 11000 is the error code for duplicate key errors
      throw new apiUtil.ApiError(httpStatus.CONFLICT, 'Email is already in use.');
    }
    throw new apiUtil.ApiError(error.statusCode, error.message);
  }
}

module.exports = {
  sendEmail, createUser
}