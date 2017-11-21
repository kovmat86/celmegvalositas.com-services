import express from "express";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";
import { cors, validate, installer } from "./helpers.js";

// Services
import messageService from "./services/messageService.js";

const port = 8095;
const serviceName = "MyServiceRouter";
const app = express();

app.use(bodyParser.json());
app.use(cors);
app.use(validate);

// CORS headers
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Installs all the services
const services = [messageService];

services.forEach(service => installer(app)(service));

app.listen(port, function() {
  console.log(`${serviceName} is listening on port ${port}!`);
  console.log("Installed services: ");
  console.log(services.join("\n"));
});
