const config = {
  dbLink: process.env.DB_LINK,
  dbName: process.env.DB_NAME,
  dbPass: process.env.DB_PASS,
  dbUser: process.env.DB_USER,
  jwtSecret: process.env.JWT_SECRET,
  yahooUser: process.env.DEV_EMAIL,
  yahooPass: process.env.DEV_EMAIL_PASS,
  sender: process.env.EMAIL_SENDER,
};

module.exports = config;
