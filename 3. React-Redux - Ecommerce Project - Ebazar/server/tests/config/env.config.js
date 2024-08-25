/**
 * Loads environment variables from a `.env` file into `process.env` and exports constant values for use across the application.
 * @module config/env.config
 */

require("dotenv").config();



/**
 * @module config/env.config
 * @description Loads environment variables from a `.env` file and exports configuration constants for use across the application.
 * @constant
 * @type {Object}
 * @property {Object} `jwt` - JWT configuration.
 * @property {string} `jwt.secret_key` - Secret key for JWT authentication.
 * @property {Object} `mongoose` - MongoDB configuration.
 * @property {string} `mongoose.uri` - URI for MongoDB connection.
 * @property {Object} `stripe` - Stripe configuration.
 * @property {string} `stripe.key` - Stripe API key.
 * @property {Object} `email` - Email configuration.
 * @property {string} `email.senders_email` - Email address for sending transactional emails.
 * @property {string} `email.senders_email_2` - Backup email address for sending emails.
 * @property {string} `email.app_password` - Password for the sender's email.
 * @property {string} `email.app_password_2` - Password for the backup sender's email.
 * @property {Object} `server` - Server configuration.
 * @property {number} `server.port` - Port number for the server.
 * @property {Object} `webhook` - Webhook configuration.
 * @property {string} `webhook.endpoint_secret` - Secret key for securing webhook endpoints.
 */
exports.env = {
    jwt: {
        secret_key: process.env.SECRET_KEY,
    },
    mongoose: {
        uri: process.env.URI + '-test',
    },
    stripe: {
        key: process.env.STRIPE,
    },
    email: {
        senders_email: process.env.SENDERS_EMAIL,
        senders_email_2: process.env.SENDERS_EMAIL2,
        app_password: process.env.SENDERS_GMAIL_APP_PASSWORD,
        app_password_2: process.env.SENDERS_GMAIL_APP_PASSWORD2,
    },
    server: {
        port: process.env.PORT,
    },
    webhook: {
        endpoint_secret: process.env.ENDPOINT_SECRET,
    },

};