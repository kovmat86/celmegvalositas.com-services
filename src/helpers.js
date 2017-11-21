import nodemailer from "nodemailer";

const SMTP_CONFIG = {
  port: process.env.SMTP_PORT,
  protocol: process.env.SMTP_PROTOCOL,
  host: process.env.SMTP_HOST,
  account: process.env.SMTP_ACCOUNT,
  password: process.env.SMTP_PASSWORD
};

function cors(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
}

function validate(err, req, res, next) {
  if (!req.body) res.status(500).send("Something broke!");
}

function installer(app) {
  if (!app) throw new Error("Invalid Express application");

  return function(service) {
    if (!service) throw new Error("Invalid Service API!");
    if (!service.run)
      throw new Error(
        "Invalid Service API! Service must expose a `run` function"
      );
    app[service.type || "get"](service.urlPattern, (req, res) => {
      Promise.resolve()
        .then(() => service.run({ req, res }))
        .then(response => res.json(response || { status: 200 }))
        .catch(err => res.status(500).json(err));
    });
  };
}

function sendEmail(to, subject, html) {
  const host = SMTP_CONFIG.host;
  const port = SMTP_CONFIG.port;
  const protocol = SMTP_CONFIG.protocol;
  const account = SMTP_CONFIG.account;
  const password = SMTP_CONFIG.password;
  const transporter = nodemailer.createTransport(
    `${protocol}://${account}:${password}@${host}:${port}`
  );
  const mailOptions = {
    from: '"Célmegvalósítás mellébeszélés nélkül" <info@celmegvalositas.com>',
    to,
    subject,
    html
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        reject(error);
      }
      resolve();
    });
  });
}

export { cors, installer, validate, sendEmail };
export default installer;
