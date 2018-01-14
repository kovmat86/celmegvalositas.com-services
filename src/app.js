import express from "express";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";
import { cors, validate, installer } from "./helpers.js";

// Services
import messageService from "./services/messageService.js";
import phonebackService from "./services/phonebackService.js";

const port = 8095;
const serviceName = "MyServiceRouter";
const app = express();

app.use(cors);
app.use(bodyParser.json());
app.use(validate);

// Installs all the services
const services = [messageService, phonebackService];

services.forEach(service => installer(app)(service));

app.listen(port, function() {
  console.log(`${serviceName} is listening on port ${port}!`);
  console.log("Installed services: ");
  services.forEach(service => console.log(service.urlPattern));
});
